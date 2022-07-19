import { useState, useEffect } from 'react';

function useWindowHeight() {
    const [height, setHeight] = useState(window.innerHeight);

    const handleResize = () => setHeight(window.innerHeight);

    useEffect(() => {
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    });

    return height;
}

export default useWindowHeight;
