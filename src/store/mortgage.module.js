import { mortgageService } from "../services/mortgage.service";
import router from '../router'
import canadaCities from "../shared/citiesDropdown";

export const mortgage = {
    namespaced: true,
    state: {
        all: {},
        editMortgage: {
            location_details: {
                budget:{
                }
            }
        },
        submitted: false,
        createMortgage: {
        },
        canadaCities: canadaCities 
    },
    actions: {
        getAll({ commit, rootState }) {
            commit('GET_ALL_REQUEST');
            mortgageService.getAll({action : rootState.authentication.user.role})
            .then(
                mortgages => commit('GET_ALL_SUCCESS', mortgages),
                error => commit('GET_ALL_FAILURE', error)
            );
        },
        updateMortgage({ commit,state, dispatch }, mortgage) {
            return mortgageService.updateMortgage(mortgage.id, mortgage)
            .then(
                success => {
                    commit('UPDATE_SUBMITTED', false);
                    dispatch("getAll")
                },
                error => console.log('errror', error)
            );
        },
        saveMortgage({ commit,state, dispatch }, mortgage) {
            mortgageService.saveMortgage(mortgage)
            .then(
                mortgage => {
                    console.log(mortgage)
                    commit('RESET_MORTGAGE');
                    commit('UPDATE_SUBMITTED', false);
                    router.push('/mortgage');
                },
                error => console.log('errror', error)
            );
        },
        setEditMortgage({ commit }, mortgage) {
            commit('SET_EDIT_MORTGAGE', mortgage)
        },
        updateMortgageData ({ commit }, { prop, value }) {
            commit('UPDATE_MORTGAGE_DATA', {prop, value });
        },
        updateEditMortgageData({commit}, { prop, value }) {
            commit('UPDATE_EDIT_MORTGAGE_DATA', {prop, value });
        },
        mortgageSubmitted({ commit }, flag) {
            commit('UPDATE_SUBMITTED', flag);
        },
        
        resetMortgage({ commit }) {
            commit('RESET_MORTGAGE');
        }
    },
    mutations: {
        GET_ALL_REQUEST(state) {
            state.all = { loading: true, items: []  };
        },
        GET_ALL_SUCCESS(state, mortgages) {
            state.submitted = false;
            state.all = { items: mortgages.result.data };
        },
        GET_ALL_FAILURE(state, error) {
            state.all = { error };
        },
        SET_EDIT_MORTGAGE(state, mortgage) {
            state.editMortgage = mortgage;
        },
        UPDATE_MORTGAGE_DATA(state, { prop, value }) {
            const newEdited = { ...state.createMortgage }
            newEdited[prop] = value
            state.createMortgage = newEdited
        },
        UPDATE_EDIT_MORTGAGE_DATA(state, { prop, value }) {
            const newEdited = { ...state.editMortgage }
            if(prop === "min" || prop === "max") {
                newEdited.location_details.budget[prop] = value;
                state.editMortgage = newEdited
            }
            newEdited[prop] = value
            state.editMortgage = newEdited
        },
        UPDATE_SUBMITTED(state, isSubmitted) {
            state.submitted = isSubmitted
        },
        RESET_MORTGAGE(state) {
            state.createMortgage = [];
            state.submitted = false;
        }
    },
    getters: {
        validationErrors: state => {
          let errors = {};
    
          if (state.submitted) {
            if (!state.editMortgage.name) {
              errors['name'] = 'Name Required'
            }
    
            if (!state.editMortgage.type) {
              errors['type'] = 'Type Required'
            }
            if (!state.editMortgage.preferred_location) {
                errors['preferred_location'] = 'Preferred Location Required'
            }else if(!(state.canadaCities.some(el => el.value.toLowerCase() === state.editMortgage.preferred_location.toLowerCase()))) {
                errors['preferred_location'] = 'Prefered Location is Invalid'
            } 
            if(state.editMortgage.location_details) {
                if(!state.editMortgage.location_details.budget) {
                    errors['budget'] = 'Budget is Required'
                }
                if (!state.editMortgage.location_details.budget.min) {
                    errors['budgetMin'] = 'Minimum Budget Required'
                   
                }
                if (!state.editMortgage.location_details.budget.max) {
                    errors['budgetMax'] = 'Maximum Budget Required'
                    
                }
                if(+state.editMortgage.location_details.budget.min != null && +state.editMortgage.location_details.budget.min != null) {
                    if(+state.editMortgage.location_details.budget.min < 1 ||  +state.editMortgage.location_details.budget.max < 1) {
                   
                        errors['budget'] = "Budget is Invalid"
                    }
                }
                if(+state.editMortgage.location_details.budget.min  > +state.editMortgage.location_details.budget.max) {
                    errors['budget'] = 'Minimum Budget is greater than Maximum'
                   
                }
                if (!state.editMortgage.status) {
                    errors['status'] = 'Status is Required'
                }
                
            } else {
                errors['budget'] = 'Budget is Required'
            }
            if (!state.editMortgage.status) {
                errors['status'] = 'Status is Required'
            }
            if (!state.editMortgage.comment) {
                errors['comment'] = 'Comment is Required'
            }
          }
          return errors;
        },
        valdationOnSave: state => {
            let errors = {};
            if (state.submitted) {
                if (!state.createMortgage.name) {
                    errors['name'] = 'Name Required'
                }
                if (!state.createMortgage.address) {
                    errors['address'] = 'Address Required'
                }
                if (!state.createMortgage.city) {
                    errors['city'] = 'City Required'
                }else if(!(state.canadaCities.some(el => el.value.toLowerCase() === state.createMortgage.city.toLowerCase()))) {
                    errors['city'] = 'City is Invalid'
                }
                if (!state.createMortgage.state) {
                    errors['state'] = 'State Required'
                }else if(!(state.canadaCities.some(el => el.value.toLowerCase() === state.createMortgage.state.toLowerCase()))) {
                    errors['state'] = 'State is Invalid'
                }
                if (!state.createMortgage.zip) {
                    errors['zip'] = 'Zip Required'
                } else if(state.createMortgage.zip.length > 10 ) {
                    errors['zip'] = 'Zip Should be under 10 digits'
                } else if (state.createMortgage.zip.includes("-")) {
                    errors['zip'] = 'Invalid Zip code'
                }
                if (!state.createMortgage.phone) {
                    errors['phone'] = 'Phone Required'
                }
                else if (state.createMortgage.phone && state.createMortgage.phone.length > 10) {
                    errors['phone'] = 'phone Should be 10 digits'
                }
                if (!state.createMortgage.email) {
                    errors['email'] = 'Email Required'
                } else if(!(/\S+@\S+\.\S+/).test(state.createMortgage.email)) {
                    errors['email'] = 'Email is Invalid'
                }
                if (!state.createMortgage.address2) {
                    errors['address2'] = 'Address Line 2 Required'
                }
                if (!state.createMortgage.type) {
                    errors['type'] = 'Type Required'
                }
                if (!state.createMortgage.firstTimeBuyer) {
                    errors['firstTimeBuyer'] = 'First Time Home Buyer Required'
                }
                if (!state.createMortgage.preferedLocation) {
                    errors['preferedLocation'] = 'Prefered Location Required'
                } else if(!(state.canadaCities.some(el => el.value.toLowerCase() === state.createMortgage.preferedLocation.toLowerCase()))) {
                    errors['preferedLocation'] = 'Prefered Location is Invalid'
                }
                if (!state.createMortgage.noOfHousehold) {
                    errors['noOfHousehold'] = 'Number of people in household required'
                }
                if (!state.createMortgage.professionSelf) {
                    errors['professionSelf'] = 'Profession - Self Required'
                }
                if (!state.createMortgage.professionSpouse) {
                    errors['professionSpouse'] = 'Profession - Spouse Required'
                }
                if (!state.createMortgage.incomeSelf) {
                    errors['incomeSelf'] = 'Income - Self Required'
                }
                if (!state.createMortgage.incomeSpouse) {
                    errors['incomeSpouse'] = 'Income - Spouse Required'
                }
                if (!state.createMortgage.otherMortgage) {
                    errors['otherMortgage'] = 'Any Other Mortgages Required'
                }
                // if (!state.createMortgage.otherMortgage) {
                //     errors['mortgageDetails'] = true
                // }
                if(state.createMortgage.otherMortgage
                    && state.createMortgage.otherMortgage === 'yes' 
                    && !state.createMortgage.mortgageDetails) {
                        errors['mortgageDetails'] = 'Mortgage Details Required'
                }
                if (!state.createMortgage.otherExpenses) {
                    errors['otherExpenses'] = 'Other Expenses Required'
                }
                if (!state.createMortgage.interestRate) {
                    errors['interestRate'] = 'Interest Rate Required'
                }
                if (!state.createMortgage.downPayment) {
                    errors['downPayment'] = 'Down Payment Required'
                }
                if (!state.createMortgage.comment) {
                    errors['comment'] = 'Comment Required'
                }
            }
            return errors;
        }
    }
}
