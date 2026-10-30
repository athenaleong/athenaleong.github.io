import React, { useState, useEffect } from 'react';

const ThemeToggle = () => {
    const [isDarkMode, setIsDarkMode] = useState(() => document.documentElement.classList.contains('dark'));

    const onToggle = () => {
        if (!isDarkMode) {
            document.documentElement.classList.add('dark');
            try { localStorage.setItem('theme', 'dark'); } catch (_) { /* Theme still works without storage. */ }
            setIsDarkMode(true);
        } else {
            document.documentElement.classList.remove('dark');
            try { localStorage.setItem('theme', 'light'); } catch (_) { /* Theme still works without storage. */ }
            setIsDarkMode(false);

        }
    }

    return (
        // <button
        //     onClick={onToggle}
        // >Toggle {isDarkMode ? 'Dark' : 'Light'}
        // </button>
        <div className="flex items-center space-x-2 transition-all">
        {/* <div className="font-medium text-gray-700 dark:text-gray-400">{label}</div> */}
        <div className="flex w-10 h-6 bg-figma-yellow rounded-full justify-start border-black border-[3px] items-center dark:justify-end dark:bg-figma-blue"
            onClick={onToggle}
        >
          <input
            type="checkbox"
            id="toggle"
            name="toggle"
            className="toggle-checkbox absolute block w-4 h-4 rounded-full bg-white border-black border-[3px] appearance-none ml-[1px] cursor-pointer dark:bg-slate-800 dark:border-slate-950 dark:mr-[1px]"
            checked={isDarkMode}
            onChange={onToggle}
          />
        </div>
      </div>
    )
};

export default ThemeToggle;
