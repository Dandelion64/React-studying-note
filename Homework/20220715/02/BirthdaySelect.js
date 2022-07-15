import { useState } from 'react';

function BirthSelect() {
    const [myYear, setMyYear] = useState('');
    const [myMonth, setMyMonth] = useState('');
    const [myDate, setMyDate] = useState('');

    // 產生選項的函式，盡可能寫成純粹的(pure)的，即回傳只依賴傳入參數值
    // min: number, max: number
    const createOptions = (min, max) => {
        const options = [];

        for (let i = min; i < max + 1; i++) {
            // i 為數字類型，轉型只是為了統一狀態類型為字串
            // 注意保持狀態值的類型在應用程式執行時都一致很重要
            const v = String(i);
            options.push(<option value={v}>{v}</option>);
        }

        return options;
    };

    return (
        <>
            <label>西元</label>
            <select
                value={myYear}
                onChange={(e) => {
                    setMyYear(e.target.value);

                    // 再次選擇年時要重新產生新的日期選項，所以邏輯上日期選項先設回初始值
                    setMyDate('');
                }}
            >
                {/* 第1個選項，和狀態的初始值對應 */}
                <option value="">請選擇</option>
                {createOptions(1940, 2015)}
            </select>
            <label>年</label>
            <select
                value={myMonth}
                onChange={(e) => {
                    setMyMonth(e.target.value);

                    // 再次選擇年時要重新產生新的日期選項，所以邏輯上要日期選項設回初始值
                    setMyDate('');
                }}
            >
                {/* 第1個選項，和狀態的初始值對應 */}
                <option value="">請選擇</option>
                {createOptions(1, 12)}
            </select>
            <label>月</label>
            <select
                value={myDate}
                onChange={(e) => {
                    setMyDate(e.target.value);
                }}
            >
                {/* 第1個選項，和狀態的初始值對應 */}
                <option value="">請選擇</option>
                {/* if的表達式寫法，true會往下執行，myYear(true)  -> myMonth(true) -> createOptions()*/}
                {/* `!==''` 實際上可以不用寫，空白字串是falsy，而且也不會呈現 */}
                {myYear !== '' &&
                    myMonth !== '' &&
                    createOptions(
                        1,
                        new Date(Number(myYear), Number(myMonth), 0).getDate()
                    )}
            </select>
            <label>日</label>
            <button
                onClick={() => {
                    //簡單檢查
                    if (myMonth === '' || myMonth === '' || myDate === '') {
                        alert('請先選擇年月日完成!');
                        return; //跳出函式下面執行，常用！
                    }

                    // 使用者選了年月日後的毫秒值，用`+`一元正號是強制轉為數字，即毫秒(千分之一秒)值，也可以用Number()
                    const msSelectDate = +new Date(
                        `${myYear}/${myMonth}/${myDate}`
                    );

                    // 目前(現在)的毫秒值
                    const msNow = +new Date();

                    //判斷是否滿18歲
                    //18年的豪秒值 = 18 * 365.25 * 24 * 60 * 60 * 1000 = 568036800000
                    if (msNow - msSelectDate > 568036800000) {
                        alert('滿18歲!');
                    } else {
                        alert('還未滿18歲!!');
                    }
                }}
            >
                送出檢查
            </button>
        </>
    );
}

export default BirthSelect;
