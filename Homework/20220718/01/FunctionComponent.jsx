// 老師建議初學者先練熟最常用的 Hook
// 即使知道 useState 底層是用 useReducer 實作的也不要急著學
// 複習一下 useState 的 state 的值型別要保持不變
// 非 Primitives 的話優先使用物件 然後才是陣列
// 使用物件時請不要使用空物件 要給予屬性
import { useState, useEffect, useLayoutEffect, useRef } from 'react';

// 有些人會用 Function Expressions 來寫
// const FC = (props) => (
//     <>
//         <h1>FC</h1>;
//     </>
// );
// export default FC;
// 但是至寧老師不建議
// 一方面是多行時會多出一組小括號
// 另外是程式開發除錯時 難以除錯
// 你當然可以在元件中 console.log()
// ex.
// const FC = (props) => (
//     <>
//         {console.log('log')}
//         <h1>FC</h1>;
//     </>
// );
// 但這樣的除錯訊息並不是這個元件應有的部分

// 第二種常見的寫法是這樣
// export default function(props) {
//     return <>FC</>
// }
// 這樣寫沒有寫成箭頭函式那麼不對至寧老師胃口
// 但是會和 HOC 衝突
// Material-UI, Redux 都有用到 HOC
// HOC (High-Order Component)

const initState = () => {
    console.log('Function Component - simulate constructor()');
    return 0;
};

// useEffect() 無法取得 prevState()
// Ref: https://zh-hant.reactjs.org/docs/hooks-faq.html#how-to-get-the-previous-props-or-state
// 真的想要取得可以利用 Ref
function usePrevious(value) {
    const ref = useRef();
    useEffect(() => {
        ref.current = value;
    });
    return ref.current;
}
// 官方曾在兩年前提到可能會內建 usePrevious
// 然而時至今日依然沒有結果

// 所以至寧老師唯一推薦的是:
// 官方建議的寫法
function FunctionComponent() {
    // const [total, setTotal] = useState(0);
    // 模擬 constructor 實際上行為還是很有差異
    // 因為這個模擬用的 constructor() 每次更新都會執行
    const [total, setTotal] = useState(initState());
    // const [data, setData] = useState('');
    // const [product, setProduct] = useState([]);

    const prevTotal = usePrevious(total);

    // 至寧老師: 三種括號都有 (), [], {}
    // useEffect() 的 Effect 是 Side Effect
    // 自然是用來處理副作用的
    useEffect(() => {
        // 模擬 componentDidMount();
        console.log('Function Component - componentDidMount()');
        // 介接 Real DOM JavaScript Library 或和 Server 要資料在這邊做
    }, []);

    // 在函式型元件中要和多台伺服器要資料 最好分開來寫
    useEffect(() => {
        // get data from Server A
    }, []);
    useEffect(() => {
        // get data from Server B
    }, []);
    useEffect(() => {
        // get data from Server C
    }, []);
    useEffect(() => {
        // ...
    }, []);

    useEffect(() => {
        // 模擬 componentDidMount() + componentDidUpdate();
        console.log(
            'Function Component - componentDidMount() + componentDidUpdate()',
            'total = ',
            total
        );
        // 要將 Updating 階段的 state 或 props 的值放入相依性陣列 (第二個參數)
    }, [total]);

    useEffect(() => {
        // 只模擬 componentDidUpdate();
        // 最簡單的做法是略過初始值
        if (total !== 0) {
            console.log(
                'Function Component - only componentDidUpdate()',
                'total = ',
                total
            );
        }
    }, [total]);

    // 模擬我們在 Class Component 中做的 setState({ total: 999 });
    // useLayoutEffect() 會在 Browsers Paint Screen 前執行
    // 但這樣的模擬方式是不好的 因為這件事本身是沒有副作用的啊
    // 應該把這個條件判斷直接放在 onClick 裏面
    // onClick={() => {
    //     if (total === 10) {
    //         setTotal(999)
    //     } else {
    //         setTotal(total + 1);
    //     }
    // }}
    // 另外要注意 useLayoutEffect() 是同步的
    // 所以不要在裏面做太多事情 否則畫面會延宕導致 UX 變差
    useLayoutEffect(() => {
        if (total === 10) {
            setTotal(999);
        }
    }, [total]);
    // 官方只建議在產生嚴重的閃爍時使用

    useEffect(() => {
        // 模擬 componentWillUnmount()
        return console.log('Function Component: componentWillUnmount()');
    }, []);

    // Cleaner Function
    // 官網稱之為成對的訂閱與退訂模式
    // useEffect(() => {
    //     document.querySelector('#test').addEventListener('click', () => {
    //         alert('hello');
    //     });

    //     // setTimeout() 也要這樣處理
    //     return document.querySelector('#test').removeEventListener('click');
    // }, []);

    useEffect(() => {
        // 查看 usePrevious() 效果
        console.log('total: ', total, 'prevTotal: ', prevTotal);
    }, [prevTotal, total]);

    return (
        <>
            {console.log('Function Component - render()')}
            <h1>Function Component</h1>
            <h3
                onClick={() => {
                    setTotal(total + 1);
                    // 下面這種寫法是絕對錯誤的
                    // setData('hello');
                    // setProduct([111, 222, total]);
                    // React 會對 state 進行 auto batch 再一起更新
                    // setState() 是異步 (Asynchronous) 的
                }}
            >
                {total}
            </h3>
        </>
    );
}

export default FunctionComponent;
