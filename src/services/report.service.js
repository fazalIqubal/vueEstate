import { handleResponse, requestGet, requestPost, requestPut, requestDelete, apiEndpoint } from '../helpers'
import queryString from 'query-string';

export const reportService = {
    getReports,

};

function operationUrl(url) {
    return apiEndpoint + url;
}

function getReports(filter, includeInactive = false) {
    return new Promise((resolve, reject) => {
        return resolve
    });
    // const url = operationUrl(`/clients`);
    // return requestGet(url, filter)
}
