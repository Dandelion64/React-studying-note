import React from 'react';

function JSXDemo(props) {
    return (
        <>
            <h1>JSX 中各種類型值的呈現</h1>
            <h2>Number</h2>
            {123 - 1}
            {NaN}
            <h2>String</h2>
            {'abc'}
            {`Hello ${100 - 5}`}
            <h2>Boolean (不會呈現)</h2>
            {true}
            {false}
            <h2>null (不會呈現)</h2>
            {null}
            <h2>undefined (不會呈現)</h2>
            {undefined}
            <h2>Array (請用 Element 檢查))</h2>
            {[1, 2, 3, 4]}
            <h2>Object</h2>
            {/* Uncaught Error: Objects are not valid as a React child */}
            {/* {{a: 1, b: 2}} */}
            <h2>Function</h2>
            {/* Warning: Functions are not valid as a React child. */}
            {/* {() => {
                console.log('Arrow Function');
            }} */}
        </>
    );
}

export default JSXDemo;
