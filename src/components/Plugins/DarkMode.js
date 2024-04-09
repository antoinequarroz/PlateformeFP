export default {
    install(app) {
        const storedTheme = localStorage.getItem('theme') || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
        app.config.globalProperties.$setTheme = (theme) => {
            document.documentElement.setAttribute('data-bs-theme', theme);
            localStorage.setItem('theme', theme);
        };
        app.config.globalProperties.$setTheme(storedTheme);
    }
};
