import { useState } from 'react';

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
        </>
    );
}

export default Controlled;
