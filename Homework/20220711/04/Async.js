// 異步執行
// async/await 把異步變成同步

import { useState } from 'react';

function Async() {
    const [total, setTotal] = useState(0);

    return (
        <>
            <h1>{total}</h1>
            <button
                onClick={() => {
                    console.log('before', total);

                    // 只會執行一次 而且只在這個函式最後執行
                    // 只有最後的那個 setTotal() 會被執行
                    setTotal(total + 1);
                    setTotal(total + 1);
                    setTotal(total + 1);

                    // 所以想接到的話
                    const newTotal = total + 1;
                    setTotal(newTotal);

                    // 所以 after 永遠接不到這個值
                    console.log('after', total);
                    // 這樣就接得到
                    console.log('after', newTotal);
                }}
            >
                +1
            </button>
        </>
    );
}

export default Async;
