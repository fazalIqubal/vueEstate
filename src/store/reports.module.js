import { reportService } from '../services';
import router from '../router'

export const reports = {
    namespaced: true,
    state: {
        reportFilter: {},
        submitted: false,
    },
    actions: {
        updateReportData({ commit }, { prop, value }) {
            commit('UPDATE_REPORT_DATA', {prop, value });
        },
        reportSubmitted({ commit }, flag) {
            commit('UPDATE_SUBMITTED', flag);
        },
        getReport({ commit, rootState  }) {
            commit('GET_REPORT');
            reportsService.getReport({action : rootState.authentication.user.role})
            .then(
                reports => commit('GET_ALL_SUCCESS', reports),
                error => commit('GET_ALL_FAILURE', error)
            );
        },
        resetReport({ commit }) {
            commit('RESET_REPORT');
        },
    },
    mutations: {
        UPDATE_REPORT_DATA(state, { prop, value }) {
            const newEdited = { ...state.reportFilter }
            newEdited[prop] = value
            state.reportFilter = newEdited
        },
        UPDATE_SUBMITTED(state, isSubmitted) {
            state.submitted = isSubmitted
        },
        RESET_REPORT(state) {
            state.reportFilter = { };
            state.submitted = false;
        }
    },
    getters: {
        validationErrors: state => {
            let errors = {};
        
            if (state.submitted) {
                if (!state.reportFilter.type) {
                    errors['type'] = true
                }
                if (!state.reportFilter.startDate) {
                    errors['startDate'] = true
                }
                if (!state.reportFilter.endDate) {
                    errors['endDate'] = true
                }
            }
            return errors;
        },
    }
}
