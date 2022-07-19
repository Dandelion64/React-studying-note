// The useEffect() Hook “forgets” the previous render too. It cleans up the last effect and sets up the next effect. The next effect closes over fresh props and state. This is why our first attempt worked for simple cases.

// But setInterval() does not “forget”. It will forever reference the old props and state until you replace it — which you can’t do without resetting the time.

// Or wait, can you?

// The problem boils down to this:

// We do setInterval(callback1, delay) with callback1 from first render.
// We have callback2 from next render that closes over fresh props and state.
// But we can’t replace an already existing interval without resetting the time!
// So what if we didn’t replace the interval at all, and instead introduced a mutable savedCallback variable pointing to the latest interval callback?

// Now we can see the solution:

// We setInterval(fn, delay) where fn calls savedCallback.
// Set savedCallback to callback1 after the first render.
// Set savedCallback to callback2 after the next render.
// ???
// PROFIT

import { useState, useEffect, useRef } from 'react';

function RefsInterval() {
    const [count, setCount] = useState(0);
    const savedCallback = useRef();
    // { current: null }

    const callback = () => {
        // Can read fresh props, state, etc.
        setCount(count + 1);
    };

    // After every render, save the latest callback into our ref.
    useEffect(() => {
        savedCallback.current = callback;
    });

    useEffect(() => {
        const tick = () => {
            savedCallback.current();
        };
        const id = setInterval(tick, 1000);
        return () => clearInterval(id);
    }, []);

    return <h1>{count}</h1>;
}

export default RefsInterval;

// Admittedly, the above code can be disorienting. It’s mind-bending to mix the opposite paradigms. There’s also a potential to make a mess with mutable refs.
