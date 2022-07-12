import ChildA from './ChildA';
import ChildB from './ChildB';

import { useState } from 'react';

function Parent() {
    const [parentData, setParentData] = useState('parent data');

    // Step 1. 在父母宣告狀態準備接住子女送過來的資料
    // 乍看之下變數名稱很長 其實是 Self-Documenting Code
    const [dataFromChildB, setDataFromChildB] = useState('');

    return (
        <>
            <h1>Parent</h1>
            <p>來自 Child B 的資料：{dataFromChildB}</p>
            {/* 屬性名稱最好和變數名稱一致 */}
            {/* <ChildA parentData /> 的意思是 parentData={true} */}
            <ChildA parentData={parentData} />
            {/* Step 2. 把回調函式傳給子女 */}
            <ChildB setDataFromChildB={setDataFromChildB} />
        </>
    );
}

export default Parent;
