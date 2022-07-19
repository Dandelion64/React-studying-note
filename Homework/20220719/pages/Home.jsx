function Home(props) {
    const { auth } = props;

    return (
        <>
            <h1>Home.jsx</h1>
            {auth ? '還敢登入Ｒ' : '還不快登入？'}
        </>
    );
}

export default Home;
