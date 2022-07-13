import ProductItem from './ProductItem';
// import products from '../../data/products.json';

function OrderList(props) {
    const { productsInOrder, setProductsInOrder } = props;

    return (
        <>
            <div className="col-md-8 cart">
                <div className="title">
                    <div className="row">
                        <div className="col">
                            <h4>
                                <b>購物車</b>
                            </h4>
                        </div>
                        <div className="col align-self-center text-right text-muted">
                            3 項商品
                        </div>
                    </div>
                </div>
                {/* {productsInOrder.map((value, index) => {
                    const { id, category, title, imgsrc, price } = value;

                    // return 可以寫得更優雅
                    // return (<ProductItem key={value.id} {...value}/>)
                    return (
                        <ProductItem
                            key={id}
                            index={index}
                            id={id}
                            category={category}
                            title={title}
                            imgsrc={imgsrc}
                            price={price}
                            total={totals[index]}
                            setTotal={(newTotal) => {
                                // Step 1. 從目前狀態拷貝一個新的陣列或物件
                                // const newTotals = [...totals];
                                // // Step 2. 在其上做處理
                                // newTotals[index] = newTotal < 1 ? 1 : newTotal;
                                // // Step 3. 設定回原狀態中
                                // setTotals(newTotals);

                                // 也可以用 map() 寫
                                // const newTotals = totals.map((v, i) => {
                                //     if (i === index) 
                                //         return newTotal < 1 ? 1 : newTotal}
                                //     return v)
                                // ;

                                // setTotals(newTotals);

                                // 也可以一句寫完
                                // setTotals(
                                //     totals.map((v, i) =>
                                //         i === index
                                //             ? newTotal < 1
                                //                 ? 1
                                //                 : newTotal
                                //             : v
                                //     )
                                // );

                                // Step 1. 2-layer copy
                                // const newProductsInOrder = productsInOrder.map(
                                //     (v) => { return {...v} }
                                // );

                                // Step 2.
                                // newProductsInOrder[index].quantity = newTotal < 1 ? 1 : newTotal;

                                // Step 3.
                                // setProductsInOrder(newProductsInOrder);

                                const newProductsInOrder = productsInOrder.map(
                                    (v, i) => {
                                        if (i === index)
                                            return {
                                                ...v,
                                                quantity:
                                                    newTotal < 1 ? 1 : newTotal,
                                            };
                                    return v;
                                    }
                                );

                                setProductsInOrder(newProductsInOrder);
                            }}
                        />
                    );
                })} */}
                {productsInOrder.map((value, index) => {
                    return (
                        <ProductItem
                            key={value.id}
                            {...value}
                            removeItem={() => {
                                const newProductsInOrder = productsInOrder.filter((v, i) => {
                                        return value.id !== v.id;
                                    });
                                setProductsInOrder(newProductsInOrder);
                            }}
                            setTotal={(newTotal) => {
                                // 雙層拷貝
                                const newProductsInOrder = productsInOrder.map(
                                    (v) => {
                                        return { ...v };
                                    }
                                );
                                newProductsInOrder[index].quantity =
                                    newTotal < 1 ? 1 : newTotal;
                                setProductsInOrder(newProductsInOrder);
                            }}
                        />
                    );
                })}
                <div className="back-to-shop">
                    <a href="#/">
                        <i className="fa-solid fa-arrow-left-long"></i>
                    </a>
                    <span className="text-muted">繼續選購</span>
                </div>
            </div>
        </>
    );
}

export default OrderList;
