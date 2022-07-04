import React, { useState, useEffect, useCallback, useMemo } from "react";
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

import styled from "@emotion/styled";

// 引入 svg 的方式
// 第一種做法 引入時直接作為 Component
// 後續修改比較方便
import { ReactComponent as RainIcon } from "./images/rain.svg";
// 第二種做法 單純的 svg
// import rainIcon from './images/rain.svg';
// 引入時這樣使用
// <img src={rainIcon} alt='rain icon' />

// 以第一種做法引入所有需要的 svg
import { ReactComponent as AirFlowIcon } from "./images/airFlow.svg";
import { ReactComponent as RefreshIcon } from "./images/refresh.svg";

// 定義許多組件都會共用到的樣式
// 匯入 Emotion 提供的 css 函式
import { css } from "@emotion/react";

// 練習使用 axios
import axios from "axios";

import WeatherIcon from "./WeatherIcon";

import sunriseAndSunsetData from './sunrise-sunset.json';

import { ReactComponent as LoadingIcon } from './images/loading.svg';

// 將 CSS Style 定義為 function
const buttonDefault = (props) => css`
    display: block;
    width: 120px;
    height: 30px;
    font-size: 14px;
    background-color: transparent;
    color: ${props.theme === "dark" ? "#dadada" : "#212121"};
`;

const RejectButton = styled.button`
    ${buttonDefault}
    background-color: red;
`;

const AcceptButton = styled.button`
    ${buttonDefault}
    background-color: green;
`;

const Container = styled.div`
    background-color: #ededed;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
`;

// 未載入就不顯示
// 這樣就不會閃了
const WeatherCard = styled.div`
    position: relative;
    min-width: 360px;
    box-shadow: 0 1px 3px 0 #999999;
    background-color: #f9f9f9;
    box-sizing: border-box;
    padding: 30px 15px;
    visibility: ${({ noNeedToBeHidden }) => (noNeedToBeHidden ? 'visible' : 'hidden')};
`;

// console.log() 印兩次是 StrictMode 的關係
// 實際上是 render twice
// Ref: https://stackoverflow.com/questions/61254372/my-react-component-is-rendering-twice-because-of-strict-mode
// ${(props) => console.log(props)}
const Location = styled.div`
    ${(props) => {}}
    font-size: 28px;
    color: ${(props) => (props.theme === "dark" ? "#dadada" : "#212121")};
    margin-bottom: 20px;
`;

const Description = styled.div`
    font-size: 16px;
    color: #828282;
    margin-bottom: 30px;
`;

const CurrentWeather = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 30px;
`;

const Temperature = styled.div`
    color: #757575;
    font-size: 96px;
    font-weight: 300;
    display: flex;
`;

const Celsius = styled.div`
    font-weight: normal;
    font-size: 42px;
`;

// ˊ可以設定子元素 svg 的 style
const AirFlow = styled.div`
    display: flex;
    align-items: center;
    font-size: 16x;
    font-weight: 300;
    color: #828282;
    margin-bottom: 20px;

    svg {
        width: 25px;
        height: auto;
        margin-right: 30px;
    }
`;

const Rain = styled.div`
    display: flex;
    align-items: center;
    font-size: 16x;
    font-weight: 300;
    color: #828282;

    svg {
        width: 25px;
        height: auto;
        margin-right: 30px;
    }
