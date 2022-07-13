function ProductItem(props) {
    // 每個商品物件
    /*
        {
            id: 1,
            category: 'Shirt',
            title: '咖啡色純棉 T-shirt',
            imgsrc: 'https://i.imgur.com/1GrakTl.jpg',
            price: 44.00,,
            quantity: 1
        }
    */

    // 留意 Props Drilling 問題
    // 屬於一種 Anti-Pattern
    // 用 Context 解決
    const {
        index,
        category,
        title,
        imgsrc,
        price,
        // total,
        setTotal,
        quantity,
        removeItem,
    } = props;

    return (
        <>
            <div
                className={`row ${
                    index === 0 ? 'border-top' : ''
                } border-bottom`}
            >
                <div className="row main align-items-center">
                    <div className="col-2">
                        <img className="img-fluid" src={imgsrc} alt="" />
                    </div>
                    <div className="col">
                        <div className="row text-muted">{category}</div>
                        <div className="row">{title}</div>
                    </div>
                    <div className="col">
                        <a
                            href="#/"
                            onClick={() => {
                                setTotal(quantity - 1);
                                // setTotal(total - 1);
                            }}
                        >
                            -
                        </a>
                        <a href="#/" className="border">
                            {quantity}
                            {/* {total} */}
                        </a>
                        <a
                            href="#/"
                            onClick={() => {
                                setTotal(quantity + 1);
                                // setTotal(total + 1);
                            }}
                        >
                            +
                        </a>
                    </div>
                    <div className="col">
                        &euro; {price}{' '}
                        <span className="close" onClick={removeItem}>
                            &#10005;
                        </span>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ProductItem;
