// Component 間的從屬關係可以用 React devtools 檢查 (Chrome)
// 使用 Profiler (剖析器)

import Child from './Child';

function Parent() {
    return (
        <>
            <Child
                text="React 你好"
                abc={123}
                isBook={false}
                foo={() => {
                    alert('hello');
                }}
            />
            <Child />
        </>
    );
}

export default Parent;
