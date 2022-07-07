const NumberList = (props) => {
    const numbers = props.numbers;
    // Key 幫助 React 分辨哪些項目被改變、增加或刪除。
    // 在 array 裡面的每個 element 都應該要有一個 key
    // 如此才能給予每個 element 一個固定的身份：

    // 選擇 key 最佳的方法是在列表中使用唯一識別字串來區別 sibling 項目。
    // 通常，你會使用資料的 ID 作為 key

    // 當你 render 的項目沒有固定的 ID 且你也沒有更好的辦法時
    // 你可以使用項目的索引做為 key：

    // 不建議你使用索引作為 key，尤其如果項目的順序會改變的話。
    // 這會對效能產生不好的影響，也可能會讓 component state 產生問題。

    // key 不需要是全域唯一，但在 array 中需要保持唯一。
    // 可以使用像 nano ID 這種工具
    // Key 應該具有穩定、可預測、以及 array 內唯一的特質。

    // Ref: https://zh-hant.reactjs.org/docs/reconciliation.html#recursing-on-children
    const listItems = numbers.map((number) => (
        <li key={number.toString()}>{number}</li>
    ));
    return <ul>{listItems}</ul>;
};

// 請注意 key 只有在周遭有 array 時才有意義

// 範例：Key 的錯誤使用方式

// function ListItem(props) {
//     const value = props.value;
//     return (
//         // 錯！你不需要在這裡指出 key：
//         <li key={value.toString()}>{value}</li>
//     );
// }

// function NumberList(props) {
//     const numbers = props.numbers;
//     const listItems = numbers.map((number) => (
//         // 錯！你應該要在這裡指出 key：
//         <ListItem value={number} />
//     ));
//     return <ul>{listItems}</ul>;
// }

// 範例：Key 的正確使用方式

// function ListItem(props) {
//     // 正確！你不需要在這裡指出 key：
//     return <li>{props.value}</li>;
// }

// function NumberList(props) {
//     const numbers = props.numbers;
//     const listItems = numbers.map((number) => (
//         // 正確！Key 應該在 array 內被指定。
//         <ListItem key={number.toString()} value={number} />
//     ));
//     return <ul>{listItems}</ul>;
// }

// Key 的功能是提示 React，但它們不會被傳遞到你的 component。
// 如果你在 component 中需要同樣的值，
// 你可以直接把這個值用一個不同的名稱作為 prop 傳下去：

// const content = posts.map((post) => (
//     <Post key={post.id} id={post.id} title={post.title} />
// ));

// JSX 讓你在大括號中嵌入任何表達式，所以我們能夠 inline map() 的結果：

// function NumberList(props) {
//     const numbers = props.numbers;
//     return (
//         <ul>
//             {numbers.map((number) => (
//                 <ListItem key={number.toString()} value={number} />
//             ))}
//         </ul>
//     );
// }

export default NumberList;
