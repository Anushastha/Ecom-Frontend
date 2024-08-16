import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const useSessionCheck = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const checkSession = () => {
            const expiresAt = localStorage.getItem('expiresAt');
            const currentTime = Date.now();

            // Check for session expiration
            if (!expiresAt || currentTime > expiresAt) {
                localStorage.removeItem('token');
                localStorage.removeItem('expiresAt');
                localStorage.removeItem('user');
                navigate('/auth?mode=login');
            }
        };

        checkSession();
    }, [navigate]);
};

export default useSessionCheck;
