import { useNavigate } from 'react-router-dom';
import { Home } from 'lucide-react';
import { Button } from '../components/ui/Button';

export const NotFoundPage = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-[80vh] flex flex-col items-center justify-center px-4 text-center">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-green-500/10 blur-[100px] rounded-full pointer-events-none"></div>

            <h1 className="text-9xl font-bold text-transparent bg-clip-text bg-gradient-to-b from-white/20 to-white/5 mb-4 select-none">404</h1>
            <h2 className="text-3xl font-bold text-white mb-4 relative z-10">Page Not Found</h2>
            <p className="text-gray-400 max-w-md mb-8 relative z-10">
                The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
            </p>

            <Button
                variant="accent"
                onClick={() => navigate('/')}
                className="flex items-center gap-2 relative z-10"
            >
                <Home size={18} />
                Back to Home
            </Button>
        </div>
    );
};
