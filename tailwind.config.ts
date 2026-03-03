import type { Config } from 'tailwindcss';

const config: Config = {
    content: [
        './pages/**/*.{js,ts,jsx,tsx,mdx}',
        './components/**/*.{js,ts,jsx,tsx,mdx}',
        './app/**/*.{js,ts,jsx,tsx,mdx}',
        './src/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        fontFamily: {
            sans: ['ui-sans-serif', 'system-ui'],
            serif: ['ui-serif', 'Georgia'],
            mono: ['ui-monospace', 'SFMono-Regular'],
            display: ['Oswald'],
            body: ['"Open Sans"'],
            'SF-Pro-Rounded': ['"SF-Pro-Rounded-regular"'],
        },
        extend: {
            transitionProperty: {
                multiple: 'width , height , backgroundColor , opacity',
            },
            gridTemplateColumns: {
                custom: '3.11% 5.33% 33.74% 34.63% 13.32% 8.88%',
            },
            backgroundImage: {
                'gradient-to-b-opacity':
                    'linear-gradient(to bottom, rgba(255,255,255,0.7), rgba(255,255,255,0))',
            },
            keyframes: {
                shake: {
                    '0%, 100%': { transform: 'translateX(0)' },
                    '10%, 30%, 50%, 70%, 90%': { transform: 'translateX(-5px)' },
                    '20%, 40%, 60%, 80%': { transform: 'translateX(5px)' },
                },
                toastEnter: {
                    '0%': {
                        opacity: '0',
                        transform: 'translateX(48px) scale(0.92)',
                        filter: 'blur(6px)',
                    },
                    '60%': {
                        opacity: '1',
                        transform: 'translateX(-6px) scale(1.02)',
                        filter: 'blur(0)',
                    },
                    '100%': {
                        opacity: '1',
                        transform: 'translateX(0) scale(1)',
                        filter: 'blur(0)',
                    },
                },
                toastExit: {
                    '0%': {
                        opacity: '1',
                        transform: 'translateX(0) scale(1)',
                        filter: 'blur(0)',
                    },
                    '100%': {
                        opacity: '0',
                        transform: 'translateX(40px) scale(0.9)',
                        filter: 'blur(4px)',
                    },
                },
            },
            animation: {
                shake: 'shake 0.7s ease-in-out',
                'toast-enter': 'toastEnter 0.45s cubic-bezier(0.22, 1, 0.36, 1) forwards',
                'toast-exit': 'toastExit 0.3s ease forwards',
            },
        },
    },
    plugins: [],
};

export default config;
