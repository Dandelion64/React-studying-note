import axios from 'axios';
import { useState, useEffect } from 'react';

import './User.css';

// Users Data Schema
// {
//     "id": "107001",
//     "name": "張佳蓉"
// }

function User() {
    // 最好要有兩組狀態 一組保存著原有的狀態
    // 才不會使用者搜尋了 "張" 然後取消
    // 然後又要和伺服器要資料 一直轉一直轉
    const [usersRaw, setUsersRaw] = useState([]);
    const [usersDisplay, setUsersDisplay] = useState([]);
    // 載入動畫指示旗標
    const [isLoading, setIsLoading] = useState(false);
    // Controlled Form Element
    const [searchWord, setSearchWord] = useState('');

    const getUserData = async () => {
        // axios 是 Promise() 包 XMLHttpRequest
        const response = await axios.get(
            'https://my-json-server.typicode.com/eyesofkids/json-fake-data/users'
        );
        // axios 會自動轉換 JSON 資料
        // const data = response.json();

        // axios 的資料會放在 data 裏面
        // console.log(response);

        // setState()
        // 在這裡進行篩選
        setUsersRaw(response.data);
        setUsersDisplay(response.data);
    };

    // componentDidMount()
    useEffect(() => {
        // 開啟載入動畫
        setIsLoading(true);
        getUserData();
    }, []);

    useEffect(() => {
        if (isLoading) {
            // 關閉載入動畫
            setTimeout(() => {
                setIsLoading(false);
            }, 2000);
        }
    }, [isLoading]);

    const spinner = (
        <>
            <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
            </div>
            <div className="spinner-border text-secondary" role="status">
                <span className="visually-hidden">Loading...</span>
            </div>
            <div className="spinner-border text-success" role="status">
                <span className="visually-hidden">Loading...</span>
            </div>
            <div className="spinner-border text-danger" role="status">
                <span className="visually-hidden">Loading...</span>
            </div>
            <div className="spinner-border text-warning" role="status">
                <span className="visually-hidden">Loading...</span>
            </div>
            <div className="spinner-border text-info" role="status">
                <span className="visually-hidden">Loading...</span>
            </div>
            <div className="spinner-border text-light" role="status">
                <span className="visually-hidden">Loading...</span>
            </div>
            <div className="spinner-border text-dark" role="status">
                <span className="visually-hidden">Loading...</span>
            </div>
        </>
    );

    const table = (
        <table>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Birth</th>
                </tr>
            </thead>
            <tbody>
                {usersDisplay.map((value, index) => (
                    <tr key={value.id}>
                        <td>{value.id}</td>
                        <td>{value.name}</td>
                        <td>{value.birth}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );

    // 正統資料處理必須要在 server 端執行
    // 但我們這裡在前端做
    return (
        <>
            <h1>User Data</h1>
            <input
                type="text"
                placeholder="萊納你搜啊"
                value={searchWord}
                onChange={(e) => {
                    setSearchWord(e.target.value);
                }}
            />
            <button
                onClick={() => {
                    if (searchWord.trim()) {
                        const newUsersDisplay = usersRaw.filter(
                            (value, index) => value.name.includes(searchWord)
                        );
                        setUsersDisplay(newUsersDisplay);
                    } else {
                        setUsersDisplay(usersRaw);
                    }
                }}
            >
                搜啊
            </button>
            <br />
            {isLoading ? spinner : table}
        </>
    );
}

export default User;
