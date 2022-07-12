function ChildA(props) {
    const { parentData } = props;

    return (
        <>
            <h1>Child A</h1>
            <p>{parentData}</p>
        </>
    );
}

export default ChildA;
