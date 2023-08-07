import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function FadeInContent({ children }) {
    const location = useLocation();

    useEffect(() => {
    // Add a short delay to ensure the fade-in effect
    const timer = setTimeout(() => {
        const content = document.querySelector('.fade-in-transition');
        if (content) {
        content.style.opacity = '1';
        }
    }, 100);

    return () => clearTimeout(timer);
    }, [location]);

    return <>{children}</>;
}