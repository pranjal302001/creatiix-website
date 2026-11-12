import React, { useEffect, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import gsap from 'gsap';
import { ArrowLeft, ArrowUpRight } from 'lucide-react';
import blogsData from '../data/blogsData.json';
import { readingTime } from '../lib/blog';
import { goToContact } from '../lib/site';

export default function BlogPost() {
    const { id } = useParams();
    const pageRef = useRef(null);
    const blog = blogsData.find((b) => b.id === id);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo('.fade-up', { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.8, stagger: 0.1, ease: 'power3.out' });
        }, pageRef);
        return () => ctx.revert();
    }, [id]);

    if (!blog) {
        return (
            <div className="min-h-screen bg-background flex flex-col items-center justify-center text-ink p-6 text-center">
                <h1 className="font-display font-bold text-4xl mb-4">Article not found</h1>
                <p className="text-ink/60 mb-8">The article you are looking for does not exist.</p>
                <Link to="/blogs" className="px-8 py-4 rounded-2xl bg-brand text-onaccent font-bold uppercase tracking-widest text-sm">Back to blog</Link>
            </div>
        );
    }

    // Same category first, then the others
    const related = blogsData
        .filter((b) => b.id !== blog.id)
        .sort((a, b) => (b.category === blog.category) - (a.category === blog.category))
        .slice(0, 3);

    return (
        <article ref={pageRef} className="relative min-h-screen bg-background text-ink pt-36 pb-24 px-6 md:px-16 overflow-hidden">
            <i className="glow glow-flame w-[50rem] h-[30rem] left-1/2 -translate-x-1/2 -top-56" />

            <div className="relative max-w-3xl mx-auto">
                <Link to="/blogs" className="fade-up inline-flex items-center gap-2 font-mono text-[13px] uppercase tracking-widest text-ink/60 hover:text-accent transition-colors mb-10">
                    <ArrowLeft className="w-4 h-4" /> All articles
                </Link>
                <p className="fade-up font-mono text-[13px] uppercase tracking-wider text-ink/50 flex flex-wrap gap-x-4 gap-y-1 mb-5">
                    <span className="text-accent">{blog.category}</span><span>{blog.date}</span><span>{readingTime(blog)}</span>
                </p>
                <h1 className="fade-up font-display font-bold text-4xl md:text-6xl tracking-tight leading-[1.04] mb-6">{blog.title}</h1>
                <p className="fade-up font-drama italic text-2xl md:text-3xl text-ink/70 leading-snug">{blog.excerpt}</p>
            </div>

            <div className="fade-up relative max-w-5xl mx-auto glass p-3 my-12 md:my-16">
                <img src={blog.imageUrl} alt="" className="w-full aspect-[16/8] object-cover rounded-2xl" />
            </div>

            <div className="fade-up relative max-w-3xl mx-auto font-body text-lg md:text-xl text-ink/80 font-light leading-[1.8] whitespace-pre-line">
                {blog.content}
            </div>

            {/* CTA */}
            <div className="relative max-w-3xl mx-auto mt-16 glass p-8 md:p-10 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                <div>
                    <h2 className="font-display font-bold text-2xl md:text-3xl tracking-tight mb-1">Want this for your business?</h2>
                    <p className="text-ink/60 font-light">Talk to us about what you want to build.</p>
                </div>
                <button onClick={goToContact} className="shrink-0 px-7 py-4 rounded-2xl bg-brand text-onaccent font-bold uppercase tracking-widest text-sm hover:brightness-110 transition">Let's talk</button>
            </div>

            {/* Keep reading */}
            <div className="relative max-w-7xl mx-auto mt-24">
                <h2 className="font-display font-bold text-3xl md:text-4xl tracking-tight mb-8">
                    Keep <span className="font-drama italic font-normal text-grad">reading.</span>
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {related.map((b) => (
                        <Link key={b.id} to={`/blogs/${b.id}`} data-tilt className="glass group flex flex-col p-3 transition-transform duration-200 ease-out">
                            <img src={b.imageUrl} alt="" loading="lazy" className="w-full aspect-[16/10] object-cover rounded-2xl" />
                            <div className="p-4">
                                <p className="font-mono text-xs uppercase tracking-wider text-accent mb-2">{b.category} · {readingTime(b)}</p>
                                <h3 className="font-display font-bold text-xl tracking-tight leading-tight group-hover:text-accent transition-colors">{b.title}</h3>
                                <span className="mt-4 inline-flex items-center gap-2 font-mono text-[13px] uppercase tracking-widest text-ink/70">Read <ArrowUpRight className="w-4 h-4" /></span>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </article>
    );
}
