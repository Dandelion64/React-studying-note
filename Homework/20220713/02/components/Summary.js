function Summary(props) {
    const { totalNumber, totalPrice } = props;

    return (
        <>
            <div className="col-md-4 summary">
                <div>
                    <h5>
                        <b>付款摘要</b>
                    </h5>
                </div>
                <hr />
                <div className="row">
                    <div className="col col-style">
                        總計 {totalNumber} 件商品
                    </div>
                </div>
                <div className="row  row-style">
                    <div className="col">商品總價</div>
                    <div className="col text-right">&euro; {totalPrice}</div>
                </div>
                <button className="btn">前往結帳</button>
            </div>
        </>
    );
}

export default Summary;