`;

/* 在這裡寫入 CSS 樣式 */
const Refresh = styled.div`
    position: absolute;
    right: 15px;
    bottom: 15px;
    font-size: 12px;
    display: inline-flex;
    align-items: flex-end;
    color: #828282;

    svg {
        margin-left: 10px;
        width: 15px;
        height: 15px;
        cursor: pointer;
        animation: rotate infinite 1.5s linear;
        animation-duration: ${({ isLoading }) => (isLoading ? '1.5s' : '0s')};
    }

    @keyframes rotate {
        from {
            transform: rotate(360deg);
        }
        to {
            transform: rotate(0deg);
        }
`;

const getMoment = (locationName) => {
    const location = sunriseAndSunsetData.find(
        (data) => data.locationName === locationName
    );

    if (!location) return null;

    const now = new Date();

    // 將當前時間以 "2019-10-08" 的時間格式呈現
    const nowDate = Intl.DateTimeFormat('zh-TW', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
    })
        .format(now)
        .replace(/\//g, '-');
    // 從該地區中找到對應的日期
    const locationDate = location.time && location.time.find((time) => time.dataTime === nowDate);

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
        ? 'day'
        : 'night';
}

const WeatherApp = () => {
    // console.log('invoke function component');

    const [weatherElement, setWeatherElement] = useState({
        observationTime: new Date(),
        locationName: '',
        humid: 0,
        temperature: 0,
        windSpeed: 0,
        description: '',
        weatherCode: 0,
        rainPossibility: 0,
        comfortability: '',
        isLoading: true,
    });

    const fetchData = useCallback(() => {
        const fetchingData = async () => {
            const [currentWeather, weatherForecast] = await Promise.all([
                fetchCurrentWeather(),
                fetchWeatherForecast()
            ]);

            // console.log(currentWeather);
            // console.log(weatherForecast);

            setWeatherElement({
                ...currentWeather,
                ...weatherForecast,
                isLoading: false,
            });            
        }

        setWeatherElement(prevState => ({
            ...prevState,
            isLoading: true,
        }));

        // 記得要呼叫 fetchingData 這個方法
        fetchingData();
        // 因為 fetchingData 沒有相依到 React 組件中的資料狀態，所以 dependencies 陣列中不帶入元素
    }, []);

    // 在這裡解構賦值
    const {
        observationTime,
        locationName,
        temperature,
        windSpeed,
        description,
        weatherCode,
        rainPossibility,
        comfortability,
        isLoading,
    } = weatherElement;

    // 透過 useMemo 避免每次都須重新計算取值，記得帶入 dependencies
    const moment = useMemo(() => 
        getMoment(weatherElement.locationName)
        , [weatherElement.locationName])
    ;

    // Syntax:
    // useEffect(<didUpdate>, [dependencies])
    // 只要每次重新渲染後 dependencies 內的元素沒有改變
    // 任何 useEffect 裡面的函式就不會被執行
    // 也可以根據需求在陣列中放入元素

    // useEffect 的 Effect 指的是 side-effect
    // 即畫面渲染後和 React 本身無關而需要執行的動作
    // 像是 「發送 API 請求資料」、「手動更改 DOM 畫面」 等等

    // useEffect 的 callback 是同步的
    // 多包一層即可
    useEffect(() => {
        // console.log('execute function in useEffect');

        fetchData();
        // 使用 useCallback 後 只要它的 dependencies 沒有改變
        // 它回傳的 fetchData 就可以指稱到同一個函式
        // 把這個 fetchData 放到 useEffect 的 dependencies 後
        // 就不會重新呼叫 useEffect 內的函式
    }, [fetchData]);

    const fetchCurrentWeather = () => {
        return axios.get(
            "https://opendata.cwb.gov.tw/api/v1/rest/datastore/O-A0003-001?Authorization=CWB-E2349193-68E5-4124-B14D-C0226B44B958&locationName=臺北"
        )
            .then((result) => {
                // Step 1: 定義 'locationData' 取出需要的資料
                const locationData = result.data.records.location[0];

                // Step 2: 將風速（WDSD）、氣溫（TEMP）和濕度（HUMD）的資料取出
                // 利用 reduce 將之丟到物件中
                const weatherElements = locationData.weatherElement.reduce(
                    (neededElements, item) => {
                        if (["WDSD", "TEMP", "HUMD"].includes(item.elementName)) {
                            neededElements[item.elementName] = item.elementValue;
                        }
                        return neededElements;
                    },
                    {}
                );

                return {
                    observationTime: locationData.time.obsTime,
                    locationName: locationData.locationName,
                    temperature: weatherElements.TEMP,
                    windSpeed: weatherElements.WDSD,
                    humid: weatherElements.HUMD
                }
            });
    }

    const fetchWeatherForecast = () => {
        return axios.get(
            "https://opendata.cwb.gov.tw/api/v1/rest/datastore/F-C0032-001?Authorization=CWB-E2349193-68E5-4124-B14D-C0226B44B958&locationName=臺北市"
        )
            .then((result) => {
                const locationData = result.data.records.location[0];

                const weatherElements = locationData.weatherElement.reduce(
                    (neededElements, item) => {
                        if (["Wx", "PoP", "CI"].includes(item.elementName)) {
                            neededElements[item.elementName] = item.time[0].parameter;
                        }
                        return neededElements;
                    },
                    {}
                );

                return {
                    description: weatherElements.Wx.parameterName,
                    weatherCode: weatherElements.Wx.parameterValue,
                    rainPossibility: weatherElements.PoP.parameterName,
                    comfortability: weatherElements.CI.parameterName
                }
            });
    };

    return (
        <Container>
            {/* {console.log('render, isLoading: ', weatherElement.isLoading)} */}
            {/* 讀入後才顯示 */}
            <WeatherCard noNeedToBeHidden={locationName}>
                <Location theme="dark">{locationName}</Location>
                <Description>
                    {/* 優化時間呈現 */}
                    {/* Ref: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl */}
                    {/* {new Intl.DateTimeFormat("zh-TW", {
                        hour: "numeric",
                        minute: "numeric",
                    }).format(new Date(observationTime))}{" "} */}
                    {description} {comfortability}
                </Description>
                <CurrentWeather>
                    <Temperature>
                        {/* 優化溫度呈現 */}
                        {Math.round(temperature)}{" "}
                        <Celsius>°C</Celsius>
                    </Temperature>
                    <WeatherIcon
                        currentWeatherCode={weatherCode}
                        moment={moment || 'day'}
                    />
                </CurrentWeather>
                <AirFlow>
                    <AirFlowIcon />
                    {windSpeed} m/h
                </AirFlow>
                <Rain>
                    <RainIcon />
                    {/* 針對濕度進行四捨五入處理精度不足問題 */}
                    {Math.round(rainPossibility)} %
                </Rain>
                {/* 將最後觀測時間移到畫面右下角呈現 */}
                <Refresh 
                    onClick={fetchData}
                    isLoading={isLoading}>
                    最後觀測時間：
                    {new Intl.DateTimeFormat("zh-TW", {
                        hour: "numeric",
                        minute: "numeric",
                    }).format(new Date(observationTime))}{" "}
                    {isLoading ? <LoadingIcon /> : <RefreshIcon />}
                </Refresh>
            </WeatherCard>
            {/* <RejectButton theme='light'>R</RejectButton> */}
            {/* <AcceptButton theme='dark'>A</AcceptButton> */}
        </Container>
    );
};

export default WeatherApp;
