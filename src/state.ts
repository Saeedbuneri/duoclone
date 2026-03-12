export interface LanguageProgress {
    lessonsCompleted: number;
    xp: number;
    level: number;
    currentUnit: number;
    currentSection: number;
}

export interface UserState {
    id: string;
    name: string;
    email: string;
    isLoggedIn: boolean;
    streak: number;
    gems: number;
    hearts: number;
    language: string;
    languageFlag: string;
    dailyGoal: number;
    league: string;
    isPremium: boolean;
    items: {
        streakFreeze: number;
        doubleOrNothing: boolean;
        unlimitedHeartsExpiry: number | null;
        xpBoostExpiry: number | null;
    };
    progress: Record<string, LanguageProgress>;
}

export interface DBState {
    users: Record<string, UserState>;
    currentUserEmail: string | null;
}

const createDefaultUser = (email: string, name: string): UserState => ({
    id: email,
    name,
    email,
    isLoggedIn: false,
    streak: 3,
    gems: 500,
    hearts: 5,
    language: 'Spanish',
    languageFlag: '🇪🇸',
    dailyGoal: 10,
    league: 'Bronze',
    isPremium: false,
    items: {
        streakFreeze: 0,
        doubleOrNothing: false,
        unlimitedHeartsExpiry: null,
        xpBoostExpiry: null
    },
    progress: {}
});

const defaultLanguageProgress = (): LanguageProgress => ({
    lessonsCompleted: 0,
    xp: 0,
    level: 1,
    currentUnit: 1,
    currentSection: 1
});

export const AppState = {
    db: {
        users: {} as Record<string, UserState>,
        currentUserEmail: null as string | null
    } as DBState,

    get user(): UserState {
        if (!this.db.currentUserEmail || !this.db.users[this.db.currentUserEmail]) {
            return createDefaultUser('guest@example.com', 'Guest');
        }
        return this.db.users[this.db.currentUserEmail];
    },

    get activeProgress(): LanguageProgress {
        const u = this.user;
        if (!u.progress[u.language]) {
            u.progress[u.language] = defaultLanguageProgress();
            this.save();
        }
        return u.progress[u.language];
    },

    init() {
        const saved = localStorage.getItem('duolingo_db_v2');
        if (saved) {
            try {
                this.db = JSON.parse(saved);
            } catch {
                this.reset();
            }
        }
    },

    save() {
        localStorage.setItem('duolingo_db_v2', JSON.stringify(this.db));
    },

    update(partial: Partial<UserState>) {
        if (!this.db.currentUserEmail) return;
        Object.assign(this.user, partial);
        this.save();
    },

    updateProgress(partial: Partial<LanguageProgress>) {
        if (!this.db.currentUserEmail) return;
        Object.assign(this.activeProgress, partial);
        this.save();
    },

    reset() {
        this.db = {
            users: {},
            currentUserEmail: null
        };
        localStorage.removeItem('duolingo_db_v2');
    },

    login(name: string, email: string) {
        if (!this.db.users[email]) {
            this.db.users[email] = createDefaultUser(email, name);
        }
        this.db.currentUserEmail = email;
        this.user.isLoggedIn = true;
        this.save();
    },

    logout() {
        if (this.db.currentUserEmail && this.db.users[this.db.currentUserEmail]) {
            this.user.isLoggedIn = false;
        }
        this.db.currentUserEmail = null;
        this.save();
    }
};
