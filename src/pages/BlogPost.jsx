import React, { useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import gsap from 'gsap';
import blogsData from '../data/blogsData.json';

const BlogPost = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const blog = blogsData.find(b => b.id === id);

    useEffect(() => {
        window.scrollTo(0, 0);

        const ctx = gsap.context(() => {
            gsap.fromTo(".fade-up",
                { opacity: 0, y: 30 },
                { opacity: 1, y: 0, duration: 1, stagger: 0.15, ease: "power3.out" }
            );
        });

        return () => ctx.revert();
    }, [id]);

    if (!blog) {
        return (
            <div className="min-h-screen bg-background flex flex-col items-center justify-center text-white p-6 text-center">
                <h1 className="font-display text-4xl mb-4">Post Not Found</h1>
                <p className="text-secondary/60 mb-8">The article you're looking for doesn't exist.</p>
                <button onClick={() => navigate('/blogs')} className="text-accent font-bold tracking-widest uppercase hover:text-white transition-colors cursor-none">
                    ← Back to Blogs
                </button>
            </div>
        );
    }

    return (
        <article className="min-h-screen bg-background text-white pb-32">
            {/* Hero Header */}
            <div className="relative h-[60vh] md:h-[70vh] w-full overflow-hidden">
                <img
                    src={blog.imageUrl}
                    alt={blog.title}
                    className="absolute inset-0 w-full h-full object-cover filter brightness-[0.4]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />

                <div className="absolute inset-0 flex flex-col justify-end px-6 md:px-16 pb-16 max-w-5xl mx-auto">
                    <Link to="/blogs" className="fade-up w-fit text-accent/80 hover:text-accent font-bold tracking-widest text-sm uppercase mb-8 flex items-center transition-colors cursor-none">
                        <span className="mr-2">←</span> Back to all insights
                    </Link>
                    <div className="fade-up flex items-center gap-4 mb-4">
                        <span className="bg-accent text-background text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider backdrop-blur-md">Article</span>
                        <span className="text-secondary/60 font-sans text-sm">{blog.date}</span>
                    </div>
                    <h1 className="fade-up font-display font-black text-4xl md:text-6xl lg:text-7xl uppercase tracking-tighter leading-[0.9] text-white my-4 max-w-4xl">
                        {blog.title}
                    </h1>
                </div>
            </div>

            {/* Content Body */}
            <div className="max-w-3xl mx-auto px-6 md:px-16 mt-16 md:mt-24">
                <div className="fade-up font-sans text-xl md:text-2xl text-secondary/80 font-light leading-relaxed whitespace-pre-line">
                    {blog.excerpt}
                </div>

                <div className="fade-up mt-12 w-16 h-1 bg-accent/30 rounded-full" />

                <div className="fade-up mt-12 font-sans text-lg text-secondary/70 leading-relaxed space-y-8 whitespace-pre-line drop-shadow-sm">
                    {blog.content}
                </div>
            </div>
        </article>
    );
};

export default BlogPost;
