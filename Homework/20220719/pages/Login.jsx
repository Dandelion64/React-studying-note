// TODO: 嘗試進行頁面跳轉 (done)
import { useNavigate } from 'react-router-dom';

function Login(props) {
    const { auth, setAuth } = props;
    // 嘗試進行頁面跳轉
    const navigate = useNavigate();

    return (
        <>
            <h1>Login.jsx</h1>
            <button
                style={{ position: 'absolute', right: 0, top: 0 }}
                onClick={() => {
                    const newAuth = !auth;
                    setAuth(newAuth);
                    // TODO: 跳出歡迎訊息
                    if (newAuth) {
                        alert('才...才不希望你登入呢！');
                        // 導向首頁
                        setTimeout(() => {
                            navigate('/', { replace: true });
                            // navigate('/');
                            // navigate(-1);
                        }, 1000);
                    } else {
                        alert('掰掰');
                    }
                }}
            >
                {auth ? 'LOGOUT' : 'LOGIN'}
            </button>
        </>
    );
}

export default Login;
