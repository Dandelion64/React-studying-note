// import PropTypes from 'prop-types';

function Child(props) {
    // function Child({text, abc, isBook, foo}) {
    // console.log(props);

    const { text = '沒有給文字', abc = 9527, isBook = true, foo } = props;
    return (
        <>
            <h1>{text}</h1>
            {isBook ? <p>{abc}</p> : ''}
            <button onClick={foo}>Click Me !</button>
        </>
    );
}

// 注意 Proptypes 只會幫忙跳 Warning
// 不會跳出中斷錯誤 (Uncaught Error)

// Child.propTypes = {
//     text: PropTypes.string.isRequired,
//     abc: PropTypes.number.isRequired,
// };

// 預設值 但 React 官方想移除這功能
// 因為函式本身就可以做預設值的處理
Child.defaultProps = {
    text: '沒給文字',
    abc: 0,
};

export default Child;
