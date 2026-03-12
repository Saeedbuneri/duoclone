export type PageRenderer = () => string;
export type PageInit = () => void;

interface Route {
    path: string;
    render: () => { html: string; init?: () => void };
}

export class Router {
    private routes: Route[] = [];
    private container: string;

    constructor(container: string) {
        this.container = container;
        window.addEventListener('popstate', () => this.resolve());
    }

    addRoute(path: string, page: () => { html: string; init?: () => void }) {
        this.routes.push({ path, render: page });
    }

    navigate(path: string) {
        if (window.location.pathname === path) return;

        const isLongLoad = path === '/lesson';
        const delayMs = isLongLoad ? 2000 : 300;

        let overlay = document.querySelector('.page-transition-overlay');
        if (!overlay) {
            overlay = document.createElement('div');
            overlay.className = 'page-transition-overlay';
            document.body.appendChild(overlay);
        }

        if (isLongLoad) {
            overlay.classList.add('lesson-loading');
            overlay.innerHTML = `
                <div class="loading-screen-content">
                    <img src="/assets/animations/park_ranger.gif" style="width: 150px; margin-bottom: 30px; border-radius: 20px;" alt="Loading..." />
                    <div class="loading-title">Getting your lesson ready...</div>
                    <div class="loading-progress-bar">
                        <div class="loading-progress-fill"></div>
                    </div>
                    <div class="loading-tip" style="margin-top: 20px; color: #777; font-weight: 600; font-size: 15px; opacity: 0.8;">TIP: Consistency is key!</div>
                </div>
            `;
        } else {
            overlay.classList.remove('lesson-loading');
            overlay.innerHTML = ``;
        }

        // Force reflow and show
        overlay.getBoundingClientRect();
        overlay.classList.add('visible');

        setTimeout(() => {
            window.history.pushState(null, '', path);
            this.resolve();
            overlay!.classList.remove('visible');
        }, delayMs);
    }

    resolve() {
        const path = window.location.pathname || '/';
        const route = this.routes.find(r => r.path === path) || this.routes[0];
        const el = document.querySelector(this.container);
        if (el && route) {
            const page = route.render();
            el.innerHTML = page.html;
            if (page.init) {
                setTimeout(() => page.init!(), 0);
            }
        }
    }

    start() {
        this.resolve();
    }
}

export function navigate(path: string) {
    (window as any).__router.navigate(path);
}
