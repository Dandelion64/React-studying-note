import ClassComponent from './ClassComponent';
import FunctionComponent from './FunctionComponent';

import { useState } from 'react';

function Components() {
    const [isShown, setIsShown] = useState(true);

    return (
        <>
            {isShown && <ClassComponent />}
            <button
                onClick={() => {
                    setIsShown(!isShown);
                }}
            >
                {isShown ? 'Hide' : 'Show'}
            </button>
            <FunctionComponent />
        </>
    );
}

export default Components;
