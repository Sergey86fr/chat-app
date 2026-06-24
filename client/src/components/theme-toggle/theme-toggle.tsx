import {useEffect, useState} from "react";
import {Moon, Sun} from "lucide-react";
import cn from "classnames";
import styles from "./theme-toggle.module.css"


type Theme = 'dark' | 'light';

const ThemeToggle = () => {
    const[theme, setTheme] = useState<Theme>(() => {
        const savedTheme = localStorage.getItem("theme");
        if (savedTheme === "dark" || savedTheme === "light") {
            return  savedTheme as Theme;
        }
        return  window.matchMedia("(prefers-color-scheme: dark)").matches ? 'dark' : 'light';
    })

    useEffect(() => {
        const html = document.documentElement;
        html.classList.remove( "dark", "light");

            html.classList.add( theme);
            localStorage.setItem( "theme", theme );
    }, [theme]);

    return (
        <button
            className={cn(styles.toggleThemeButton)}
        onClick={() => {setTheme(theme==="dark" ? "light" : "dark")}}>
            {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
        </button>
    );
};

export default ThemeToggle;
