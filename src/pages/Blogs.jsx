import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import blogsData from '../data/blogsData.json';

const categories = ['All', 'Designing', 'Marketing', 'AI'];

const Blogs = () => {
    const [activeCategory, setActiveCategory] = useState('All');

    // Filter blogs based on category
    const filteredBlogs = activeCategory === 'All'
        ? blogsData
        : blogsData.filter(blog => blog.category === activeCategory);

    useEffect(() => {
        // Reveal animation
        gsap.fromTo(
            ".blog-card",
            { opacity: 0, y: 50 },
            {
                opacity: 1,
                y: 0,
                duration: 0.8,
                stagger: 0.15,
                ease: "power3.out",
                clearProps: "all" // Important for re-rendering filtered lists
            }
        );
    }, [activeCategory]); // Re-run animation when category changes

    return (
        <div className="min-h-screen bg-background text-white pt-32 pb-24 px-6 md:px-16 overflow-hidden">
            {/* Header */}
            <div className="max-w-7xl mx-auto mb-16">
                <h1 className="font-display font-black text-5xl md:text-7xl uppercase tracking-tighter mix-blend-difference mb-6">
                    <span className="text-secondary/70">Our</span> Insights
                </h1>
                <p className="font-sans text-xl md:text-2xl text-secondary/60 max-w-2xl font-light">
                    Thoughts, trends, and tutorials straight from the creative minds at CREATIIX.
                </p>
            </div>

            {/* Filter Buttons */}
            <div className="max-w-7xl mx-auto mb-12 flex flex-wrap gap-4">
                {categories.map((category) => (
                    <button
                        key={category}
                        onClick={() => setActiveCategory(category)}
                        className={`px-6 py-2 rounded-full font-sans text-sm font-medium tracking-wide transition-all duration-300 ${activeCategory === category
                                ? 'bg-accent text-background'
                                : 'bg-white/5 text-white/70 hover:bg-white/10 hover:text-white border border-white/10'
                            }`}
                        style={{ cursor: 'none' }} // Match custom cursor
                    >
                        {category}
                    </button>
                ))}
            </div>

            {/* Grid */}
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredBlogs.map((blog) => (
                    <Link
                        key={blog.id}
                        to={`/blogs/${blog.id}`}
                        className="blog-card group flex flex-col h-full bg-white/5 border border-white/10 rounded-2xl overflow-hidden hover:border-accent/40 transition-colors duration-500 cursor-none"
                    >
                        <div className="relative h-64 overflow-hidden">
                            <img
                                src={blog.imageUrl}
                                alt={blog.title}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 filter brightness-75 group-hover:brightness-100"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent pointer-events-none" />
                            <div className="absolute bottom-4 left-6 bg-accent text-background text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider backdrop-blur-md">
                                Article
                            </div>
                        </div>

                        <div className="p-8 flex flex-col flex-grow">
                            <span className="text-accent/60 text-sm font-sans mb-3">{blog.date}</span>
                            <h2 className="font-display font-bold text-2xl tracking-tight mb-4 group-hover:text-accent transition-colors duration-300">
                                {blog.title}
                            </h2>
                            <p className="text-secondary/60 font-sans text-base line-clamp-3 mb-6 flex-grow">
                                {blog.excerpt}
                            </p>

                            <div className="mt-auto flex items-center text-accent font-bold uppercase tracking-widest text-sm group-hover:translate-x-2 transition-transform duration-300">
                                Read Story <span className="ml-2 group-hover:ml-4 transition-all duration-300">→</span>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default Blogs;
