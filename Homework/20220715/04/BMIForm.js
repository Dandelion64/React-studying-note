import { useState } from 'react';

function BMIForm(props) {
    const [myHeight, setMyHeight] = useState(0);
    const [myWeight, setMyWeight] = useState(0);
    const [myBMI, setMyBMI] = useState(0);

    return (
        <>
            <h1>BMI計算</h1>
            <label>身高(公分):</label>
            <input
                type="text"
                name="myHeight"
                value={myHeight}
                onChange={(e) => {
                    // 保持state的資料類型一致為number(與初始值相同)
                    // 注意e.target.value為字串類型
                    setMyHeight(Number(e.target.value));
                }}
            />
            <br />
            <label>體重(公斤):</label>
            <input
                type="text"
                name="myWeight"
                value={myWeight}
                onChange={(e) => {
                    // 保持state的資料類型一致為number(與初始值相同)
                    // 注意e.target.value為字串類型
                    setMyWeight(Number(e.target.value));
                }}
            />
            <br />
            <button
                onClick={() => {
                    const bmi = myWeight / Math.pow(myHeight / 100, 2);
                    setMyBMI(bmi);
                }}
            >
                計算
            </button>
            <button
                onClick={() => {
                    setMyHeight(0);
                    setMyWeight(0);
                    setMyBMI(0);
                }}
            >
                清除
            </button>
            <hr />
            {/* toFixed為格式化數字使用，保留一位小數之後四捨五入 */}
            <p>你的BMI值為: {myBMI > 0 ? myBMI.toFixed(1) : ''}</p>
        </>
    );
}

export default BMIForm;
