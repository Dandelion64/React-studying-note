// React 具有強大的 composition 模型，
// 我們建議你在 component 之間使用 composition 來複用你的程式碼，而不是使用繼承。

import React from 'react';

// 包含 (Containment)

// 有些 component 不會提早知道它們的 children 有些什麼。
// 對於像是 Sidebar 或 Dialog 這類通用的「box」component 特別常見。

// 我們建議這些 component 使用特殊的 children prop 
// 將 children element 直接傳入到它們的輸出：

const FancyBorder = (props) => {
    return (
        <div className={`FancyBorder FancyBorder-${props.color}`}>
            {props.children}
        </div>
    );
}

// 這讓其他的 component 透過巢狀的 JSX 將任意的 children 傳遞給它們：

// const WelcomeDialog = () => {
//     return (
//         <FancyBorder color='blue'>
//             <h1 className='Dialog-title'>
//                 Welcome~
//             </h1>
//             <p className='Dialog-message'>
//                 Thank you for visiting our spacecraft!
//             </p>
//         </FancyBorder>
//     );
// }

// 任何在 <FancyBorder> JSX tag 內的內容
// 都被作為 children prop 被傳遞給 FancyBorder component。
// 由於 FancyBorder 在 <div> 內 render {props.children}，
// 被傳遞的 element 會在最終的輸出出現。

// 雖然這個情況不常見，但有時候你可能需要在 component 中使用多個「hole」。
// 在這種情況下，你可以使用你慣用的方法，而不是使用 children：

const SplitPane = (props) => {
    return (
        <div className="SplitPane">
            <div className="SplitPane-left">
                {props.left}
            </div>
            <div className="SplitPane-right">
                {props.right}
            </div>
        </div>
    );
}

const Contacts = () => {
    return <div className="Contacts" />
}

const Chat = () => {
    return <div className="Chat"/>
}

const Wrap = () => {
    return (
        <SplitPane
            left={
                <Contacts />
            }
            right={
                <Chat />
            }
        />
    );
}

// React 的 element 像是 <Contacts /> 和 <Chat /> 都只是 object，
// 所以你可以像其它任何的資料一樣，將它們作為 props 傳遞。
// 這種方法可能會提醒你其他函式庫中的「slot」，
// 但對於你可以在 React 中作為 prop 傳遞的內容沒有限制。

// 特別化 (Specialization)

// 有時候，我們需要考慮 component 會不會是其他 component 的「特別情況」。
// 例如，我們可能會說 WelcomeDialog 是 Dialog 的一個特定情況。

// 在 React 中，這也可以透過 composition 被實現，
// 其中更「特別」的 component render 更多「通用」的 component，
// 並使用 prop 對其進行設定：

// 對於使用 class 定義的 component，composition 一樣有效：

const Dialog = (props) => {
    return (
        <FancyBorder color='blue'>
            <h1 className='Dialog-title'>
                {props.title}
            </h1>
            <p className='Dialog-message'>
                {props.message}
            </p>
            {props.children}
        </FancyBorder>
    );
}

class SignUpDialog extends React.Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.handleSignUp = this.handleSignUp.bind(this);
        this.state = {
            login: '',
        }
    }

    handleChange(e) {
        this.setState({login: e.target.value});
    }

    handleSignUp(e) {
        alert(`Welcome aboard, ${this.state.login}!`);
    }

    render() {
        return (
            <Dialog
                title='Mars Exploration Program'
                message='How should we refer to you?'
            >
                <input 
                    value={this.state.login} 
                    onChange={this.handleChange}
                />
                <button onClick={this.handleSignUp}>
                    Sign Me Up!
                </button>
            </Dialog>
        );
    }
}

const WelcomeDialog = () => {
    return (
        <Dialog 
            title='Welcome!'
            message='Thank you for visiting our spacecraft~'
        />
    );
}

// 那麼關於繼承呢？

// 在 Facebook 中，我們使用 React 在成千上萬個 component，
// 我們找不到任何使用案例來推薦你建立繼承結構的 component。

// Prop 和 composition 提供你明確和安全的方式
// 來自訂 component 的外觀和行為所需的靈活性。
// 請記得，component 可以接受任意的 prop，
// 包含 primitive value、React element，或者是 function。

// 如果你想要在 component 之間複用非 UI 的功能，
// 我們建議抽離它到一個獨立的 JavaScript 模組。
// Component 可以 import 並使用它的 function、object，或者是 class，
// 而不需要繼承它。

// export default WelcomeDialog;
// export default Wrap;
// export default WelcomeDialog;
export default SignUpDialog;