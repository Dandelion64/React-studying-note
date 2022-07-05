// Custom Hook

import { useState, useEffect, useCallback } from 'react';

// 練習使用 axios
import axios from "axios";

const fetchCurrentWeather = (locationName) => {
    return axios.get(
        `https://opendata.cwb.gov.tw/api/v1/rest/datastore/O-A0003-001?Authorization=CWB-E2349193-68E5-4124-B14D-C0226B44B958&locationName=${locationName}`
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

const fetchWeatherForecast = (cityName) => {
    return axios.get(
        `https://opendata.cwb.gov.tw/api/v1/rest/datastore/F-C0032-001?Authorization=CWB-E2349193-68E5-4124-B14D-C0226B44B958&locationName=${cityName}`
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

const useWeatherAPI = (currentLocation) => {
    const { locationName, cityName } = currentLocation;

    // 把原本 useState 的部分搬進來
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

    // 把原本 useCallback 的部分搬移進來

    const fetchData = useCallback(() => {
        const fetchingData = async () => {
            const [currentWeather, weatherForecast] = await Promise.all([
                fetchCurrentWeather(locationName),
                fetchWeatherForecast(cityName)
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
        // 因為 fetchingData 沒有相依到 React 組件中的資料狀態
        // 所以 dependencies 陣列中不帶入元素
    }, [locationName, cityName]);

        // 在這裡解構賦值的話
    // 後面可以寫得比較簡潔
    // const {
    //     observationTime,
    //     locationName,
    //     temperature,
    //     windSpeed,
    //     description,
    //     weatherCode,
    //     rainPossibility,
    //     comfortability,
    //     isLoading,
    // } = weatherElement;

    // 把原本 useEffect 的部分搬移進來
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

    return [weatherElement, fetchData];
}

export default useWeatherAPI;