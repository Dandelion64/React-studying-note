import { useState } from 'react';

function BirthdaySelect(props) {
    const [myYear, setMyYear] = useState('');
    const [myMonth, setMyMonth] = useState('');
    const [myDate, setMyDate] = useState('');

    const createYear = () => {
        const year = [];
        for (let i = 1950; i < 2011; i++) {
            year.push(<option key={i}>{i}</option>);
        }
        return year;
    };
    const createMonth = () => {
        const month = [];
        for (let i = 1; i < 13; i++) {
            month.push(<option key={i}>{i}</option>);
        }
        return month;
    };
    const createDate = () => {
        const date = [];

        if (myYear === '' || myMonth === '') return [];

        // 取得當月日期
        const dateNum = new Date(Number(myYear), Number(myMonth), 0).getDate();

        for (let i = 1; i <= dateNum; i++) {
            date.push(<option key={i}>{i}</option>);
        }

        return date;
    };

    return (
        <>
            <select
                value={myYear}
                onChange={(e) => {
                    setMyYear(e.target.value);
                }}
            >
                <option>請選擇</option>
                {createYear()}
            </select>
            <label> &nbsp; 年 &nbsp; </label>
            <select
                value={myMonth}
                onChange={(e) => {
                    setMyMonth(e.target.value);
                }}
            >
                <option>請選擇</option>
                {createMonth()}
            </select>
            <label> &nbsp; 月 &nbsp; </label>
            <select
                value={myDate}
                onChange={(e) => {
                    setMyDate(e.target.value);
                }}
            >
                <option>請選擇</option>
                {createDate()}
            </select>
            <label> &nbsp; 日 &nbsp; </label>
        </>
    );
}

export default BirthdaySelect;
