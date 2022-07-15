import { useRef } from 'react';

function RefsForm() {
    const inputRef = useRef(null);

    return (
        <>
            <h1>Refs Form</h1>
            <input type="text" ref={inputRef} />
            <button
                onClick={() => {
                    // 用 current 屬性取得原本的 HTML Element 參照
                    inputRef.current.focus();
                }}
            >
                Focus
            </button>
            <button
                onClick={() => {
                    inputRef.current.blur();
                }}
            >
                Blur
            </button>
            <button
                onClick={() => {
                    alert(inputRef.current.value);
                }}
            >
                Show Value
            </button>
        </>
    );
}

export default RefsForm;
