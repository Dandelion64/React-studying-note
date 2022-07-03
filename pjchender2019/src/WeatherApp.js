import React, { useState, useEffect } from "react";
// useEffect 這個方法的參數中需要帶入一個函式
// 而這個函式會在 「畫面渲染完成」 後被呼叫

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
import { ReactComponent as CloudyIcon } from "./images/day-cloudy.svg";
import { ReactComponent as AirFlowIcon } from "./images/airFlow.svg";
import { ReactComponent as RefreshIcon } from "./images/refresh.svg";

// 定義許多組件都會共用到的樣式
// 匯入 Emotion 提供的 css 函式
import { css } from "@emotion/react";

// 練習使用 axios
import axios from "axios";

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

const WeatherCard = styled.div`
    position: relative;
    min-width: 360px;
    box-shadow: 0 1px 3px 0 #999999;
    background-color: #f9f9f9;
    box-sizing: border-box;
    padding: 30px 15px;
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

// 透過 styled(Component) 來把樣式帶入已存在的組件中
/* 在這裡寫入 CSS 樣式 */
const Cloudy = styled(CloudyIcon)`
    flex-basis: 30%;
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
    }
`;

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
    });

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
        fetchCurrentWeather();
        fetchWeatherForecast();
    }, []);

    const fetchCurrentWeather = async () => {
        const result = await axios.get(
            "https://opendata.cwb.gov.tw/api/v1/rest/datastore/O-A0003-001?Authorization=CWB-E2349193-68E5-4124-B14D-C0226B44B958&locationName=臺北"
        );
        // console.log("result", result);

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

        // 注意 setState 時就算只想更動某些屬性
        // 也必須透過解構賦值新蓋舊
        // 因為傳入物件會完全蓋掉舊物件

        // 官方建議:
        // 可以將有關聯的資料放在同一個物件中
        // 而沒有關聯的資料就另外在使用 useState 去定義資料狀態

        // 在 setWeatherElement 中也可以帶入函式
        // 可以透過這個函式的參數取得前一次的資料狀態
        setWeatherElement((prevState) => {
            // 記得要回傳新的資料狀態回去
            return {
                ...prevState,
                observationTime: locationData.time.obsTime,
                locationName: locationData.locationName,
                temperature: weatherElements.TEMP,
                windSpeed: weatherElements.WDSD,
                humid: weatherElements.HUMD
            }
        });
    };

    const fetchWeatherForecast = async () => {
        const result = await axios.get(
            "https://opendata.cwb.gov.tw/api/v1/rest/datastore/F-C0032-001?Authorization=CWB-E2349193-68E5-4124-B14D-C0226B44B958&locationName=臺北市"
        );
        // console.log("result", result);

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

        // 在 setWeatherElement 中也可以帶入函式
        // 可以透過這個函式的參數取得前一次的資料狀態
        setWeatherElement((prevState) => {
            // 記得要回傳新的資料狀態回去
            return {
                ...prevState,
                description: weatherElements.Wx.parameterName,
                weatherCode: weatherElements.Wx.parameterValue,
                rainPossibility: weatherElements.PoP.parameterName,
                comfortability: weatherElements.CI.parameterName
            }
        });
    };

    return (
        <Container>
            {/* {console.log('render')} */}
            <WeatherCard>
                <Location theme="dark">{weatherElement.locationName}</Location>
                <Description>
                    {/* 優化時間呈現 */}
                    {/* Ref: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl */}
                    {/* {new Intl.DateTimeFormat("zh-TW", {
                        hour: "numeric",
                        minute: "numeric",
                    }).format(new Date(weatherElement.observationTime))}{" "} */}
                    {weatherElement.description} {weatherElement.comfortability}
                </Description>
                <CurrentWeather>
                    <Temperature>
                        {/* 優化溫度呈現 */}
                        {Math.round(weatherElement.temperature)}{" "}
                        <Celsius>°C</Celsius>
                    </Temperature>
                    <Cloudy />
                </CurrentWeather>
                <AirFlow>
                    <AirFlowIcon />
                    {weatherElement.windSpeed} m/h
                </AirFlow>
                <Rain>
                    <RainIcon />
                    {/* 針對濕度進行四捨五入處理精度不足問題 */}
                    {Math.round(weatherElement.rainPossibility)} %
                </Rain>
                {/* 將最後觀測時間移到畫面右下角呈現 */}
                <Refresh 
                    onClick={() => {
                        fetchCurrentWeather();
                        fetchWeatherForecast();
                    }}>
                    最後觀測時間：
                    {new Intl.DateTimeFormat("zh-TW", {
                        hour: "numeric",
                        minute: "numeric",
                    }).format(new Date(weatherElement.observationTime))}{" "}
                    <RefreshIcon />
                </Refresh>
            </WeatherCard>
            {/* <RejectButton theme='light'>R</RejectButton> */}
            {/* <AcceptButton theme='dark'>A</AcceptButton> */}
        </Container>
    );
};

export default WeatherApp;
