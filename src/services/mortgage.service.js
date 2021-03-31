import { handleResponse, requestGet, requestPost, requestPut, requestDelete, apiEndpoint } from '../helpers'
import queryString from 'query-string';
import data from '../data/columns';
import statusList from '../shared/statusDropdown';

export const mortgageService = {
    getAll,
    updateMortgage,
    saveMortgage,
};

function operationUrl(url) {
    return apiEndpoint + url;
}

function getAll(filter, includeInactive = false) {
    const url = operationUrl(`/clients`);
    return requestGet(url, filter)
}

function updateMortgage(id, client) {
    const url = operationUrl(`/clients/${id}`);
    return requestPut(url, client)
      .then((client) => {
        return client;
    })
}

function saveMortgage(client) {
    const url = operationUrl(`/clients`);
    return requestPost(url, client)
      .then((client) => {
        return client;
    })
}
