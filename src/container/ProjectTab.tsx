import ProjectPress from '../component/ProjectPress';
import { collegeProjects, projects } from '../content/projects';

export default function ProjectTab({ isMobile = false }: { isMobile?: boolean }) {
    return (
        <div className="projects-page" data-mobile={isMobile}>
            <p className="projects-intro">
                <span>I love building things and tinkering with different ideas.</span>{' '}
                There are way too many to list, but here are a few.
            </p>

            <div className="projects-list">
                {projects.map(project => (
                    <article className="project-item" key={project.id} aria-labelledby={`project-${project.id}`}>
                        <div className="project-image" data-fit={project.imageFit} style={{ backgroundColor: project.imageBackground, aspectRatio: project.imageAspectRatio }}>
                            <img src={project.image} alt={project.imageAlt} width="320" height="320" loading="lazy" decoding="async" />
                        </div>
                        <div className="project-summary">
                            <h2 className="project-title" id={`project-${project.id}`}>{project.title}</h2>
                            <p className="project-description">{project.description}</p>
                            {project.links && <ul className="project-links" aria-label={`${project.title} links`}>
                                {project.links.map(link => (
                                    <li key={link.href}>
                                        <a href={link.href} target="_blank" rel="noopener noreferrer">
                                            {link.label}<span aria-hidden="true"> ↗</span>
                                        </a>
                                    </li>
                                ))}
                            </ul>}
                            {project.press && <ProjectPress project={project.title} links={project.press} />}
                        </div>
                    </article>
                ))}
            </div>

            <section className="college-projects" aria-labelledby="college-projects-title">
                <h2 id="college-projects-title">From my college days</h2>
                <ul>
                    {collegeProjects.map(project => (
                        <li key={project.href}>
                            <a href={project.href} target="_blank" rel="noopener noreferrer">
                                <span className="college-project-name">{project.title}<span aria-hidden="true"> ↗</span></span>
                                {project.description && <span className="college-project-description">{project.description}</span>}
                            </a>
                        </li>
                    ))}
                </ul>
            </section>
        </div>
    );
}
