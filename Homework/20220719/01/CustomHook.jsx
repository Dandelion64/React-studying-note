import React, { useState } from 'react';

import useInterval from './hooks/useInterval';

function CustomHook() {
    const [count, setCount] = useState(0);
    const [delay, setDelay] = useState(1000);
    const [isRunning, setIsRunning] = useState(true);

    const handleDelayChange = (e) => {
        const t = Number(e.target.value);
        if (!isNaN(t)) {
            setDelay(t);
        } else {
            setDelay(1000);
        }
    };

    const handleIsRunningChange = (e) => {
        setIsRunning(e.target.checked);
    };

    // 固定 delay
    // useInterval(() => {
    //     setCount(count + 1);
    // }, 1000);

    // 可調整 delay
    useInterval(
        () => {
            // Your own code here...
            setCount(count + 1);
        },
        isRunning ? delay : null
    );

    return (
        <>
            <h1>{count}</h1>
            <input
                type="checkbox"
                checked={isRunning}
                onChange={handleIsRunningChange}
            />{' '}
            Running
            <br />
            <input value={delay} onChange={handleDelayChange} />
        </>
    );
}

export default CustomHook;
