import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import ReactMarkdown from 'react-markdown';
import { ArrowLeft, Calendar, User, Clock, Tag } from 'lucide-react';
import { Button } from '../components/ui/Button';

interface BlogPost {
    id: string;
    title: string;
    content: string;
    date: string;
    author: string;
    category: string;
    readTime: string;
    image: string;
}

export const BlogPostPage = () => {
    const { id } = useParams();
    const [post, setPost] = useState<BlogPost | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPost = async () => {
            try {
                // In production, use env var. For now, localhost is fine.
                const res = await fetch(`http://localhost:4242/api/blogs/${id}`);
                if (!res.ok) throw new Error('Post not found');
                const data = await res.json();
                setPost(data);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };
        fetchPost();
    }, [id]);

    if (loading) {
        return (
            <div className="min-h-screen bg-[#09090b] flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-500"></div>
            </div>
        );
    }

    if (!post) {
        return (
            <div className="min-h-screen bg-[#09090b] flex flex-col items-center justify-center text-white">
                <h2 className="text-2xl mb-4">Blog Post Not Found</h2>
                <Link to="/blog">
                    <Button variant="accent">Back to Blog</Button>
                </Link>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#09090b] pb-24">
            {/* Hero Image */}
            <div className="relative h-[60vh] w-full overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-[#09090b] via-[#09090b]/50 to-transparent z-10"></div>
                <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover"
                />

                <div className="absolute bottom-0 left-0 w-full z-20 container mx-auto px-4 pb-12">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        <Link to="/blog" className="inline-flex items-center gap-2 text-emerald-400 font-medium mb-6 hover:text-emerald-300 transition-colors">
                            <ArrowLeft size={16} /> Back to Blog
                        </Link>

                        <div className="flex items-center gap-4 mb-4">
                            <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-bold border border-emerald-500/20 flex items-center gap-1">
                                <Tag size={12} />
                                {post.category}
                            </span>
                            <span className="text-gray-400 text-sm flex items-center gap-1">
                                <Clock size={14} />
                                {post.readTime}
                            </span>
                        </div>

                        <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight max-w-4xl">
                            {post.title}
                        </h1>

                        <div className="flex items-center gap-6 text-gray-300 border-t border-gray-800 pt-6">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-emerald-900/50 flex items-center justify-center text-emerald-500">
                                    <User size={20} />
                                </div>
                                <span className="font-medium">{post.author}</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm text-gray-500">
                                <Calendar size={16} />
                                {post.date}
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Content */}
            <div className="container mx-auto px-4 max-w-3xl mt-12">
                <motion.article
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="prose prose-invert prose-lg max-w-none prose-emerald
                    prose-h1:text-white prose-h2:text-emerald-400 prose-h3:text-white
                    prose-p:text-gray-300 prose-a:text-emerald-400 prose-strong:text-white
                    prose-li:text-gray-300 prose-blockquote:border-l-emerald-500 prose-blockquote:bg-[#18181b] prose-blockquote:p-6 prose-blockquote:rounded-r-lg"
                >
                    <ReactMarkdown>{post.content}</ReactMarkdown>
                </motion.article>

                <div className="mt-16 pt-8 border-t border-[#27272a]">
                    <h3 className="text-white font-bold mb-4">Share this article</h3>
                    <div className="flex gap-4">
                        <button className="px-4 py-2 rounded-lg bg-[#18181b] text-gray-400 hover:text-white hover:bg-[#27272a] transition-all">Twitter</button>
                        <button className="px-4 py-2 rounded-lg bg-[#18181b] text-gray-400 hover:text-white hover:bg-[#27272a] transition-all">LinkedIn</button>
                        <button className="px-4 py-2 rounded-lg bg-[#18181b] text-gray-400 hover:text-white hover:bg-[#27272a] transition-all">Facebook</button>
                    </div>
                </div>
            </div>
        </div>
    );
};
