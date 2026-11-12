// Small helpers shared by the blog list and the blog post page.
export const readingTime = (blog) => {
    const words = `${blog.excerpt} ${blog.content}`.split(/\s+/).length;
    return `${Math.max(1, Math.round(words / 200))} min read`;
};
