import React, { useState } from 'react';

const objArray = [
    {
        id: 1,
        text: 'a',
    },
    {
        id: 2,
        text: 'b',
    },
    {
        id: 3,
        text: 'c',
    },
    {
        id: 4,
        text: 'aa',
    },
];

function ArrayManipulation() {
    const [data, setData] = useState(objArray);

    // 不應該新增多個 因為 key 的關係

    return (
        <>
            <h1>物件陣列的各種操作</h1>
            <p>呈現資料</p>
            <table border="1">
                <tbody>
                    {data.map((value, index) => {
                        return (
                            <tr key={value.id}>
                                <td>{value.id}</td>
                                <td>{value.text}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
            <hr />
            <button
                onClick={() => {
                    // 先寫出要新增的物件值
                    const newObj = { id: 99, text: 'xxx' };

                    // 1. 從目前的狀態拷貝出一個新的變數值(陣列/物件)
                    // 2. 在新的變數值(陣列/物件)上作處理
                    // 3. 設定回原本的狀態中

                    //1
                    //2
                    const newData = [newObj, ...data];

                    //3
                    setData(newData);
                }}
            >
                陣列最前面新增一個物件值id為99與文字為xxx的物件
            </button>
            <br />
            <button
                onClick={() => {
                    const newObj = { id: 88, text: 'yyy' };

                    //1
                    //2
                    const newData = [...data, newObj];

                    //3
                    setData(newData);
                }}
            >
                陣列最後面新增一個物件值id為88與文字為yyy的物件
            </button>
            <br />
            <button
                onClick={() => {
                    const newData = data.filter((value, index) =>
                        value.text.includes('a')
                    );

                    setData(newData);
                }}
            >
                尋找(過濾)只呈現所有文字有a字母的
            </button>
            <br />
            <button
                onClick={() => {
                    const newData = data.filter((value, index) => {
                        // if (value.text.includes('b')) {
                        //     return false;
                        // } else {
                        //     return true;
                        // }
                        return value.text !== 'b';
                    });
                    setData(newData);
                }}
            >
                刪除文字為b的物件
            </button>
            <br />
            <button
                onClick={() => {
                    const newData = data.filter((value, index) => {
                        return value.id !== 99;
                    });
                    setData(newData);
                }}
            >
                刪除id為99的物件
            </button>
            <br />
            <button
                onClick={() => {
                    const newObject = { id: 5, text: 'bbb' };
                    const index = data.findIndex((value) => value.id === 2);
                    if (index > -1) {
                        const newData = [
                            ...data.slice(0, index + 1),
                            newObject,
                            ...data.slice(index + 1),
                        ];
                        setData(newData);
                    }
                }}
            >
                在id為2後面插入id為5與文字為bbb的物件
            </button>
            <br />
            <button
                onClick={() => {
                    const index = data.findIndex((value) => value.id === 3);
                    // 這樣是錯的 只複製到一層
                    // const newData = [...data];

                    // 只要不等於 -1 就代表有找到
                    if (index > -1) {
                        // newData[index].text = 'cccc';

                        // 深層拷貝方法一
                        // const newData = data.map((value) => {
                        //     return { ...value };
                        // });

                        // 深層拷貝方法二
                        // Google Chrome 會幫忙最佳化 效率很好
                        const newData = JSON.parse(JSON.stringify(data));
                        newData[index].text = 'cccc';

                        setData(newData);
                    }
                }}
            >
                取代id為3的文字為cccc
            </button>
            <br />
            {/* 可以用現有最小值和最大值去 +- 1 */}
            {/* 也可以用 nanoID */}
            <button
                onClick={() => {
                    const ids = data.map((value) => value.id);
                    const newId = Math.max(...ids) + 1;
                    const newObj = { id: newId, text: 'xxx' };
                    const newData = [newObj, ...data];

                    setData(newData);
                }}
            >
                陣列最前面新增一個物件值id不重覆與文字為xxx的物件
            </button>
            <br />
            <button
                onClick={() => {
                    const ids = data.map((value) => value.id);
                    const newId = Math.min(...ids) - 1;
                    const newObj = { id: newId, text: 'yyy' };
                    const newData = [...data, newObj];

                    setData(newData);
                }}
            >
                陣列最後面新增一個物件值id不重覆與文字為yyy的物件
            </button>
        </>
    );
}

export default ArrayManipulation;
