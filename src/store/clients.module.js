import { clientService } from '../services';
import router from '../router'
import bedroomCheckBox from "../shared/bedroomCheckbox";
import bathroomCheckbox from "../shared/bathroomCheckbox";
import canadaCities from "../shared/citiesDropdown";

export const clients = {
    namespaced: true,
    state: {
        all: {},
        editClient: {
            location_details: {
                budget:{
                },
                bedroomSelected: [],
                bathroomSelected: [],
            }
        },
        submitted: false,
        createClient: {
            bedroomSelected: [],
            bathroomSelected: []
        },
        bedroomSelected: bedroomCheckBox,
        bathroomSelected: bathroomCheckbox,
        canadaCities: canadaCities
    },
    actions: {
        getAll({ commit, rootState  }) {
            commit('GET_ALL_REQUEST');
            clientService.getAll({action : rootState.authentication.user.role})
            .then(
                clients => commit('GET_ALL_SUCCESS', clients),
                error => commit('GET_ALL_FAILURE', error)
            );
        },
        setEditClient({ commit }, client) {
            commit('SET_EDIT_CLIENT', client)
        },
        updateEditClient ({ commit }, { prop, value }) {
            commit('UPDATE_EDIT_CLIENT', {prop, value });
        },
        updateClient({ commit,state, dispatch }, client) {
            return clientService.updateClient(client.id, client)
            .then(
                client => {
                    commit('UPDATE_SUBMITTED', false);
                    dispatch("getAll")
                },
                error => console.log('errror', error)
            );
        },
        updateClientData({ commit }, { prop, value }) {
            commit('UPDATE_CLIENT_DATA', {prop, value });
        },
        clientSubmitted({ commit }, flag) {
            commit('UPDATE_SUBMITTED', flag);
        },
        saveClient({ commit,state, dispatch }, client) {
            clientService.saveClient(client)
            .then(
                client => {
                    commit('RESET_CLIENT');
                    router.push('/clients');
                },
                error => console.log('errror', error)
            );
        },
        resetClient({ commit }) {
            commit('RESET_CLIENT');
        },
        bedroomUpdate({commit}, data) {
            commit('BEDROOM_UPDATE', data);
        },
        bathroomUpdate({commit}, data) {
            commit('BATHROOM_UPDATE', data);
        }
    },
    mutations: {
        GET_ALL_REQUEST(state) {
            state.all = { loading: true, items: [] };
        },
        GET_ALL_SUCCESS(state, clients) {
            state.all = { items: clients.result.data };
        },
        GET_ALL_FAILURE(state, error) {
            state.all = { error };
        },
        SET_EDIT_CLIENT(state, client) {
            if (!client) {
                state.editClient = { ...state.editClient }
            } else {
                state.editClient = { ...client }
            }
        },
        UPDATE_EDIT_CLIENT(state, { prop, value }) {
            const newEdited = { ...state.editClient }
            if(prop === "min" || prop === "max") {
                newEdited.location_details.budget[prop] = value;
                state.editClient = newEdited
            }
            newEdited[prop] = value
            state.editClient = newEdited
        },
        UPDATE_SUBMITTED(state, isSubmitted) {
            state.submitted = isSubmitted
        },
        UPDATE_CLIENT_DATA(state, { prop, value }) {
            const newEdited = { ...state.createClient }
            newEdited[prop] = value
            state.createClient = newEdited
        },
        RESET_CLIENT(state) {
            state.createClient = {
                bedroomSelected: [],
                bathroomSelected: []
            };
            state.bedroomSelected.forEach(element => {
                element.checked = false;
            });
            state.bathroomSelected.forEach(element => {
                element.checked = false;
            });
            state.submitted = false;
        },
        BEDROOM_UPDATE(state, bed) {
            let temp = {};
            temp = state.bedroomSelected.find((obj) => {
                return obj.value === bed.target.innerText;
            });
            let index = state.bedroomSelected.findIndex(
                (x) => x.value === temp.value
            );
            state.bedroomSelected.splice(index, 1, {
                value: temp.value,
                checked: !temp.checked,
            });
            state.createClient.bedroomSelected.push(temp.value)
        },
        BATHROOM_UPDATE(state, bath) {
            let temp = {};
            temp = state.bathroomSelected.find((obj) => {
                return obj.value === bath.target.innerText;
            });
            let index = state.bathroomSelected.findIndex(
                (x) => x.value === temp.value
            );
            state.bathroomSelected.splice(index, 1, {
                value: temp.value,
                checked: !temp.checked,
            });
            state.createClient.bathroomSelected.push(temp.value)
        },

    },
    getters: {
        validationErrors: state => {
          let errors = {};
    
          if (state.submitted) {
            if (!state.editClient.name) {
                errors['name'] = 'Name Required'
            }
    
            if (!state.editClient.type) {
                errors['type'] = 'Type Required'
              }
              if (!state.editClient.location_details.preferred_location) {
                  errors['preferred_location'] = 'Preferred Location Required'
              }else if(!(state.canadaCities.some(el => el.value.toLowerCase() === state.editClient.location_details.preferred_location.toLowerCase()))) {
                  errors['preferred_location'] = 'Prefered Location is Invalid'
              } 
              if(state.editClient.location_details) {
                if(!state.editClient.location_details.budget) {
                    errors['budget'] = 'Budget is Required'
                }
                if (!state.editClient.location_details.budget.min) {
                    errors['budgetMin'] = 'Minimum Budget Required'
                    
                }
                if (!state.editClient.location_details.budget.max) {
                    errors['budgetMax'] = 'Maximum Budget Required'
                    
                }
                if(state.editClient.location_details.budget.min != null && state.editClient.location_details.budget.min != null) {
                      if(+state.editClient.location_details.budget.min < 1 ||  +state.editClient.location_details.budget.max < 1) {
                     
                          errors['budget'] = "Budget is Invalid"
                      }
                  }
                  if(+(state.editClient.location_details.budget.min)  > +(state.editClient.location_details.budget.max)) {
                      errors['budget'] = 'Minimum Budget is greater than Maximum'
                     
                  }
                  if (!state.editClient.status) {
                      errors['status'] = 'Status is Required'
                  }
                  
              } else {
                  errors['budget'] = 'Budget is Required'
              }
              if (!state.editClient.status) {
                  errors['status'] = 'Status is Required'
              }
              if (!state.editClient.comment) {
                  errors['comment'] = 'Comment is Required'
              }
          }
          return errors;
        },
        valdationOnSave: state => {
            let errors = {};
            if (state.submitted) {
                if (!state.createClient.name) {
                    errors['name'] = 'Name Required'
                }
                if (!state.createClient.address) {
                    errors['address'] = 'Address Required'
                }
                if (!state.createClient.city) {
                    errors['city'] = 'City Required'
                }else if(!(state.canadaCities.some(el => el.value.toLowerCase() === state.createClient.city.toLowerCase()))) {
                    errors['city'] = 'City is Invalid'
                }
                if (!state.createClient.state) {
                    errors['state'] = 'state Required'
                }else if(!(state.canadaCities.some(el => el.value.toLowerCase() === state.createClient.state.toLowerCase()))) {
                    errors['state'] = 'state is Invalid'
                }
                if (!state.createClient.zip) {
                    errors['zip'] = 'Zip Required'
                } else if(state.createClient.zip.length > 10 ) {
                    errors['zip'] = 'Zip Should be under 10 digits'
                } else if (state.createClient.zip.includes("-")) {
                    errors['zip'] = 'Invalid Zip code'
                }
                if (!state.createClient.preferedLocation) {
                    errors['preferedLocation'] = 'Prefered Location Required'
                } else if(!(state.canadaCities.some(el => el.value.toLowerCase() === state.createClient.preferedLocation.toLowerCase()))) {
                    errors['preferedLocation'] = 'Prefered Location is Invalid'
                }
                if (!state.createClient.type) {
                    errors['type'] = 'Type Required'
                }
                if(!state.createClient.budgetMin) {
                    errors['budgetMin'] = "Minimum budget Required"
                }
                if(!state.createClient.budgetMax) {
                    errors['budgetMax'] = "Maximum budget Required"
                }
                if(+state.createClient.budgetMin < 1 || +state.createClient.budgetMax < 1) {
                    errors['budgetMax'] = "Budget is Invalid"
                    errors['budgetMin'] = "Budget is Invalid"
                }
                if(+state.createClient.budgetMin > +state.createClient.budgetMax) {
                    errors['budget'] = "Minimum budget is greater than Maximum"
                }
                if (!state.createClient.budgetMin || !state.createClient.budgetMax ) {
                    errors['budget'] = "Budget is Required"
                }
                if (state.createClient.bedroomSelected.length == 0) {
                    errors['bedroom'] = 'Bedroom preference  Required'
                }
                if (state.createClient.bathroomSelected.length == 0) {
                    errors['bathroom'] = 'Bathroom preference  Required'
                }
                if (!state.createClient.schoolDist) {
                    errors['schoolDist'] = "School Dist Required"
                } else if(!(state.canadaCities.some(el => el.value.toLowerCase() === state.createClient.schoolDist.toLowerCase()))) {
                    errors['schoolDist'] = 'school District is Invalid'
                }
                if (!state.createClient.basement) {
                    errors['basement'] = 'Basement preference Required'
                }
                if (!state.createClient.backyard) {
                    errors['backyard'] = 'Backyard preference  Required'
                }
                if (!state.createClient.mortgageApproved) {
                    errors['mortgageApproved'] = "Mortgage Status Required"
                }
                if (!state.createClient.comment) {
                    errors['comment'] = "Comment Required"
                }
            }
            return errors;
        }
    }
}
