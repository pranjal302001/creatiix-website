import { usePageMeta } from '../lib/usePageMeta';
import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ArrowUpRight } from 'lucide-react';
import blogsData from '../data/blogsData.json';
import PageHeader, { FilterChip } from '../components/PageHeader';
import { readingTime } from '../lib/blog';

const categories = ['All', ...new Set(blogsData.map((b) => b.category))];

const Meta = ({ blog }) => (
    <p className="font-mono text-xs uppercase tracking-wider text-ink/50 flex flex-wrap items-center gap-x-3 gap-y-1">
        <span className="text-accent">{blog.category}</span>
        <span>{blog.date}</span>
        <span>{readingTime(blog)}</span>
    </p>
);

export default function Blogs() {
    usePageMeta("Blog", "Thoughts, trends and practical guides on AI, design and marketing from CREATIIX.");
    const [activeCategory, setActiveCategory] = useState('All');
    const pageRef = useRef(null);

    const blogs = activeCategory === 'All' ? blogsData : blogsData.filter((b) => b.category === activeCategory);
    const [featured, ...rest] = blogs;

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo('.fade-up', { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.8, stagger: 0.1, ease: 'power3.out' });
        }, pageRef);
        return () => ctx.revert();
    }, []);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo('.blog-card', { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.6, stagger: 0.08, ease: 'power3.out', clearProps: 'opacity,transform' });
        }, pageRef);
        return () => ctx.revert();
    }, [activeCategory]);

    return (
        <div ref={pageRef} className="relative min-h-screen bg-background text-ink pt-36 pb-24 px-6 md:px-16 overflow-hidden">
            <PageHeader
                label="Blog"
                title="Our"
                highlight="insights."
                intro="Thoughts, trends and practical guides on AI, design and marketing from the team at CREATIIX."
            >
                {categories.map((c) => (
                    <FilterChip key={c} active={activeCategory === c} onClick={() => setActiveCategory(c)}>{c}</FilterChip>
                ))}
            </PageHeader>

            <i className="glow glow-orange w-[34rem] h-[34rem] -left-60 top-1/2" />

            <div className="relative max-w-7xl mx-auto flex flex-col gap-6">
                {/* Featured article */}
                {featured && (
                    <Link to={`/blogs/${featured.id}`} className="blog-card glass group grid grid-cols-1 lg:grid-cols-2 gap-6 p-3">
                        <div className="relative aspect-[16/10] overflow-hidden rounded-2xl">
                            <img src={featured.imageUrl} alt="" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                            <span className="absolute top-4 left-4 font-mono text-xs uppercase tracking-wider font-bold bg-brand text-onaccent rounded-2xl px-3 py-1">Featured</span>
                        </div>
                        <div className="flex flex-col justify-center p-4 lg:p-8">
                            <Meta blog={featured} />
                            <h2 className="font-display font-bold text-3xl md:text-5xl tracking-tight leading-[1.05] mt-4 mb-4 group-hover:text-accent transition-colors">{featured.title}</h2>
                            <p className="text-ink/60 text-lg font-light leading-relaxed mb-8">{featured.excerpt}</p>
                            <span className="inline-flex items-center gap-2 font-mono text-[13px] uppercase tracking-widest text-ink group-hover:text-accent transition-colors">
                                Read article <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                            </span>
                        </div>
                    </Link>
                )}

                {/* The rest */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {rest.map((blog) => (
                        <Link key={blog.id} to={`/blogs/${blog.id}`} data-tilt className="blog-card glass group flex flex-col p-3 transition-transform duration-200 ease-out">
                            <div className="relative aspect-[16/10] overflow-hidden rounded-2xl">
                                <img src={blog.imageUrl} alt="" loading="lazy" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                            </div>
                            <div className="flex flex-col flex-grow p-4">
                                <Meta blog={blog} />
                                <h2 className="font-display font-bold text-2xl tracking-tight leading-tight mt-3 mb-3 group-hover:text-accent transition-colors">{blog.title}</h2>
                                <p className="text-ink/60 font-light leading-relaxed line-clamp-3 mb-6">{blog.excerpt}</p>
                                <span className="mt-auto inline-flex items-center gap-2 font-mono text-[13px] uppercase tracking-widest text-ink group-hover:text-accent transition-colors">
                                    Read article <ArrowUpRight className="w-4 h-4" />
                                </span>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
}
