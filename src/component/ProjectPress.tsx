import type { PressLink } from '../content/press';

export default function ProjectPress({ project, links }: { project: string; links: PressLink[] }) {
    return (
        <div className="space-y-1 text-base">
            <p>In the press</p>
            <ul aria-label={`${project} press coverage`} className="flex flex-wrap gap-x-4 gap-y-1 font-normal leading-relaxed">
                {links.map(({ outlet, year, title, href }) => (
                    <li key={href}>
                        <a
                            href={href}
                            target="_blank"
                            rel="noopener noreferrer"
                            title={title}
                            aria-label={`${outlet} (${year}): ${title}`}
                            className="text-figma-blue hover:underline"
                        >
                            {outlet} ({year})
                        </a>
                    </li>
                ))}
            </ul>
        </div>
    );
}
