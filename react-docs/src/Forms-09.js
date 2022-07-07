import React from "react";

class NameForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            value: "",
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
        this.setState({ value: e.target.value });
    }

    handleSubmit(e) {
        alert(`A name was submitted: ${this.state.value}`);
        e.preventDefault();
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <label>
                    Name:
                    <input
                        type="text"
                        value={this.state.value}
                        onChange={this.handleChange}
                    />
                </label>
                <input type="submit" value="Submit" />
            </form>
        );
    }
}

// Controlled Component

// 由於 value attribute 是被設定在我們的表單 element 上，
// 顯示的 value 會永遠是 this.state.value，
// 這使得 React 的 state 成為了資料來源。

// 在這樣的 controlled component 中，
// 顯示的 value 始終由 React 的 state 驅動，
// 雖然這意味著你必須寫更多的 code，
// 但現在你同時可以將 value 傳遞給其他的 UI element，
// 或是從其他 event handler 重置。

// export default NameForm;

// 在 HTML 中，一個 <textarea> 的 element 是經由它的 children 來定義它的文字：

// <textarea>
//     Hello there, this is some text in a text area
// </textarea>

class EssayForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: "Please write an essay about your favorite DOM element",
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({ value: event.target.value });
    }

    handleSubmit(event) {
        alert(`An essay was submitted ${this.state.value}`);
        event.preventDefault();
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <label>
                    Essay:
                    <textarea
                        value={this.state.value}
                        onChange={this.handleChange}
                    />
                </label>
                <input type="submit" value="Submit" />
            </form>
        );
    }
}

// Select 標籤

// 在 HTML 中，<select> 會建立一個下拉式選單。
// 例如，這個 HTML 會建立一個有各種水果的下拉式選單：

// <select>
//     <option value="grapefruit">Grapefruit</option>
//     <option value="lime">Lime</option>
//     <option selected value="coconut">Coconut</option>
//     <option value="mango">Mango</option>
// </select>

// =======================================================================
// 請注意在這裡，椰子的選項是一開始就被選定的，因為它有一個 selected attribute。
// 但是在 React 中並不是用 selected attribute，
// 而是在 select 的標籤上用一個 value attribute。
// 對一個 controlled component 來說這是比較方便的，因為你只需要在一個地方更新它。
// =======================================================================

class FlavorForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            // 這樣只要改動這裡就好了 對 React 來說比較方便
            value: "coconut",
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({ value: event.target.value });
    }

    handleSubmit(event) {
        alert("Your favorite flavor is: " + this.state.value);
        event.preventDefault();
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <label>
                    Pick your favorite flavor:
                    <select
                        value={this.state.value}
                        onChange={this.handleChange}
                    >
                        <option value="grapefruit">Grapefruit</option>
                        <option value="lime">Lime</option>
                        <option value="coconut">Coconut</option>
                        <option value="mango">Mango</option>
                    </select>
                </label>
                <input type="submit" value="Submit" />
            </form>
        );
    }
}

// 注意:
// 你可以將一個 array 傳給 value 這個 attribute，
// 這使得你可以在一個 select 中選取多個選項：

// <select multiple={true} value={['B', 'C']}></select>

// Docs: https://zh-hant.reactjs.org/docs/uncontrolled-components.html#the-file-input-tag

// 如果要寫一個 uncontrolled component，
// 你可以使用 ref 來從 DOM 取得表單的資料，
// 而不是為了每個 state 的更新寫 event handler。

class NameFormUncontrolled extends React.Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.input = React.createRef();
    }

    // 有 Ref 就不再需要 handleChange() {...}

    handleSubmit(e) {
        alert(`A name was submitted: ${this.input.current.value}`);
        e.preventDefault();
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <label>
                    Name:
                    <input type="text" ref={this.input} />
                </label>
                <input type="submit" value="Submit" />
            </form>
        );
    }
}

// 注意，這樣做不會觸發重新渲染畫面。

// 由於 uncontrolled component 保持了 DOM 裡的唯一的真相來源，
// 有的時候使用 uncontrolled component 時更容易整合 React 和非 React 的程式碼。
// 如果你想有個又快又髒的方法，它也可以減少一些程式碼。
// 否則，通常應使用 controlled component。

// Ref: https://goshacmd.com/controlled-vs-uncontrolled-inputs-react/

// 預設值

