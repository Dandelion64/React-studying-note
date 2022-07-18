import { useState, useEffect } from 'react';

function ReactInterview() {
    const [name, setName] = useState('Eddy');

    useEffect(() => {
        setTimeout(() => {
            setName('John');
        }, 3000);
    }, [name]);

    return (
        <>
            <h2>{name}</h2>
            <button
                onClick={() => {
                    setName('Amy');
                }}
            >
                change name to Amy.
            </button>
        </>
    );
}

export default ReactInterview;
