import React, { useState, useEffect, useMemo } from "react";
// useEffect 這個方法的參數中需要帶入一個函式
// 而這個函式會在 「畫面渲染完成」 後被呼叫

// 如果某個函式不需要被覆用 那麼可以直接定義在 useEffect 中
// 但若該方法會需要被共用，則把該方法提到 useEffect 外面後
// 記得用 useCallback 進行處理後再放到 useEffect 的 dependencies 中

// useCallback 的用法和 useEffect 幾乎一樣 同樣可以帶入兩個參數
// 第一個參數是一個函式 在這個函式中就去執行你真正要呼叫的函式
// 第二個參數一樣是 dependencies
// 不同的地方是 useCallback 會回傳一個函式
// 只有當 dependencies 有改變時 這個回傳的函式才會改變

import 'normalize.css/normalize.css';

import styled from "@emotion/styled";

import WeatherCard from "./WeatherCard";

// 定義許多組件都會共用到的樣式
// 匯入 Emotion 提供的 css 函式
// import { css } from "@emotion/react";

import sunriseAndSunsetData from "./sunrise-sunset.json";

// 從 emotion-theming 中載入 ThemeProvider
import { ThemeProvider } from "@emotion/react";

import useWeatherAPI from "./useWeatherAPI";

import WeatherSetting from "./WeatherSetting";

import { findLocation } from './utils';

const theme = {
    light: {
        backgroundColor: "#ededed",
        foregroundColor: "#f9f9f9",
        boxShadow: "0 1px 3px 0 #999999",
        titleColor: "#212121",
        temperatureColor: "#757575",
        textColor: "#828282",
    },
    dark: {
        backgroundColor: "#1F2022",
        foregroundColor: "#121416",
        boxShadow:
            "0 1px 4px 0 rgba(12, 12, 13, 0.2), 0 0 0 1px rgba(0, 0, 0, 0.15)",
        titleColor: "#f9f9fa",
        temperatureColor: "#dddddd",
        textColor: "#cccccc",
    },
};

// 將 CSS Style 定義為 function
// const buttonDefault = (props) => css`
//     display: block;
//     width: 120px;
//     height: 30px;
//     font-size: 14px;
//     background-color: transparent;
//     color: ${props.theme === "dark" ? "#dadada" : "#212121"};
// `;

// const RejectButton = styled.button`
//     ${buttonDefault}
//     background-color: red;
// `;

// const AcceptButton = styled.button`
//     ${buttonDefault}
//     background-color: green;
// `;

const Container = styled.div`
    background-color: ${({ theme }) => theme.backgroundColor};
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const WeatherApp = () => {
    // console.log('invoke function component');

    const storageCity = localStorage.getItem('cityName');

    const [currentCity, setCurrentCity] = useState(storageCity || '臺北市');

    // 根據 currentCity 來找出對應到不同 API 時顯示的地區名稱
    // 找到的地區取名為 locationInfo
    const currentLocation = findLocation(currentCity) || {};

    const [weatherElement, fetchData] = useWeatherAPI(currentLocation);

    const [currentTheme, setCurrentTheme] = useState("light");

    const [currentPage, setCurrentPage] = useState("WeatherCard");


    const getMoment = (locationName) => {
        const location = sunriseAndSunsetData.find(
            (data) => data.locationName === locationName
        );
    
        if (!location) return null;
    
        const now = new Date();
    
        // 將當前時間以 "2019-10-08" 的時間格式呈現
        const nowDate = Intl.DateTimeFormat("zh-TW", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
        })
            .format(now)
            .replace(/\//g, "-");
        // 從該地區中找到對應的日期
        const locationDate =
            location.time &&
            location.time.find((time) => time.dataTime === nowDate);
    
        // 將日出日落以及當前時間轉成時間戳記（TimeStamp）
        const sunriseTimestamp = new Date(
            `${locationDate.dataTime} ${locationDate.sunrise}`
        ).getTime();
        const sunsetTimestamp = new Date(
            `${locationDate.dataTime} ${locationDate.sunset}`
        ).getTime();
    
        const nowTimeStamp = now.getTime();
    
        // 若當前時間介於日出和日落中間，則表示為白天，否則為晚上
        return sunriseTimestamp <= nowTimeStamp && nowTimeStamp <= sunsetTimestamp
            ? "day"
            : "night";
    };

    // 透過 useMemo 避免每次都須重新計算取值，記得帶入 dependencies
    const moment = useMemo(
        () => getMoment(currentLocation.sunriseCityName),
        [currentLocation.sunriseCityName,]
    );

    useEffect(() => {
        setCurrentTheme(moment === "day" ? "light" : "dark");
    }, [moment]);

    useEffect(() => {
        localStorage.setItem('cityName', currentCity);
    }, [currentCity]);

    return (
        <ThemeProvider theme={theme[currentTheme]}>
            <Container>
                {/* {console.log('render, isLoading: ', weatherElement.isLoading)} */}
                {/* 利用條件渲染的方式決定要呈現哪個組件 */}
                {/* 將 setcurrentPage 傳入子層給子層使用以更動父層 */}
                {currentPage === "WeatherCard" && (
                    <WeatherCard
                        cityName={currentLocation.cityName}
                        weatherElement={weatherElement}
                        moment={moment}
                        fetchData={fetchData}
                        setCurrentPage={setCurrentPage}
                    />
                )}
                {/* 把縣市名稱傳入 WeatherSetting 中當作表單「地區」欄位的預設值 */}
                {/* 把 setCurrentCity 傳入讓 WeatherSetting 可以修改 currentCity */}
                {currentPage === 'WeatherSetting' && (
                    <WeatherSetting 
                        cityName={currentLocation.cityName}
                        setCurrentCity={setCurrentCity}
                        setCurrentPage={setCurrentPage}
                    />
                )}
                {/* <RejectButton theme='light'>R</RejectButton> */}
                {/* <AcceptButton theme='dark'>A</AcceptButton> */}
            </Container>
        </ThemeProvider>
    );
};

export default WeatherApp;
