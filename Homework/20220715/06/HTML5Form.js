import { useState } from 'react';
import './css/HTML5Form.css';

function HTML5Form(props) {
    // 記錄表單每個欄位輸入值
    const [fields, setFields] = useState({
        fullName: '',
        email: '',
        password: '',
        confirmPassword: '',
    });

    // 記錄表單每個欄位有錯誤時的訊息
    const [fieldErrors, setFieldErrors] = useState({
        fullNameErrorMsg: '',
        emailErrorMsg: '',
        confirmPasswordErrorMsg: '',
    });

    const handleFieldsChange = (e) => {
        setFields((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    };

    const handleSubmit = (e) => {
        // 先阻擋預設送出表單行為
        e.preventDefault();

        // 這裡可以得到目前輸入的值
        // 第一種方式: 從 State 得到
        // console.log(fields);

        // 第二種方式: 從 FormData() 得到
        const formData = new FormData(e.target);

        console.log(
            formData.get('fullName'),
            formData.get('email'),
            formData.get('password')
        );

        // 做更多驗證
        if (fields.password !== fields.confirmPassword) {
            // 填入錯誤訊息
            setFieldErrors((prevState) => ({
                ...prevState,
                passwordErrorMsg: '密碼與確認密碼欄位輸入值不同',
                confirmPasswordErrorMsg: '密碼與確認密碼欄位輸入值不同',
            }));

            return;
        }

        // TODO: 送到伺服器 (ajax: XMLHttpRequest/Promise/fetch/axios)
    };

    // 表單用，有不合法的驗証出現時會觸發
    const handleInvalid = (e) => {
        // 先阻擋預設行為 泡泡訊息
        e.preventDefault();

        // 錯誤訊息
        // console.log(e.target.validationMessage);

        // 填入錯誤訊息
        setFieldErrors((prevState) => ({
            ...prevState,
            [`${e.target.name}ErrorMsg`]: e.target.validationMessage,
        }));
    };

    // 表單用，整個表單有更動時會觸發
    // 用於讓使用者清空某個正在修改的欄位的錯誤訊息
    const handleFormChange = (e) => {
        // 清空錯誤訊息
        setFieldErrors((prevState) => ({
            ...prevState,
            [`${e.target.name}ErrorMsg`]: '',
        }));
    };

    const { fullName, email, password, confirmPassword } = fields;
    const {
        fullNameErrorMsg,
        emailErrorMsg,
        passwordErrorMsg,
        confirmPasswordErrorMsg,
    } = fieldErrors;

    return (
        <>
            <form
                onSubmit={handleSubmit}
                onInvalid={handleInvalid}
                onChange={handleFormChange}
            >
                <label>姓名</label>
                <input
                    type="text"
                    name="fullName"
                    value={fullName}
                    onChange={handleFieldsChange}
                    required
                />
                <span className="error">{fullNameErrorMsg}</span>
                <br />
                <label>電郵</label>
                <input
                    type="email"
                    name="email"
                    value={email}
                    onChange={handleFieldsChange}
                    required
                />
                <span className="error">{emailErrorMsg}</span>
                <br />
                <label>密碼</label>
                <input
                    type="password"
                    name="password"
                    value={password}
                    onChange={handleFieldsChange}
                    minLength={6}
                    required
                />
                <span className="error">{passwordErrorMsg}</span>
                <br />
                <label>確認密碼</label>
                <input
                    type="text"
                    name="confirmPassword"
                    required
                    minLength={6}
                    value={confirmPassword}
                    onChange={handleFieldsChange}
                />
                <span className="error">{confirmPasswordErrorMsg}</span>
                <br />
                <button type="submit">送出</button>
            </form>
        </>
    );
}

export default HTML5Form;
