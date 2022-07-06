import React from 'react';
import styled from '@emotion/styled';

import WeatherIcon from "./WeatherIcon";

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
import { ReactComponent as LoadingIcon } from './images/loading.svg';

// 載入 cog 圖片
import { ReactComponent as CogIcon } from './images/cog.svg';

// 未載入就不顯示
// 這樣就不會閃了
const WeatherCardWrapper = styled.div`
    position: relative;
    min-width: 360px;
    box-shadow: ${({ theme }) => theme.boxShadow};
    background-color: ${({ theme }) => theme.foregroundColor};
    box-sizing: border-box;
    padding: 30px 15px;
    visibility: ${({ noNeedToBeHidden }) => (noNeedToBeHidden ? 'visible' : 'hidden')};
`;

// console.log() 印兩次是 StrictMode 的關係
// 實際上是 render twice
// Ref: https://stackoverflow.com/questions/61254372/my-react-component-is-rendering-twice-because-of-strict-mode
// ${(props) => console.log(props)}
const Location = styled.div`
    font-size: 28px;
    color: ${({ theme }) => theme.titleColor};
    margin-bottom: 20px;
`;

const Description = styled.div`
    font-size: 16px;
    color: ${({ theme }) => theme.textColor};
    margin-bottom: 30px;
`;

const CurrentWeather = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 30px;
`;

const Temperature = styled.div`
    color: ${({ theme }) => theme.temperatureColor};
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
    color: ${({ theme }) => theme.textColor};
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
    color: ${({ theme }) => theme.textColor};

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
    color: ${({ theme }) => theme.textColor};

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
    }
`;

// 為 CogIcon 添加樣式
const Cog = styled(CogIcon)`
    position: absolute;
    top: 30px;
    right: 15px;
    width: 15px;
    height: 15px;
    cursor: pointer;
`;

const WeatherCard = (props) => {
    // 解構賦值
    // 取得 setCurrentPage 方法
    const { weatherElement, moment, fetchData, setCurrentPage, cityName } = props;

    // 在這裡解構賦值的話
    // 後面可以寫得比較簡潔
    const {
        observationTime,
        temperature,
        windSpeed,
        description,
        weatherCode,
        rainPossibility,
        comfortability,
        isLoading,
    } = weatherElement;
    
    return (
        <WeatherCardWrapper noNeedToBeHidden={description}>
            {/* 當齒輪被點擊的時候將 currentPage 改成 WeatherSetting */}
            <Cog onClick={() => setCurrentPage('WeatherSetting')} />
            {/* 將 cityName 代入 */}
            <Location>{cityName}</Location>
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
        </WeatherCardWrapper>
    )
}

export default WeatherCard;