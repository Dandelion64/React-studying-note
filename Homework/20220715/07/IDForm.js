function IDForm(props) {
    return (
        <>
            <h1>ID Form</h1>
            <input type="text" id="myInput" />
            <button
                onClick={() => {
                    document.querySelector('#myInput').focus();
                }}
            >
                Focus
            </button>
            <button
                onClick={() => {
                    document.querySelector('#myInput').blur();
                }}
            >
                Blur
            </button>
            <button
                onClick={() => {
                    alert(document.querySelector('#myInput').value);
                }}
            >
                Show Value
            </button>
        </>
    );
}

export default IDForm;
