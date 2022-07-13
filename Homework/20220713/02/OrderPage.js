import { useState } from 'react';

// 注意已經改成資料夾與 index.js 搭配
// 這樣可以避免重複命名的問題 './components/OrderList/OrderList'
// 在 Create-React-App 中連 /index.js 也可以省略
import OrderList from './components/OrderList';
import Summary from './components/Summary';

import './css/OrderPage.css';

import products from './data/products.json';

// 初始化狀態用的函式
const initState = (productsArray) => {
    // const state = [];
    // for (let i = 0; i < productsArray.length; i++) {
    //     state.push(productsArray[i].quantity);
    // }
    // return state;

    // 只存放數量有點浪費
    const state = [];
    for (let i = 0; i < productsArray.length; i++) {
        state.push({ ...productsArray[i] });
        // state.push({ ...productsArray[i], quantity: 1 });
    }
    return state;
};

// 另一種短語句的寫作技巧
// const initState = (productArray) => Array(productArray.length).fill(1);

function OrderPage() {
    // const [totals, setTotals] = useState(productsArray);

    const [productsInOrder, setProductsInOrder] = useState(initState(products));

    const calcTotalNumber = () => {
        let total = 0;

        for (let i = 0; i < productsInOrder.length; i++) {
            total += productsInOrder[i].quantity;
        }

        return total;
    };

    // 也可以用 reduce 寫
    // const calcTotalNumber = () => totals.reduce((a, b) => a + b, 0)

    const calcTotalPrice = () => {
        let total = 0;

        for (let i = 0; i < productsInOrder.length; i++) {
            total += productsInOrder[i].quantity * productsInOrder[i].price;
        }

        total = total.toFixed(2);
        return total;
    };

    // 也可以用 reduce 寫
    // const calcTotalPrice = () => totals.reduce((r, a, i) => r + a * products[i].price, 0);

    return (
        <div className="card">
            <div className="row">
                {/* <OrderList totals={totals} setTotals={setTotals} /> */}
                <OrderList
                    productsInOrder={productsInOrder}
                    setProductsInOrder={setProductsInOrder}
                />
                {/* 寫成立即執行一次 () */}
                <Summary
                    totalNumber={calcTotalNumber()}
                    totalPrice={calcTotalPrice()}
                />
            </div>
        </div>
    );
}

export default OrderPage;
