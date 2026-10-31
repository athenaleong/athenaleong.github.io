export default function AboutTab({ isMobile = false }: { isMobile?: boolean }) {
    return (
        <div
            className="text-xl bg-gray-200 flex flex-col items-center pt-[64px] pb-[96px] font-hanken dark:bg-gray-800"
            style={{ paddingLeft: isMobile ? '2.5rem' : '6rem', paddingRight: isMobile ? '2.5rem' : '6rem', borderRadius: isMobile ? '0rem' : '0.5rem' }}
        >
            <p className="mb-6 leading-loose font-bold">
                Hi! Looks like you have stumbled upon my little playground on the internet. Welcome in!
            </p>
            <p className="mb-6 leading-loose">
                I am Athena. I am curious about a lot of things. I am most interested in creating magical experiences with tech. I deeply value agency, curiosity and kindness.
            </p>
            <p className="mb-6 leading-loose">
                I'm building <a href="https://www.outernetexplorer.com/" target="_blank" rel="noopener noreferrer">Outernet</a>, like Strava for everyday adventures. We want to make doing things as easy as scrolling.
            </p>
            <p className="mb-6 leading-loose">
                Previously, I built education apps for 2M+ kids, and before that studied CS &amp; child development at{' '}
                <a href="https://www.cs.berkeley.edu/" target="_blank" rel="noopener noreferrer">UC Berkeley</a>.
            </p>
            <p className="mb-6 leading-loose">
                I love whimsy and getting into shenanigans with friends. Sometimes, I document them on my{' '}
                <a href="https://www.tiktok.com/@athena.makes" target="_blank" rel="noopener noreferrer">Tiktok</a>.
            </p>
            <p className="mb-6 leading-loose">
                I love collaborating on projects and going down rabbit holes with curious people. If you think we should be friends, please reach out. About 117 billion people have ever lived. How cool is it that we found each other!
            </p>
            <p className="mb-6 leading-loose">
                I built this playground just for adventurers like you! Go forth, I hope you have lots of fun here!
            </p>
        </div>
    );
}
