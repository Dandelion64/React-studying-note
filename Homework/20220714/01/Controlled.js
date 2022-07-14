import { useState, Fragment } from 'react';

function Controlled() {
    const [inputText, setInputText] = useState('');
    const [textArea, setTextArea] = useState('');

    // radio group
    const [gender, setGender] = useState('');
    const genderOptions = [
        {
            genderEN: 'male',
            genderCH: '男性',
        },
        {
            genderEN: 'female',
            genderCH: '女性',
        },
        {
            genderEN: 'rainbow',
            genderCH: '彩虹',
        },
    ];

    // select
    const [car, setCar] = useState('');
    const carOptions = ['Benz', 'BMW', 'Toyota'];

    // checkbox - single
    const [agree, setAgree] = useState(false);

    // checkbox - group
    const [likeList, setLikeList] = useState([]);
    // 陣列內容可能像這樣
    // ['西瓜']
    // ['西瓜', '蘋果']
    // ['西瓜', '柳丁', '蘋果']
    // []
    const fruitOptions = ['西瓜', '芒果', '柳丁', '蘋果'];

    return (
        <>
            <section id="inputText">
                <h1>文字輸入框 (input:text)</h1>
                <input
                    type="text"
                    value={inputText}
                    onChange={(e) => {
                        setInputText(e.target.value);
                    }}
                />
            </section>
            <section id="textArea">
                <h1>文字輸入區域 (textarea)</h1>
                <textarea
                    value={textArea}
                    onChange={(e) => {
                        setTextArea(e.target.value);
                    }}
                />
            </section>
            <section id="inputRadio">
                {/* DRY: DON'T REPEAT YOURSELF */}
                <h1>單選按鈕 (input:radio)</h1>
                {/* <input
                    type="radio"
                    checked={gender === 'male'}
                    value="male"
                    onChange={(e) => {
                        setGender(e.target.value);
                    }}
                />
                <label>男性</label>
                <input
                    type="radio"
                    checked={gender === 'female'}
                    value="female"
                    onChange={(e) => {
                        setGender(e.target.value);
                    }}
                />
                <label>女性</label>
                <input
                    type="radio"
                    checked={gender === 'rainbow'}
                    value="rainbow"
                    onChange={(e) => {
                        setGender(e.target.value);
                    }}
                />
                <label>彩虹</label> */}
                {genderOptions.map((value, index) => {
                    return (
                        <div key={index}>
                            <input
                                type="radio"
                                checked={gender === value.genderEN}
                                value={value.genderEN}
                                onChange={(e) => {
                                    setGender(e.target.value);
                                }}
                            />
                            <label>{value.genderCH}</label>
                        </div>
                    );
                })}
            </section>
            <section id="select">
                <h1>下拉清單 (select)</h1>
                <select
                    value={car}
                    onChange={(e) => {
                        setCar(e.target.value);
                    }}
                >
                    <option value="">-- 請選擇 --</option>
                    {carOptions.map((value, index) => {
                        return (
                            <option key={index} value={value}>
                                {value}
                            </option>
                        );
                    })}
                </select>
            </section>
            <section id="checkbox-single">
                <h1>核選方塊(單一) (checkbox)</h1>
                <input
                    type="checkbox"
                    checked={agree}
                    onChange={(e) => {
                        setAgree(e.target.checked);
                    }}
                />
                <label>我同意會員註冊條款</label>
            </section>
            <section id="checkbox-group">
                <h1>核選方塊(群組) (checkbox)</h1>
                {fruitOptions.map((value, index) => {
                    return (
                        <Fragment key={index}>
                            <input
                                type="checkbox"
                                checked={likeList.includes(value)}
                                value={value}
                                onChange={(e) => {
                                    // 先判斷是否存在 likeList 陣列之中
                                    if (likeList.includes(value)) {
                                        // 有的話移出 沒有則移入
                                        const newLikeList = likeList.filter(
                                            (value) => value !== e.target.value
                                        );
                                        setLikeList(newLikeList);
                                    } else {
                                        const newLikeList = [
                                            ...likeList,
                                            e.target.value,
                                        ];
                                        setLikeList(newLikeList);
                                    }
                                }}
                            />
                            <label>{value}</label>
                        </Fragment>
                    );
                })}
            </section>
        </>
    );
}

export default Controlled;
