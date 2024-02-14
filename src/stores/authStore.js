// src/stores/authStore.js
import { defineStore } from 'pinia';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

export const useAuthStore = defineStore('auth', {
    state: () => ({
        user: null,
    }),
    actions: {
        listenToAuthChanges() {
            const auth = getAuth();
            onAuthStateChanged(auth, (user) => {
                if (user) {
                    // L'utilisateur est connecté
                    this.user = user;
                } else {
                    // L'utilisateur est déconnecté
                    this.user = null;
                }
            });
        },
        login(user) {
            this.user = user;
        },
        logout() {
            this.user = null;
        },
    },
});
