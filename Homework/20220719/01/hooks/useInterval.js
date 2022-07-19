import { useEffect, useRef } from 'react';

function useInterval(callback, delay) {
    const savedCallback = useRef();

    // 保存新回調
    useEffect(() => {
        // 其實這裡是在做 useCallback
        // 但是可改變參數的版本
        savedCallback.current = callback;
    });

    // 建立 interval
    useEffect(() => {
        const tick = () => {
            savedCallback.current();
        };
        if (delay !== null) {
            const id = setInterval(tick, delay);
            return () => clearInterval(id);
        }
    }, [delay]);
}

export default useInterval;
