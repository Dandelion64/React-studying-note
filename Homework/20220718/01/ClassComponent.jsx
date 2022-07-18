// 即 React.Component
import { Component } from 'react';

class ClassComponent extends Component {
    // 生命週期方法
    constructor() {
        super(); // 呼叫父類別的 constructor()
        this.state = { total: 0 };
        console.log('constructor()');
    }

    // 生命週期方法
    // Error Catching
    // componentDidCatch() {}

    // 生命週期方法
    componentDidMount() {
        console.log('componentDidMount()');
        // 介接 Real DOM JavaScript Library 或和 Server 要資料在這邊做
        // 在類別型元件中不管跟幾台伺服器要資料都必須統一寫在這裡
        // get data from Server A
        // get data from Server B
        // get data from Server C
        // ...
    }

    // 生命週期方法
    // Ref: https://github.com/donavon/hook-flow
    // 請注意類別型元件的 componentDidUpdate() 執行時機
    // 是在函式型元件的 useLayoutEffect() 時
    componentDidUpdate() {
        console.log('componentDidUpdate()', 'total = ', this.state.total);
        // 在此 setState() 要特別小心 容易造成無窮迴圈
        // 真的要用的話建議加上不會導致無窮的條件 並設定為固定值
        if (this.state.total === 10) {
            // 錯誤狀況一
            // this.setState({
            //     total: 10,
            // });
            // 錯誤狀況二
            // 注意類別型元件的 setState 會 Auto Merge
            // 此狀況導致了無窮迴圈的發生
            // this.setState({
            //     isTen: true,
            // });
            // 正確
            this.setState({
                total: 999,
            });
        }
    }
    // 時至今日之所以有許多人仍使用類別型元件
    // 幾乎都是為了 componentDidUpdate()
    // Syntax: componentDidUpdate(prevProps, prevState, snapShot)
    // 因為 useEffect() 無法取得 prevState()
    // Ref: https://zh-hant.reactjs.org/docs/hooks-faq.html#how-to-get-the-previous-props-or-state
    // 真的想要取得可以利用 Ref
    // function Counter() {
    //     const [count, setCount] = useState(0);
    //     const prevCountRef = useRef();
    //     useEffect(() => {
    //         prevCountRef.current = count;
    //     });
    //     const prevCount = prevCountRef.current;
    //     return <h1>Now: {count}, before: {prevCount}</h1>;
    // }
    // 或
    // function usePrevious(value) {
    //     const ref = useRef();
    //     useEffect(() => {
    //         ref.current = value;
    //     });
    //     return ref.current;
    // }
    // 官方曾在兩年前提到可能會內建 usePrevious
    // 然而時至今日依然沒有結果
    // ex.
    // componentDidUpdate(prevProps, prevState) {
    //     console.log(
    //         'Class Component - componentDidUpdate()',
    //         'total: ',
    //         this.state.total,
    //         'previous total: ',
    //         prevState.total
    //     );
    // }

    // 生命週期方法
    componentWillUnmount() {
        console.log('componentWillUnmount()');
        // 元件沒有辦法移除自己
        // 只有父母元件可以決定子女元件是否呈現
        // 所以這個示例要在 Component.jsx 中實作
        // 注意這個元件消失時會印出 log
    }

    // 生命週期方法
    render() {
        console.log('render()');
        return (
            <>
                <h1>Class Component</h1>
                <h3
                    onClick={() => {
                        this.setState({ total: this.state.total + 1 });
                    }}
                >
                    {this.state.total}
                </h3>
            </>
        );
    }
}

export default ClassComponent;
