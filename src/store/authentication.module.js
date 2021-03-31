import { userService } from '../services';
import router from '../router'

const user = JSON.parse(localStorage.getItem('user'));
const initialState = user
    ? { status: { loggedIn: true }, user: user.user }
    : { status: {}, user: null };



export const authentication = {
    namespaced: true,
    state: initialState,
    actions: {
        login({ dispatch, commit }, { email, password }) {
            commit('loginRequest', { email });
            userService.login(email, password)
                .then(
                    user => {
                        commit('loginSuccess', user);
                        if (user.user && user.user.role === 'RealEstateAgent') {
                            router.push('/clients');
                        } else if (user.user && user.user.role === 'MortgageAgent') {
                            router.push('/mortgage');
                        }
                        else {
                            router.push('/');
                        }
                    },
                    error => {
                        commit('loginFailure', error);
                    }
                );
        },
        logout({ commit }) {
            userService.logout();
            commit('logout');
            router.push('/login');
        },
        signUpPage({ commit }){
            commit('logout');
            router.push('/signUp');
        },
        
        resetPassword({ dispatch, commit }, email) {
            commit('resetRequest', email);

            userService.resetPassword(email)
                .then(
                    id => {
                        commit('resetSuccess', id);
                    },
                    error => {
                        commit('resetFailure', error);
                    }
                );
        },
        setUser({ commit, dispatch }, user) {
            if (!user) {
                user = JSON.parse(localStorage.getItem('user'));
            }
            else if (user.token) {
                localStorage.setItem('user', JSON.stringify(user))
            }

            commit('setUser', user);
        },
        signUp({ dispatch, commit }, { email, password, first_name, last_name, roleType }) {
            userService.signUp(first_name, last_name, email, password, roleType)
            .then(
                user => {
                    commit('logout');
                    router.push('/login');
                },
                error => {
                    commit('loginFailure', error);
                }
            );
        }
    },
    mutations: {
        loginRequest(state, user) {
            state.status = { loggingIn: true };
            state.user = user;
        },
        loginSuccess(state, user) {
            state.status = { loggedIn: true };
            state.user = user.user;
        },
        loginFailure(state, error) {
            state.status = {
                message: error.error.message
            };
            state.user = null;
        },
        logout(state) {
            state.status = {};
            state.user = {};
        },
        resetRequest(state, email) {
            state.status = { resetting: true };
            state.user.email = email;
        },
        resetSuccess(state, id) {
            state.status = { reset: true };
            state.user.userID = id;
        },
        resetFailure(state, error) {
            state.status = {};
            state.user = {};
        },
        setUser(state, user) {
            if (user) {
                state.user = { ...user };
            }
            else {
                user = JSON.parse(localStorage.getItem('user'));
                state.user = { ...user };
            }
        }
    },
    getters: {
        isAdmin: state => {
            if (state.user && state.user.role) {
                return state.user.role === 'Admin' || state.user.role === 'Owner' || state.user.role === 'Super Admin';
            }
            return false;
        },
        isRealEstateAgent: state => {
            if (state.user && state.user.role) {
                return state.user.role === 'RealEstateAgent';
            }
            return false;
        },
        isMortgageAgent: state => {
            if (state.user && state.user.role) {
                return state.user.role === 'MortgageAgent';
            }
            return false;
        }
    }
}
