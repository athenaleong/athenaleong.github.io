import type { PressLink } from '../content/press';

export default function ProjectPress({ project, links }: { project: string; links: PressLink[] }) {
    return (
        <div className="project-press">
            <p>In the press</p>
            <ul aria-label={`${project} press coverage`}>
                {links.map(({ outlet, year, title, href }) => (
                    <li key={href}>
                        <a
                            href={href}
                            target="_blank"
                            rel="noopener noreferrer"
                            title={title}
                            aria-label={`${outlet} (${year}): ${title}`}
                        >
                            {outlet} ({year})
                        </a>
                    </li>
                ))}
            </ul>
        </div>
    );
}
