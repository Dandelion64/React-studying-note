import { Fragment, useState } from 'react';

const genderOptions = ['男', '女', '不提供'];

const carOptions = ['Benz', 'BMW', 'Toyota'];

const fruitOptions = ['西瓜', '芒果', '柳丁', '蘋果'];

function MultipleInput() {
    // useState 如果給予物件 不要給空物件
    const [userData, setUserData] = useState({
        fullName: '',
        mobile: '',
        email: '',
        gender: '',
        car: '',
        likeList: [],
    });

    // 共用 onChange
    const handleChange = (e) => {
        // ES6 計算得出的屬性名稱 (Computed Property Name)
        // 用中括號包住
        // setUserData({...userData, [e.target.name]: e.target.value});
        setUserData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    };

    return (
        <>
            <label>姓名</label>
            <input
                name="fullName"
                type="text"
                value={userData.fullName}
                onChange={handleChange}
            />
            <br />
            <label>手機</label>
            <input
                name="mobile"
                type="text"
                value={userData.phone}
                onChange={handleChange}
            />
            <br />
            <label>電郵</label>
            <input
                name="email"
                type="text"
                value={userData.email}
                onChange={handleChange}
            />
            <br />
            <label>性別</label>
            {genderOptions.map((v, i) => {
                return (
                    <Fragment key={i}>
                        <input
                            name="gender"
                            type="radio"
                            checked={userData.gender === v}
                            value={v}
                            onChange={handleChange}
                        />
                        <label>{v}</label>
                    </Fragment>
                );
            })}
            <br />
            <label>喜好車子品牌</label>
            <select value={userData.car} name="car" onChange={handleChange}>
                <option value="">請選擇</option>
                {carOptions.map((v, i) => {
                    return (
                        <option key={i} value={v}>
                            {v}
                        </option>
                    );
                })}
            </select>
            <br />
            <label>喜好水果</label>
            {fruitOptions.map((value, index) => {
                return (
                    <Fragment key={index}>
                        <input
                            type="checkbox"
                            checked={userData.likeList.includes(value)}
                            value={value}
                            onChange={(e) => {
                                // 先判斷是否存在 likeList 陣列之中
                                if (userData.likeList.includes(value)) {
                                    // 有的話移出 沒有則移入
                                    const newLikeList =
                                        userData.likeList.filter(
                                            (value) => value !== e.target.value
                                        );
                                    setUserData((prevState) => ({
                                        ...prevState,
                                        likeList: newLikeList,
                                    }));
                                } else {
                                    const newLikeList = [
                                        ...userData.likeList,
                                        e.target.value,
                                    ];

                                    setUserData((prevState) => ({
                                        ...prevState,
                                        likeList: newLikeList,
                                    }));
                                }
                            }}
                        />
                        <label>{value}</label>
                    </Fragment>
                );
            })}
        </>
    );
}

export default MultipleInput;
