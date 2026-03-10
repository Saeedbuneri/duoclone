declare global {
    interface Window {
        __router: import('./router').Router;
    }
}

export { };
