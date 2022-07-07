// 通常來說，有一些 component 需要反映相同的資料變化。
// 我們建議將共享的 state 提升到最靠近它們的共同 ancestor。
// 讓我們來看這是如何運作的。

import React from "react";

const scaleNames = {
    c: "Celsius",
    f: "Fahrenheit",
};

const toCelsius = (fahrenheit) => {
    return ((fahrenheit - 32) * 5) / 9;
};

const toFahrenheit = (celsius) => {
    return (celsius * 9) / 5 + 32;
};

const tryConvert = (temperature, convert) => {
    const input = parseFloat(temperature);
    if (Number.isNaN(input)) {
        return "";
    }
    const output = convert(input);
    const rounded = Math.round(output * 1000) / 1000;
    return rounded.toString();
};

const BoilingVerdict = (props) => {
    if (props.celsius >= 100) {
        return <p>The water would boil.</p>;
    }
    return <p>The water would not boil.</p>;
};

class TemperatureInput extends React.Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e) {
        this.props.onTemperatureChange(e.target.value);
    }

    render() {
        const temperature = this.props.temperature;
        const scale = this.props.scale;

        return (
            <fieldset>
                <legend>Enter temperature in {scaleNames[scale]}:</legend>
                <input value={temperature} onChange={this.handleChange} />
            </fieldset>
        );
    }
}

class Calculator extends React.Component {
    constructor(props) {
        super(props);
        this.handleCelsiusChange = this.handleCelsiusChange.bind(this);
        this.handleFahrenheitChange = this.handleFahrenheitChange.bind(this);
        this.state = {
            temperature: "",
            scale: "c",
        };
    }

    handleCelsiusChange(temperature) {
        this.setState({ scale: "c", temperature });
    }

    handleFahrenheitChange(temperature) {
        this.setState({ scale: "f", temperature });
    }

    render() {
        const scale = this.state.scale;
        const temperature = this.state.temperature;
        const celsius =
            scale === "f" ? tryConvert(temperature, toCelsius) : temperature;
        const fahrenheit =
            scale === "c" ? tryConvert(temperature, toFahrenheit) : temperature;

        return (
            <div>
                <TemperatureInput
                    scale="c"
                    temperature={celsius}
                    onTemperatureChange={this.handleCelsiusChange}
                />
                <TemperatureInput
                    scale="f"
                    temperature={fahrenheit}
                    onTemperatureChange={this.handleFahrenheitChange}
                />
                <BoilingVerdict celsius={parseFloat(celsius)} />
            </div>
        );
    }
}

// 在 React 中，共享 state 是透過將 state 
// 搬移到需要它的 component 共同最近的 ancestor 來完成的。
// 這被稱為「提升 state」。
// 我們將從 TemperatureInput 移除 local state 並且搬移它到 Calculator。

// 如果 Calculator 擁有共享 state，它將成為目前兩個溫度輸入的「真相來源」。
// 這可以說明它們兩者具有一致的值。
// 由於這兩個 TemperatureInput component 的 prop 都是來自相同的 Calculator parent component，所以這兩個輸入會彼此同步。

// 經驗學習
// 在 React 應用程式中，對於資料的變化只能有一個唯一的「真相來源」。
// 通常來說，state 會優先被加入到需要 render 的 component。
// 接著，如果其他的 component 也需要的話，
// 你可以提升 state 到共同最靠近的 ancestor。
// 你應該依賴上至下的資料流，而不是嘗試在不同 component 之間同步 state。

export default Calculator;
