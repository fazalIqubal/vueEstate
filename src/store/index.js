import Vue from 'vue';
import Vuex from 'vuex';

import { clients } from './clients.module';
import { mortgage } from './mortgage.module';
import { authentication } from './authentication.module';
import { reports } from './reports.module';
import { axiosInterceptors } from '../helpers/axios-interceptors';
Vue.use(Vuex);

axiosInterceptors();
export const store = new Vuex.Store({
    modules: {
        clients,
        mortgage,
        authentication,
        reports,
    }
});
