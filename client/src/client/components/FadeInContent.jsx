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
            fetch('/views', { credentials: 'include' }) 
                .then(response => response.text())
                .then(data => {
                    console.log(data); // Display the page view count in the console
                })
                .catch(error => {
                    console.error('Error fetching data:', error);
                });
            }
    }, 100);

    return () => clearTimeout(timer);
    }, [location]);

    return <>{children}</>;
}