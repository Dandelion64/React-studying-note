// ./src/WeatherSetting.js

// 在 React 中表單元素的處理主要可以分成兩種 Controlled 和 Uncontrolled 這兩種，這裡關於 Controlled 和 Uncontrolled 指的是「資料受不受到 React 所控制」，也就是「受 React 所控制的資料（Controlled）」或「不受 React 所控制的資料（Uncontrolled）」。

// 把表單資料交給 React 來處理的稱作 Controlled Components，也就是受 React 控制的資料；相對地，如果不把表單資料交給 React，而是像過去一樣，選取到該表單元素後，才從該表單元素取出值的這種做法，就稱作 Uncontrolled Components，也就是不受 React 控制的資料。

//多數的表單元素都可以交給 React 處理，除了上傳檔案用的 <input type="file" /> 例外，因為該元素有安全性的疑慮，JavaScript 只能取值而不能改值，也就是透過 JavaScript 可以知道使用者選擇要上傳的檔案為何（取值），但不能去改變使用者要上傳的檔案（改值）。因此對於檔案上傳用的 <input type="file" /> 只能透過 Uncontrolled Components 的方式處理。

import React, { useState } from "react";
import styled from "@emotion/styled";

const WeatherSettingWrapper = styled.div`
    position: relative;
    min-width: 360px;
    box-shadow: ${({ theme }) => theme.boxShadow};
    background-color: ${({ theme }) => theme.foregroundColor};
    box-sizing: border-box;
    padding: 20px;
`;

const Title = styled.div`
    font-size: 28px;
    color: ${({ theme }) => theme.titleColor};
    margin-bottom: 30px;
`;

const StyledLabel = styled.label`
    display: block;
    font-size: 16px;
    color: ${({ theme }) => theme.textColor};
    margin-bottom: 15px;
`;

const StyledInputList = styled.input`
    display: block;
    box-sizing: border-box;
    background: transparent;
    border: 1px solid ${({ theme }) => theme.textColor};
    outline: none;
    width: 100%;
    max-width: 100%;
    color: ${({ theme }) => theme.textColor};
    font-size: 16px;
    padding: 7px 10px;
    margin-bottom: 40px;
`;

const ButtonGroup = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;

    > button {
        display: flex;
        align-items: center;
        justify-content: center;
        white-space: nowrap;
        user-select: none;
        margin: 0;
        letter-spacing: 0.3px;
        line-height: 1;
        cursor: pointer;
        overflow: visible;
        text-transform: none;
        border: 1px solid transparent;
        background-color: transparent;
        height: 35px;
        width: 80px;
        border-radius: 5px;

        &:focus,
        &.focus {
            outline: 0;
            box-shadow: none;
        }

        &::-moz-focus-inner {
            padding: 0;
            border-style: none;
        }
    }
`;

const Back = styled.button`
    && {
        color: ${({ theme }) => theme.textColor};
        border-color: ${({ theme }) => theme.textColor};
    }
`;

const Save = styled.button`
    && {
        color: white;
        background-color: #40a9f3;
    }
`;

const locations = [
    "嘉義縣",
    "新北市",
    "嘉義市",
    "新竹縣",
    "新竹市",
    "臺北市",
    "臺南市",
    "宜蘭縣",
    "苗栗縣",
    "雲林縣",
    "花蓮縣",
    "臺中市",
    "臺東縣",
    "桃園市",
    "南投縣",
    "高雄市",
    "金門縣",
    "屏東縣",
    "基隆市",
    "澎湖縣",
    "彰化縣",
    "連江縣",
];

const WeatherSetting = (props) => {
    const { setCurrentPage } = props;

    const [locationName, setLocationName] = useState("臺北市");

    const handleChange = (e) => {
        // console.log(e.target.value);
        setLocationName(e.target.value);
    };

    const handleSave = () => {
        // 判斷使用者填寫的地區是否包含在 locations 陣列內
        if (locations.includes(locationName)) {
            // TODO: 儲存地區資訊...
            console.log(`儲存的地區資訊為：${locationName}`);

            // 透過 setCurrentPage 導回天氣資訊頁
            setCurrentPage("WeatherCard");
        } else {
            // 若不包含在 locations 內則顯示錯誤提示
            alert(`儲存失敗：您輸入的 ${locationName} 並非有效的地區`);
            return;
        }
    };

    return (
        <WeatherSettingWrapper>
            <Title>設定</Title>
            {/* 注意 label 的 for 變成 htmlFor */}
            <StyledLabel htmlFor="location">地區</StyledLabel>
            {/* 使用 onChange 事件來監聽使用者輸入資料 */}
            <StyledInputList
                list="location-list"
                id="location"
                name="location"
                onChange={handleChange}
                value={locationName}
            />
            {/* 既有選項又允許使用者搜尋 很方便 */}
            <datalist id="location-list">
                {/* 利用迴圈的方式跑出所有 option */}
                {locations.map((location) => (
                    <option key={location} value={location} />
                ))}
            </datalist>

            <ButtonGroup>
                <Back onClick={() => setCurrentPage("WeatherCard")}>
                    返回
                </Back>
                <Save onClick={handleSave}>
                    儲存
                </Save>
            </ButtonGroup>
        </WeatherSettingWrapper>
    );
};

export default WeatherSetting;
