import { useState, useEffect } from 'react';
import axios from 'axios';

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
    // 第一次記錄伺服器的原始資料用
    const [usersRaw, setUsersRaw] = useState([]);
    // 呈現資料用
    const [usersDisplay, setUsersDisplay] = useState([]);
    // 載入動畫指示旗標
    const [isLoading, setIsLoading] = useState(false);
    // 搜尋用
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
            // 關閉載入動畫 自動兩秒後執行
            setTimeout(() => {
                setIsLoading(false);
            }, 2000);
        }
        // 自己設定並偵聽自己 是個特別的例子
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
                    const newSearchWord = e.target.value;
                    console.log(e.target.value);
                    // React 中的狀態非常敏感 其實算是一個 bug
                    // 會抓到輸入法的拼字
                    // 例如使用無蝦米輸入法的話
                    // 會依序得到 Q, QE, QEK, 張
                    // 如果使用日文的話也是一樣 拼音文字都會遇到
                    // 可以利用 Composition Event 處理
                    // 所以最好假資料不要中英混雜 大專時先不要
                    // 除非有心力去處理
                    // 同時也因為 Change 事件太敏感
                    // 大專時建議先用搜尋按鈕的方式
                    setSearchWord(newSearchWord);

                    setIsLoading(true);

                    if (newSearchWord.trim()) {
                        const newUsersDisplay = usersRaw.filter(
                            (value, index) => value.name.includes(newSearchWord)
                        );
                        setUsersDisplay(newUsersDisplay);
                    } else {
                        setUsersDisplay(usersRaw);
                    }
                }}
            />
            <br />
            {isLoading ? spinner : table}
        </>
    );
}

export default User;
