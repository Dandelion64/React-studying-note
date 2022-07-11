// import { data } from './data/student';
import data from './data/student.json';

import React, { Fragment } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

function MapDemo() {
    return (
        <>
            <h1>MapDemo</h1>
            <ul>
                {/* map, filter, find, findIndex 都先寫出箭頭函式回呼模板*/}
                {/* key: 有 id 用 id */}
                {/* 其次用外部函式庫 uuid 或 nanoID */}
                {/* 完全不會再變動才考慮用索引值 */}
                {data.map((value, index) => {
                    return <li key={value.id}>{value.name}</li>;
                })}
            </ul>
        </>
    );
}

function MapDemoTable() {
    return (
        <>
            <h1>MapDemoTable</h1>
            <table>
                <thead>
                    <tr>
                        <th>學號</th>
                        <th>姓名</th>
                        <th>生日</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((value, index) => {
                        return (
                            <tr key={value.id}>
                                <td>{value.id}</td>
                                <td>{value.name}</td>
                                <td>{value.birth}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </>
    );
}

function MapDemoBSCard() {
    return (
        <>
            <h1>MapDemoBSCard</h1>
            <div className="row row-cols-1 row-cols-md-3 g-4">
                {/* 這裡要注意簡略寫法 <></> 不能加上 key */}
                {data.map((value, index) => {
                    return (
                        <Fragment key={value.id}>
                            <h1>{value.name}</h1>
                            <p>{value.birth}</p>
                        </Fragment>
                    );
                })}
            </div>
        </>
    );
}

// export default MapDemo;
// export default MapDemoTable;
export default MapDemoBSCard;
