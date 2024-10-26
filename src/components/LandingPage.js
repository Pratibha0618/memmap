import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import './LandingPage.css';

const LandingPage = () => {
    const navigate = useNavigate();
    const { user } = useAuth();

    const handleGetStarted = () => {
        if (user) {
            // If user is already logged in, navigate directly to map
            navigate('/map');
        } else {
            // If user is not logged in, navigate to login page
            navigate('/login');
        }
    };

    return (
        <>
            <section className="hero">
                <div className="map-overlay"></div>
                <h1>Memory Mapping</h1>
                <p>Create a beautiful visual journey of your life experiences. Pin your memories to places and watch your personal story unfold on the map.</p>
                <button onClick={handleGetStarted} className="cta-button">
                    {user ? 'Continue Mapping' : 'Start Mapping Memories'}
                </button>
            </section>

            <section className="features">
                <div className="feature-card">
                    <i className="fas fa-map-marker-alt"></i>
                    <h3>Pin Your Memories</h3>
                    <p>Drop pins on any location and attach photos, stories, and dates to create lasting memory markers.</p>
                </div>
                <div className="feature-card">
                    <i className="fas fa-clock"></i>
                    <h3>Timeline View</h3>
                    <p>View your memories chronologically and see how your journey has evolved over time.</p>
                </div>
                <div className="feature-card">
                    <i className="fas fa-share-alt"></i>
                    <h3>Share Your Journey</h3>
                    <p>Share specific memories or your entire map with friends and family.</p>
                </div>
            </section>

            <footer>
                <p>&copy; {new Date().getFullYear()} Memory Mapping. Create your personal journey today.</p>
            </footer>
        </>
    );
};

export default LandingPage;
