import { useState } from 'react';

function ChildB(props) {
    const { setDataFromChildB } = props;

    const [childBData, setChildBData] = useState('Child B Data');

    // Step 3. 子女必須要呼叫或執行此函式

    return (
        <>
            <h1>Child B</h1>
            <button
                onClick={() => {
                    setDataFromChildB(childBData);
                }}
            >
                把資料送給父母
            </button>
        </>
    );
}

export default ChildB;
