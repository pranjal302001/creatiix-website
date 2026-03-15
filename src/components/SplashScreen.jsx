import React, { useEffect, useState } from 'react';
import videoSrc from '../assets/Logo Video Animation.mp4';

const SplashScreen = ({ onFinish }) => {
    const [fadingOut, setFadingOut] = useState(false);

    const handleVideoEnd = () => {
        setFadingOut(true);
        // Give time for fade-out animation to complete before unmounting
        setTimeout(() => {
            onFinish();
        }, 500);
    };

    return (
        <div
            className={`fixed inset-0 z-50 flex items-center justify-center bg-black transition-opacity duration-500 ${fadingOut ? 'opacity-0' : 'opacity-100'
                }`}
        >
            <video
                className="w-full h-full object-cover"
                src={videoSrc}
                autoPlay
                muted
                playsInline
                onEnded={handleVideoEnd}
            />
        </div>
    );
};

export default SplashScreen;
