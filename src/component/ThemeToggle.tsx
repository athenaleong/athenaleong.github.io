import React, { useState, useEffect } from 'react';

const ThemeToggle = () => {
    const [isDarkMode, setIsDarkMode] = useState(localStorage.getItem('theme') === 'dark');
    
    useEffect(() => {
        if (isDarkMode) {
            document.documentElement.classList.add('dark');
            localStorage.setItem('theme', 'dark');
        } else {
            document.documentElement.classList.remove('dark');
            localStorage.setItem('theme', 'light');

        }
    }, [isDarkMode])

    return (
        <button
            onClick={
                () => {setIsDarkMode(!isDarkMode)}
            }
        >Toggle {isDarkMode ? 'Dark' : 'Light'}
        </button>
    )
};

export default ThemeToggle;