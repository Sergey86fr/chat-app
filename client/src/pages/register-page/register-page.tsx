import cn from "classnames";
import styles from "./register-page.module.css"
import { useEffect, useState, type SubmitEvent} from "react";
import {useRegister} from "../../hooks/useRegister.ts";
import {Link, useNavigate} from "react-router-dom";
import {Lock, Mail, User} from "lucide-react";

const RegisterPage = () => {
    const[formData, setFormData] = useState({ fullName: "", email: "", password: "" })
    const navigate = useNavigate();
    const { mutate: register, isPending, isSuccess } = useRegister();

    useEffect(() => {
        if (isSuccess) {
            navigate("/", { replace: true });
        }
    }, [isSuccess, navigate]);

    const handleSubmit = (e: SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();
        register(formData);
    };


    return (
        <div className={cn(styles.registerPage)}>
            <form onSubmit={handleSubmit} className={cn(styles.form)}>
                {/* FULL NAME */}
                <div>
                    <label htmlFor="fullName" className={cn(styles.inputLabel)}>Ваше имя</label>
                    <div className={cn(styles.inputWrapper)}>
                        <User size={24} className={cn(styles.user)} />

                        <input
                            id="fullName"
                            className={cn(styles.input)}
                            type="text"
                            value={formData.fullName}
                            onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                            placeholder="John Doe"
                        />
                    </div>
                </div>

                {/* EMAIL INPUT */}
                <div>
                    <label className={cn(styles.inputLabel)} htmlFor="email">Email</label>
                    <div className={cn(styles.inputWrapper)}>
                        <Mail size={24} className={cn(styles.mail)} />
                        <input
                            id="email"
                            className={cn(styles.input)}
                            type="email"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            placeholder="johndoe@gmail.com"
                        />
                    </div>
                </div>

                {/* PASSWORD INPUT */}
                <div>
                    <label htmlFor="password" className={cn(styles.inputLabel)}>Пароль</label>
                    <div className={cn(styles.inputWrapper)}>
                        <Lock size={24} className={cn(styles.lock)} />

                        <input
                            id="password"
                            className={cn(styles.input)}
                            type="password"
                            value={formData.password}
                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                            placeholder="Введите свой пароль"
                        />
                    </div>
                </div>

                {/* SUBMIT BUTTON */}
                <button className={cn(styles.submitButton)} type="submit" disabled={isPending}>
                    {isPending ? (
                        "Создание аккаунта"
                        // <LoaderIcon className="w-full h-5 animate-spin text-center" />
                    ) : (
                        "Регистрация"
                    )}
                </button>
            </form>
            <div className={cn(styles.linkWrapper)}>
                <Link to="/login" className={cn(styles.link)}>
                    Если есть аккаунт? Войти
                </Link>
            </div>
        </div>
    );
};

export default RegisterPage;