// 在 React 的 render 生命週期裡，表單上的 value attribute 會覆寫掉 DOM 的值。
// 在 uncontrolled component 裡，
// 你常常會希望 React 去指定初始值，但讓之後的更新保持不可控制的。
// 為了處理這種情況，你可以指定 defaultValue attribute 而非 value。
// 在 component mount 後改變 defaultValue 屬性不會造成任何在 DOM 裡面的值更新。

class NameFormUncontrolledDefaultValue extends React.Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.input = React.createRef();
    }

    handleSubmit(e) {
        alert(`A name was submitted: ${this.input.current.value}`);
        e.preventDefault();
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <label>
                    Name:
                    <input 
                        defaultValue="Dandelion"
                        type="text" 
                        ref={this.input}
                    />
                </label>
                <input type="submit" value="Submit" />
            </form>
        );
    }
}

// 相同地，
// <input type="checkbox"> 和 <input type="radio"> 支援 defaultChecked，
// 而 <select> 和 <textarea> 支援 defaultValue。

// 檔案 input 標籤
// <input type="file" />
// 由於它的值是唯讀，它在 React 中是一個 uncontrolled component。

// 在 React 裡，<input type="file" /> 永遠都是 uncontrolled component，
// 因為它的值只能被使用者設定，而無法由程式碼來設定。

// 你應該使用 File API 來與檔案之間互動。
// 以下範例顯示如何建立一個 ref 到 DOM 節點上 來取得在送出的 handler 的檔案：

class FileInput extends React.Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.fileInput = React.createRef();
    }

    handleSubmit(event) {
        event.preventDefault();
        alert(
            `Selected file - ${this.fileInput.current.files[0].name}`
        );
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <label>
                    Upload file:
                    <input type="file" ref={this.fileInput} />
                </label>
                <br />
                <button type="submit">Submit</button>
            </form>
        );
    }
}

class Reservation extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isGoing: true,
            numberOfGuests: 2,
        }

        this.handleInputChange = this.handleInputChange.bind(this);
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        // 注意我們使用了 ES6 的 computed property name 語法
        // 來更新與輸入中的 name 相對應的 state key：
        this.setState({
            [name]: value,
        });
        // 這和下面的 ES5 程式碼等價：
        // var partialState = {};
        // partialState[name] = value;
        // this.setState(partialState);
    }

    render() {
        return (
            <form>
                <label>
                    Is going:
                    <input
                        name="isGoing"
                        type="checkbox"
                        checked={this.state.isGoing}
                        onChange={this.handleInputChange}
                    />
                </label>
                <br />
                <label>
                    Number of guests:
                    <input 
                        name="numberOfGuests"
                        type="number"
                        value={this.state.numberOfGuests}
                        onChange={this.handleInputChange}
                    />
                </label>
            </form>
        );
    }
}

// 在一個 controlled component 上指明 value prop 可避免使用者改變輸入，
// 除非你希望使用者這樣做。如果你已經指明了 value 但輸入仍然是可以被修改的，
// 你很可能是不小心將 value 的值設定為 undefined 或 null。

// ReactDOM.createRoot(mountNode).render(<input value="hi" />);
// setTimeout(function() {
//     ReactDOM.createRoot(mountNode).render(<input value={null} />);
// }, 1000);

// Controlled component 的替代方案

// 有時候使用 controlled component 是很乏味的，
// 因為你需要為每一個資訊可以改變的方式寫一個 event handler，
// 並將所有的輸入 state 透過一個 React component 來傳遞。
// 這在你將一個舊的 codebase 改寫成 React 時
// 或將一個 React 的應用程式與一個非 React 的函式庫整合時會變得特別麻煩。
// 在這種情況中，你也許會想參考 uncontrolled component，
// 也就是另一種取代輸入表格的方式。

// 成熟的解決方案

// 如果你想找出一個完整的、包含驗證、可追蹤拜訪欄位並能處理提交表單等功能的解決方案，
// Formik 是一個很熱門的選擇。
// 然而，它是在與 controlled component 和維持 state 相同的原則上所建立的，
// 所以別忘了學習它。

// Ref: https://formik.org/

// export default NameForm;
// export default EssayForm;
// export default FlavorForm;

// export default NameFormUncontrolled;
// export default NameFormUncontrolledDefaultValue;

// export default FileInput;

export default Reservation;