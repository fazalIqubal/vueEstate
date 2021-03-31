// import { router } from './router'

export function logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('user');
}

// Main API Response handler
//
// Resolves status code and redirects or displays errors
export function handleResponse(response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        if (!response.ok) {
            if (response.status === 401) {
                // auto logout if 401 response returned from api
                logout();
                location.reload(true);
            }
            if (response.status === 403) {
                // Forbidden
                
            }
            if (response.status === 409 && data.changePassword) {
                // auto logout if 409 response with change-password user data returned from api
                logout();
                // router.push({ name: 'change-password', params: { id: data.userID } });
            }
            if (response.status === 400 || response.status === 500) {
                // show error message
                
            }

            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }
        return data;
    });
}

