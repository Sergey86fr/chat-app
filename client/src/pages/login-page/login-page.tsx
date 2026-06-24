import cn from "classnames";
import styles from "./login-page.module.css";
import {useState, type SubmitEvent, useEffect} from "react";
import PageLoader from "../../components/page-loader/page-loader.tsx";
import {useLogin} from "../../hooks/useLogin.ts";
import {Link, useNavigate} from "react-router-dom";
import {Mail, Lock} from "lucide-react";


const LoginPage = () => {
    const[formData, setFormData] = useState({email: "", password: ""});
    const{mutate:login, isPending, isSuccess } = useLogin()
    const navigate = useNavigate();

    useEffect(() => {
        if (isSuccess) {
            navigate("/", { replace: true });
        }
    }, [isSuccess, navigate]);


    const handleSubmit = async (e: SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();
        login(formData)
    }
    return (
        <div className={cn(styles.loginPage)}>
            <form className={cn(styles.form)} onSubmit={handleSubmit}>
                {/* EMAIL INPUT */}
                <div>
                    <label className={cn(styles.inputLabel)} htmlFor="email">Email</label>
                    <div className={cn(styles.inputWrapper)} >

                        <Mail size={24} className={cn(styles.mail)} />
                        <input
                            className={cn(styles.input)}
                            id="email"
                            type="email"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            placeholder="johndoe@gmail.com"
                        />
                    </div>
                </div>

                {/* PASSWORD INPUT */}
                <div>
                    <label htmlFor="password" className={cn(styles.inputLabel)} >Пароль</label>
                    <div className={cn(styles.inputWrapper)}>
                        <Lock size={24} className={cn(styles.lock)} />
                        <input
                            className={cn(styles.input)}
                            id="password"
                            type="password"
                            value={formData.password}
                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                            placeholder="Введите ваш пароль"
                        />
                    </div>
                </div>

                {/* SUBMIT BUTTON */}
                <button className={cn(styles.submitButton)} type="submit" disabled={isPending}>
                    {isPending ? (
                        <PageLoader />
                        // <LoaderIcon className="w-full h-5 animate-gwbspin text-center" />
                    ) : (
                        "Вход"
                    )}
                </button>
            </form>
            <div className={cn(styles.linkWrapper)}>
                <Link className={cn(styles.link)} to="/register" >
                    Нет аккаунта? Зарегистрируйтесь
                </Link>
            </div>
        </div>
    );
};

export default LoginPage;
