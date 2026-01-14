import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card } from '../components/ui/Card';
import { ArrowRight, Calendar, User, Tag } from 'lucide-react';
import { Link } from 'react-router-dom';

interface BlogPost {
    id: string;
    title: string;
    excerpt: string;
    date: string;
    author: string;
    category: string;
    readTime: string;
    image: string;
}

export const BlogPage = () => {
    const [posts, setPosts] = useState<BlogPost[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                // Fetch from our new backend engine
                const res = await fetch('http://localhost:4242/api/blogs');
                const data = await res.json();
                setPosts(data);
            } catch (error) {
                console.error("Failed to fetch blogs:", error);
                // Fallback to empty or error state if needed
            } finally {
                setLoading(false);
            }
        };

        fetchPosts();
    }, []);

    return (
        <div className="flex flex-col min-h-screen bg-[#09090b]">
            {/* Hero Section */}
            <section className="relative pt-32 pb-20 px-4 overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-[#111113] to-[#09090b] z-0"></div>

                {/* Decorative Gradients */}
                <div className="absolute top-[-20%] right-[-10%] w-[600px] h-[600px] bg-green-500/10 rounded-full blur-[120px]"></div>
                <div className="absolute bottom-[-20%] left-[-10%] w-[500px] h-[500px] bg-emerald-500/10 rounded-full blur-[100px]"></div>

                <div className="container mx-auto relative z-10 text-center max-w-3xl">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <span className="text-emerald-500 font-bold tracking-wider uppercase text-sm mb-4 block">Cleaning Insights</span>
                        <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
                            Expert Tips for a <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-green-500">Spotless Life</span>
                        </h1>
                        <p className="text-gray-400 text-lg leading-relaxed mb-8">
                            Discover the latest trends in cleaning, property maintenance, and hosting.
                            Curated by the ReadyCleans pros.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Blog Grid */}
            <section className="pb-24 px-4">
                <div className="container mx-auto">
                    {loading ? (
                        <div className="flex justify-center py-20">
                            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-500"></div>
                        </div>
                    ) : (
                        <div className="grid md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-8 max-w-6xl mx-auto">
                            {posts.map((post, index) => (
                                <motion.div
                                    key={post.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.1 }}
                                >
                                    <Link to={`/blog/${post.id}`} className="group block h-full">
                                        <Card className="bg-[#18181b] border-[#27272a] overflow-hidden h-full hover:border-[#3f3f46] hover:shadow-2xl hover:shadow-emerald-900/10 transition-all duration-300 group-hover:-translate-y-1">
                                            {/* Image Area */}
                                            <div className="relative h-64 overflow-hidden">
                                                <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors z-10"></div>
                                                <img
                                                    src={post.image}
                                                    alt={post.title}
                                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                                    onError={(e) => {
                                                        // Fallback image if link breaks
                                                        (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1584622050111-993a426fbf0a?auto=format&fit=crop&q=80";
                                                    }}
                                                />
                                                <div className="absolute top-4 left-4 z-20">
                                                    <span className="px-3 py-1 rounded-full bg-black/60 backdrop-blur-md text-white text-xs font-bold border border-white/10 flex items-center gap-1">
                                                        <Tag size={12} className="text-emerald-400" />
                                                        {post.category}
                                                    </span>
                                                </div>
                                            </div>

                                            {/* Content Area */}
                                            <div className="p-8 flex flex-col h-[calc(100%-16rem)]">
                                                <div className="flex items-center gap-4 text-xs text-gray-500 mb-4">
                                                    <span className="flex items-center gap-1.5">
                                                        <Calendar size={14} />
                                                        {post.date}
                                                    </span>
                                                    <span className="flex items-center gap-1.5">
                                                        <User size={14} />
                                                        {post.author}
                                                    </span>
                                                </div>

                                                <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-emerald-400 transition-colors">
                                                    {post.title}
                                                </h3>

                                                <p className="text-gray-400 leading-relaxed mb-6 flex-grow line-clamp-3">
                                                    {post.excerpt}
                                                </p>

                                                <div className="flex items-center justify-between mt-auto">
                                                    <span className="text-sm text-gray-500 font-medium">{post.readTime}</span>
                                                    <span className="flex items-center gap-2 text-white font-bold text-sm group-hover:text-emerald-400 transition-colors">
                                                        Read Article <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                                                    </span>
                                                </div>
                                            </div>
                                        </Card>
                                    </Link>
                                </motion.div>
                            ))}
                        </div>
                    )}

                    {/* Newsletter / CTA */}
                    <div className="max-w-4xl mx-auto mt-20">
                        <Card className="bg-gradient-to-r from-emerald-900/20 to-green-900/20 border-[#27272a] p-12 text-center relative overflow-hidden">
                            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10"></div>
                            <div className="relative z-10">
                                <h3 className="text-2xl font-bold text-white mb-4">Want more cleaning tips?</h3>
                                <p className="text-gray-400 mb-8 max-w-lg mx-auto">
                                    Subscribe to our newsletter for exclusive discounts, seasonal checklists, and expert advice delivered to your inbox.
                                </p>
                                <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
                                    <input
                                        type="email"
                                        placeholder="Enter your email"
                                        className="h-12 px-6 rounded-full bg-[#09090b] border border-[#27272a] text-white focus:outline-none focus:border-emerald-500 flex-grow"
                                    />
                                    <button className="h-12 px-8 rounded-full bg-white text-black font-bold hover:bg-emerald-400 hover:text-black transition-colors">
                                        Subscribe
                                    </button>
                                </div>
                            </div>
                        </Card>
                    </div>
                </div>
            </section>
        </div>
    );
};
