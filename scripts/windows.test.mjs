import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import test from 'node:test';
import ts from 'typescript';

// Exercise the actual TypeScript reducers without adding a browser test runtime.
function loadTypeScript(path) {
  const url = new URL(path, import.meta.url);
  const { outputText } = ts.transpileModule(readFileSync(url, 'utf8'), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 },
  });
  const module = { exports: {} };
  new Function('require', 'module', 'exports', outputText)(createRequire(url), module, module.exports);
  return module.exports;
}

const { default: reducer, addTab, bringTabToFront, minimizeTab, popTab, updateTab, clearTab } = loadTypeScript('../src/slices/tab.ts');
const { clampWindowPosition, initialWindowPosition } = loadTypeScript('../src/windowGeometry.ts');
const open = (state, id, right = 200, top = 40) => reducer(state, addTab({ id, props: { right, top } }));

test('three windows stay open while switching and reopening preserves their positions', () => {
  let state = open(open(open(undefined, 'about'), 'projects', 240, 80), '???');
  state = reducer(state, bringTabToFront({ id: 'about' }));
  assert.equal(state.activeId, 'about');
  assert.ok(state.tabs.about.zIndex > state.tabs.projects.zIndex);
  state = open(state, 'projects', 999, 999);
  assert.equal(state.activeId, 'projects');
  assert.equal(Object.keys(state.tabs).length, 3);
  assert.equal(state.tabs.projects.right, 240);
  assert.equal(state.tabs.projects.top, 80);
  const unchanged = reducer(state, bringTabToFront({ id: 'projects' }));
  assert.equal(unchanged.maxZIndex, state.maxZIndex);
});

test('minimize and restore keep window state and select the next visible window', () => {
  let state = open(open(undefined, 'about'), 'projects', 300, 70);
  state = reducer(state, minimizeTab({ id: 'projects' }));
  assert.equal(state.activeId, 'about');
  assert.equal(state.tabs.projects.minimized, true);
  state = reducer(state, minimizeTab({ id: 'about' }));
  assert.equal(state.activeId, null);
  state = reducer(state, bringTabToFront({ id: 'projects' }));
  assert.equal(state.tabs.projects.minimized, false);
  assert.equal(state.tabs.projects.right, 300);
  assert.equal(state.activeId, 'projects');
});

test('closing and moving one window do not reset or resurrect other windows', () => {
  let state = open(open(open(undefined, 'about'), 'projects'), '???');
  state = reducer(state, minimizeTab({ id: 'projects' }));
  state = reducer(state, updateTab({ id: 'projects', props: { right: 42, top: 64 } }));
  assert.equal(state.tabs.projects.minimized, true);
  assert.equal(state.activeId, '???');
  state = reducer(state, popTab({ id: '???' }));
  assert.equal(state.activeId, 'about');
  state = reducer(state, updateTab({ id: '???', props: { right: 20, top: 20 } }));
  assert.equal(state.tabs['???'], undefined);
  assert.equal(state.tabs.projects.right, 42);
  state = reducer(state, clearTab());
  assert.deepEqual(state.tabs, {});
  assert.equal(state.activeId, null);
  assert.equal(state.maxZIndex, 0);
});

test('opening cascades windows and dragging or resizing keeps controls on screen', () => {
  const positions = [0, 1, 2].map(index => initialWindowPosition(index, 1280, 720));
  assert.equal(new Set(positions.map(position => position.top)).size, 3);
  for (const [width, height] of [[1280, 720], [1024, 600], [760, 540]]) {
    for (const [right, top] of [[-500, -100], [2000, 2000], [200, 70]]) {
      const position = clampWindowPosition(right, top, width, height);
      const windowWidth = Math.min(800, width - 32);
      const windowHeight = Math.min(600, height - 192);
      assert.ok(position.right >= 16 && position.right + windowWidth <= width - 16);
      assert.ok(position.top >= 16 && position.top + windowHeight <= height - 96);
    }
  }
});
