import React, { useEffect, useState } from 'react';

function SetInterval() {
    const [count, setCount] = useState(0);

    useEffect(() => {
        const id = setInterval(() => {
            setCount(count + 1);
        }, 1000);
        return () => clearInterval(id);
    });

    return <h1>{count}</h1>;
}

export default SetInterval;

// FIXME: BUG HAPPENED !!
// setInterval(() => {
//     // 重渲染和重執行 SetInterval 的 effects
//     // 這裡會發生 clearInterval()
//     // 在 interval 被執行前 setInterval()
//     ReactDOM.render(<Counter />, rootElement);
// }, 100);

// 發生這樣的錯誤的原因是:
// React 本身的程式邏輯和 web API 的 setInterval() 之間的衝突

// React 不設置 interval
// 但指定他是否延遲或延遲多少

// setInterval() 卻無法及時地描述過程
// 一旦設定 除了清除它無法對其做任何改變
