<template>
  <div class="mortgage-formlayout">
    <div class="form-heading-txt">Enter New Client</div>
    <div class="form-sub-heading-txt">Client details</div>
    <form class="ui form">
      <a-row class="row-margin-container">
        <a-col :sm="{ span: 15 }"
                :lg="{ span: 24 }"  class="input-left-container">
      
      <div class="input-box-padding">
        <label :class="['required', errorClass('name')]">Name</label>
        <input
          class="input-box"
          :class="['required', errorClass('name')]"
          type="text"
          maxlength="500"
          :value="createMortgage.name"
          @input="updateMortgage($event, 'name')"
        />
          <div v-show="submitted && hasErrors" class="invalid-feedback">
            {{valdationOnSave['name']}}
          </div>
      </div>
      </a-col></a-row>
      <a-row class="row-margin-container">
        <a-col :sm="{ span: 15 }"
                :lg="{ span: 12 }"  class="input-left-container">
          <!-- Address -->
          <div>
            <label :class="['required', errorClass('address')]">Address</label>
            <textarea
              class="input-box"
              :class="['required', errorClass('address')]"
              :value="createMortgage.address"
              @input="updateMortgage($event, 'address')"
            >
            </textarea>
            <div v-show="submitted && hasErrors" class="invalid-feedback">
              {{valdationOnSave['address']}}
            </div>
          </div>
        </a-col>
        <a-col :sm="{ span: 15 }"
                :lg="{ span: 12 }" class="input-right-container">
          <!-- Address1 -->
          <div>
            <label :class="['required', errorClass('address2')]"
              >Address Line 2</label
            >
            <textarea
              class="input-box"
              :class="['required', errorClass('address2')]"
              :value="createMortgage.address2"
              @input="updateMortgage($event, 'address2')"
            >
            </textarea>
            <div v-show="submitted && hasErrors" class="invalid-feedback">
              {{valdationOnSave['address2']}}
            </div>
          </div>
        </a-col>
      </a-row>

      <a-row class="row-margin-container">
        <a-col :sm="{ span: 15 }"
                :lg="{ span: 8 }" class="input-left-container city-input">
          <!-- city -->
          <div>
            <label :class="['required', errorClass('city')]">City</label>
            <a-auto-complete
              :class="[errorClass('city')]"
              v-model="createMortgage.city"
              :data-source="citiesDropdown"
              @select="updateMortgage($event, 'city')"
              @search="onSearch"
              @change="onChange"
            />
            <div v-show="submitted && hasErrors" class="invalid-feedback">
              {{valdationOnSave['city']}}
            </div>
          </div>
        </a-col>
        <a-col :sm="{ span: 15 }"
                :lg="{ span: 8 }" class="input-left-container">
          <!-- State Dropdown -->
          <div>
            <label :class="['required', errorClass('state')]">State</label>
            <a-auto-complete
              :class="[errorClass('state')]"
              v-model="createMortgage.state"
              :data-source="citiesDropdown"
              @select="updateMortgage($event, 'state')"
              @search="onSearch"
              @change="onChange"
            />
            <div v-show="submitted && hasErrors" class="invalid-feedback">
              {{valdationOnSave['state']}}
            </div>
          </div>
        </a-col>
        <a-col :sm="{ span: 15 }"
                :lg="{ span: 8 }" class="input-right-container">
          <!-- zip -->
          <div>
            <label :class="['required', errorClass('zip')]">Zip</label>
            <input
              class="input-box"
              :class="['required', errorClass('zip')]"
              type="number"
              :value="createMortgage.zip"
              @input="updateMortgage($event, 'zip')"
            />
            <div v-show="submitted && hasErrors" class="invalid-feedback">
              {{valdationOnSave['zip']}}
            </div>
          </div>
        </a-col>
      </a-row>

      <a-row class="row-margin-container">
        <a-col :sm="{ span: 15 }"
                :lg="{ span: 12 }" class="input-left-container">
          <!-- phone -->
          <div>
            <label :class="['required', errorClass('phone')]">Phone</label>
            <input
              class="input-box"
              :class="['required', errorClass('phone')]"
              type="number"
               min=0
              :value="createMortgage.phone"
              @input="updateMortgage($event, 'phone')"
            />
            <div v-show="submitted && hasErrors" class="invalid-feedback">
              {{valdationOnSave['phone']}}
            </div>
          </div>
        </a-col>
        <a-col :sm="{ span: 15 }"
                :lg="{ span: 12 }" class="input-right-container">
          <!-- email -->
          <div>
            <label :class="['required', errorClass('email')]">Email</label>
            <input
              class="input-box"
              :class="['required', errorClass('email')]"
              type="email"
              :value="createMortgage.email"
              @input="updateMortgage($event, 'email')"
            />
            <div v-show="submitted && hasErrors" class="invalid-feedback">
              {{valdationOnSave['email']}}
            </div>
          </div>
        </a-col>
      </a-row>
      <!-- type -->
      <a-row>
      <a-col :sm="{ span: 15 }"
             :lg="{ span: 24 }">
      <div class="type-input-box">
        <label :class="['required', errorClass('type')]">Type</label>
        <a-select
          class="input-dropdown"
          :class="[errorClass('type')]"
          v-model="createMortgage.type"
          @change="updateMortgage($event, 'type')"
        >
          <a-select-option
            v-for="type in typeDropdown"
            :key="type.value"
            :value="type.value"
          >
            {{ type.label }}
          </a-select-option>
        </a-select>
      </div>
      </a-col></a-row>
      <!--First Time Home Buyer-->
      <div class="laval-txt">
        <label :class="['required', errorClass('firstTimeBuyer')]"
          >First Time Home Buyer</label
        >
        <div v-show="submitted && hasErrors" class="invalid-feedback">
          {{valdationOnSave['firstTimeBuyer']}}
        </div>
      </div>
      <a-radio-group class="btn-radio" v-model="createMortgage.firstTimeBuyer" @change="onChange">
        <a-radio value="yes"> Yes </a-radio>
        <a-radio value="no"> No </a-radio>
      </a-radio-group>

      <!-- Mortgage Eligibility -->
      <div class="location-section">
        <div class="form-sub-heading-txt">Mortgage Eligibility</div>
        <a-row class="row-margin-container">
          <a-col :sm="{ span: 15 }"
                :lg="{ span: 12 }" class="input-left-container">
            <!-- prefered Location -->
            <div>
              <label :class="['required', errorClass('preferedLocation')]"
                >Prefered Location</label
              >
              <a-auto-complete
                :class="[errorClass('preferedLocation')]"
                v-model="createMortgage.preferedLocation"
                :data-source="citiesDropdown"
                @select="updateMortgage($event, 'preferredLocation')"
                @search="onSearch"
                @change="onChange"
              />
              <div v-show="submitted && hasErrors" class="invalid-feedback">
                {{valdationOnSave['preferedLocation']}}
              </div>
            </div>
          </a-col>
          <a-col :sm="{ span: 15 }"
                :lg="{ span: 12 }" class="input-right-container">
            <!-- down payment -->
            <div>
              <label :class="['required', errorClass('downPayment')]"
                >Down Payment</label
              >
              <input
                class="input-box"
                :class="['required', errorClass('downPayment')]"
                type="number"
                min=0
                :value="createMortgage.downPayment"
                @input="updateMortgage($event, 'downPayment')"
              />
               <div v-show="submitted && hasErrors" class="invalid-feedback">
                {{valdationOnSave['downPayment']}}
              </div>
            </div>
          </a-col>
        </a-row>
        <!-- Number of people in household -->
        <a-row>
        <a-col :sm="{ span: 15 }"
                :lg="{ span: 12 }" class="input-left-container">
        <div class="row-margin-container">
          <label :class="['required', errorClass('noOfHousehold')]"
            >Number of people in household</label
          >
          <input
            class="input-box"
            :class="['required', errorClass('noOfHousehold')]"
            type="number"
             min=0
            :value="createMortgage.noOfHousehold"
            @input="updateMortgage($event, 'noOfHousehold')"
          />
           <div v-show="submitted && hasErrors" class="invalid-feedback">
              {{valdationOnSave['noOfHousehold']}}
            </div>
        </div>
        </a-col>
        </a-row>

        <a-row class="row-margin-container">
          <a-col :sm="{ span: 15 }"
                :lg="{ span: 12 }" class="input-left-container">
            <!-- Profession - Self -->
            <div>
              <label :class="['required', errorClass('professionSelf')]"
                >Profession - Self</label
              >
              <input
                class="input-box"
                :class="['required', errorClass('professionSelf')]"
                type="text"
                :value="createMortgage.professionSelf"
                @input="updateMortgage($event, 'professionSelf')"
              />
              <div v-show="submitted && hasErrors" class="invalid-feedback">
                {{valdationOnSave['professionSelf']}}
              </div>
            </div>
          </a-col>
          <a-col :sm="{ span: 15 }"
                :lg="{ span: 12 }" class="input-right-container">
            <!-- Profession - Spouse -->
            <div>
              <label :class="['required', errorClass('professionSpouse')]"
                >Profession - Spouse</label
              >
              <input
                class="input-box"
                :class="['required', errorClass('professionSpouse')]"
                type="text"
                :value="createMortgage.professionSpouse"
                @input="updateMortgage($event, 'professionSpouse')"
              />
              <div v-show="submitted && hasErrors" class="invalid-feedback">
                {{valdationOnSave['professionSpouse']}}
              </div>
            </div>
          </a-col>
        </a-row>

        <a-row class="row-margin-container">
          <a-col :sm="{ span: 15 }"
                :lg="{ span: 12 }" class="input-left-container">
            <!--Income - Self-->
            <div>
              <label :class="['required', errorClass('incomeSelf')]"
                >Income - Self</label
              >
              <input
                class="input-box"
                :class="['required', errorClass('incomeSelf')]"
                type="number"
                min=0
                :value="createMortgage.incomeSelf"
                @input="updateMortgage($event, 'incomeSelf')"
              />
              <div v-show="submitted && hasErrors" class="invalid-feedback">
                {{valdationOnSave['incomeSelf']}}
              </div>
            </div>
          </a-col>
          <a-col :sm="{ span: 15 }"
                :lg="{ span: 12 }" class="input-right-container">
            <!--Income - Spouse-->
            <div>
              <label :class="['required', errorClass('incomeSpouse')]"
                >Income - Spouse</label
              >
              <input
                class="input-box"
                :class="['required', errorClass('incomeSpouse')]"
                type="number"
                min=0
                :value="createMortgage.incomeSpouse"
                @input="updateMortgage($event, 'incomeSpouse')"
              />
              <div v-show="submitted && hasErrors" class="invalid-feedback">
                {{valdationOnSave['incomeSpouse']}}
              </div>
            </div>
          </a-col>
        </a-row>

        <a-row class="row-margin-container">
          <a-col :sm="{ span: 15 }"
                :lg="{ span: 12 }" class="input-left-container">
            <!--Other Expenses-->
            <div>
              <label :class="['required', errorClass('otherExpenses')]"
                >Other Expenses</label
              >
              <input
                class="input-box"
                :class="['required', errorClass('otherExpenses')]"
                type="number"
                min=0
                :value="createMortgage.otherExpenses"
                @input="updateMortgage($event, 'otherExpenses')"
              />
              <div v-show="submitted && hasErrors" class="invalid-feedback">
                {{valdationOnSave['otherExpenses']}}
              </div>
            </div>
          </a-col>
          <a-col :sm="{ span: 15 }"
                :lg="{ span: 12 }" class="input-right-container">
            <!--Interest Rate-->
            <div>
              <label :class="['required', errorClass('interestRate')]"
                >Interest Rate</label
              >
              <input
                class="input-box"
                :class="['required', errorClass('interestRate')]"
                type="number"
                min=0
                :value="createMortgage.interestRate"
                @input="updateMortgage($event, 'interestRate')"
              />
              <div v-show="submitted && hasErrors" class="invalid-feedback">
                {{valdationOnSave['interestRate']}}
              </div>
            </div>
          </a-col>
        </a-row>

        <!--Any Other Mortgages-->
        <a-row class="row-margin-container">
          <a-col :sm="{ span: 15 }"
                :lg="{ span: 12 }" class="input-left-container">
            <!--Other Expenses-->
            <div class="laval-txt">
              <label :class="['required', errorClass('otherMortgage')]"
                >Any Other Mortgages</label
              >
            </div>
            <div>
              <a-radio-group class="btn-radio mortgages-redio"
                v-model="createMortgage.otherMortgage"
                @change="onChange"
              >
                <a-radio value="yes"> Yes </a-radio>
                <a-radio value="no"> No </a-radio>
              </a-radio-group>
              <div v-show="submitted && hasErrors" class="invalid-feedback">
                {{valdationOnSave['otherMortgage']}}
              </div>
            </div>
          </a-col>
          <a-col :sm="{ span: 15 }"
                :lg="{ span: 12 }" class="input-right-container">
            <!--Interest Rate-->
            <div v-if="createMortgage.otherMortgage === 'yes'">
              <label :class="['required', errorClass('mortgageDetails')]"
                >Mortgage Details</label
              >
              <input
                class="input-box"
                :class="['required', errorClass('mortgageDetails')]"
                type="text"
                :value="createMortgage.mortgageDetails"
                @input="updateMortgage($event, 'mortgageDetails')"
              />
              <div v-show="submitted && hasErrors" class="invalid-feedback">
                {{valdationOnSave['mortgageDetails']}}
              </div>
            </div>
          </a-col>
        </a-row>
        <a-row>
        <a-col :sm="{ span: 15 }"
                :lg="{ span: 24 }" class="input-left-container">
        <div>
          <label :class="['required', errorClass('comment')]">Comments</label>
          <textarea
            class="input-box"
            :class="['required', errorClass('comment')]"
            v-model="createMortgage.comment"
            @input="updateMortgage($event, 'comment')"
          >
          </textarea>
          <div v-show="submitted && hasErrors" class="invalid-feedback">
            {{valdationOnSave['comment']}}
          </div>
        </div>
        </a-col></a-row>
        <a-row>
        <a-col :sm="{ span: 15 }"
                :lg="{ span: 24 }" class="input-left-container">
            
        <!-- <div v-if="hasErrors" class="ui error message">
          <ul class="list">
            <li v-for="(value, key) in valdationOnSave" :key="key">{{ value }}</li>
          </ul>
        </div> -->

        <div class="button-container">
          <a-button type="primary" class="orange-button" @click="onSubmit"
            >Submit</a-button
          >
          <a-button class="cancel-btn" @click="onCancel">Cancel</a-button>
        </div>
        </a-col></a-row>
      </div>
    </form>
  </div>
</template>

<script>
import { mapActions, mapState, mapGetters } from "vuex";
import typeDropdown from "../../shared/typeDropdown";

export default {
  name: "MortgageForm",
  data() {
    return {
      citiesDropdown: [],
      typeDropdown: typeDropdown,
    };

  },
  computed: {
    ...mapState("mortgage", {
      createMortgage: (state) => state.createMortgage,
      submitted: (state) => state.submitted,
      canadaCities: (state) => state.canadaCities,
    }),
    ...mapGetters("mortgage", ["valdationOnSave"]),
    hasErrors() {
      return Object.keys(this.valdationOnSave).length > 0;
    },
    ...mapState("authentication", {
      user: (state) => state.user,
    }),
  },
  created() {
      this.mortgageSubmitted(false);
      this.citiesDropdown = this.canadaCities;
  },
  methods: {
    ...mapActions("mortgage", [
      "mortgageSubmitted",
      "updateMortgageData",
      "saveMortgage",
      "resetMortgage",
    ]),

    updateMortgage(e, property) {
      if( property === "preferredLocation" || property === "state" || property === "city") {
          this.citiesDropdown = this.canadaCities;
          his.updateMortgageData({ prop: property, value: e });
          
      } else {
        this.updateMortgageData({ prop: property, value: e.target.value });
      }
    },
    onSearch(searchText) {
      this.citiesDropdown = [...this.canadaCities]
      this.citiesDropdown = this.citiesDropdown.filter((place) =>
            place.value
              .toLowerCase()
              .startsWith(searchText.split(" ").join("").toLowerCase())
          );
    },
    onChange(value) {
      console.log("onChange", value);
    },
    errorClass(name) {
      return this.submitted && this.valdationOnSave[name] ? ["error"] : "";
    },
    check(obj) {
      console.log(obj);
    },
    onSubmit() {
      this.mortgageSubmitted(true);
      if (!this.hasErrors) {
        let obj = {
          name: this.createMortgage.name,
          address: this.createMortgage.address,
          city: this.createMortgage.city,
          state: this.createMortgage.state,
          zip: this.createMortgage.zip,
          action: this.user.role,
          location_details: {
            budget: {
              min: null,
              max: null,
            },
          },
          phone: this.createMortgage.phone,
          email: this.createMortgage.email,
          address_line_two: this.createMortgage.address2,
          type: this.createMortgage.type,
          first_time_home_buyer: this.createMortgage.firstTimeBuyer,
          preferred_location: this.createMortgage.preferedLocation,
          no_of_household_people: this.createMortgage.noOfHousehold,
          profession_self: this.createMortgage.professionSelf,
          profession_spouse: this.createMortgage.professionSpouse,
          income_self: this.createMortgage.incomeSelf,
          income_spouse: this.createMortgage.incomeSpouse,
          any_other_mortgage: this.createMortgage.otherMortgage,
          any_other_mortgage_detail: this.createMortgage.mortgageDetails,
          other_expenses: this.createMortgage.otherExpenses,
          interest_rate: this.createMortgage.interestRate,
          comment: this.createMortgage.comment,
          down_payment: this.createMortgage.downPayment,
        };
        this.saveMortgage(obj);
        
      }
    },
    onCancel() {
      this.mortgageSubmitted(false);
      this.resetMortgage();
    },
  },
};
</script>

<style>
.mortgage-formlayout .input-box {
  width: 100%;
  padding: 6px 10px;
  border: 1px solid #dcdcdc;
  border-radius: 4px;
  background: transparent;
  border-width: 1px;
  margin-top: 6px;
  margin-bottom: 10px;
}

.mortgage-formlayout .input-box:focus {
  border-color: #40a9ff;
  border-right-width: 1px !important;
  outline: unset;
}

.mortgage-formlayout .ant-select-auto-complete.ant-select .ant-input {
  margin-top: 0px;
  margin-bottom: 10px;
}
.mortgage-formlayout .required:after {
  content: " *";
}
.error.ant-select-auto-complete.ant-select .ant-input{
  border-color: red;
}

.error.ant-select-auto-complete.ant-select .ant-input.ant-select-search__field {
  border-color: red;
}
.mortgage-formlayout .required.error:after {
  color: red;
}
.mortgage-formlayout .required.error.input-box {
  border-color: red;
}
.mortgage-formlayout .required.error.input-box {
  border-color: red;
}
.error {
  border-color: red;
}
.mortgage-formlayout .form-heading-txt {
  font-size: 20px;
  font-weight: 600;
  padding-bottom: 10px;
}
.mortgage-formlayout .form-sub-heading-txt {
  border-top: 1px solid #d6d6d6;
  font-size: 18px;
  padding-top: 10px;
  margin-bottom: 20px;
}
.mortgage-formlayout .location-section {
  margin-top: 30px;
}
.mortgage-formlayout .input-box-min-max {
  padding: 6px 10px;
  border: 1px solid #dcdcdc;
  border-radius: 4px;
  background: transparent;
  border-width: 1px;
  margin-top: 6px;
  margin-bottom: 10px;
}
.mortgage-formlayout .input-box-min-max:focus {
  border-color: #40a9ff;
  border-right-width: 1px !important;
  outline: unset;
}
.mortgage-formlayout .ant-checkbox-group {
  width: 100%;
  margin: 10px 0;
}
.mortgage-formlayout .laval-txt {
  width: 100%;
  margin: 10px 0;
}
.mortgage-formlayout .button-container {
  width: 100%;
  float: right;
  text-align: right;
  margin: 20px 0;
}
.mortgage-formlayout .input-left-container {
  padding-right: 5px;
}
.mortgage-formlayout .input-right-container {
  padding-left: 5px;
}
.mortgage-formlayout .input-box {
  padding: 4px 10px;
  margin-top: 0px;
  margin-bottom: 0px;
}
.mortgage-formlayout .row-margin-container {
  margin-top: 10px;
}
.mortgage-formlayout .ant-layout-content .formlayout {
  padding: 24px !important;
}
.mortgage-formlayout .city-input {
  padding-right: 10px;
}
.mortgage-formlayout .orange-button {
  background-color: #ff5722;
  border-color: #ff5722;
}
.mortgage-formlayout .ant-btn-primary:active,
.mortgage-formlayout .ant-btn-primary.active {
  background-color: #ff5722;
  border-color: #ff5722;
  color: #ffffff;
}
.mortgage-formlayout .ant-btn-primary:hover,
.mortgage-formlayout .ant-btn-primary:focus {
  background-color: #ff5722;
  border-color: #ff5722;
  color: #ffffff;
}
.mortgage-formlayout .ant-btn.active,
.mortgage-formlayout .ant-btn:active {
  border-color: #ff5722;
  color: #ffffff;
}
.mortgage-formlayout .ant-btn:focus,
.mortgage-formlayout .ant-btn:hover {
  border-color: #ff5722;
  color: #ffffff;
}
.mortgages-redio{
margin-bottom: 20px;
}
.mortgage-formlayout .type-input-box{
  margin-top: 10px;
}
.cancel-btn:hover,.cancel-btn:active,.cancel-btn:focus{
  color:#ff5722 !important;
}
.list {
  color: red;
}
.mortgage-formlayout .input-dropdown {
  width: 100%;
  border-width: 1px;
  margin-top: 6px;
  margin-bottom: 10px;
}

.mortgage-formlayout .required.error.input-dropdown {
  border-color: red;
}
.options-dropdowns:hover, .options-dropdowns:focus, .options-dropdowns:active{
  background-color: #ffc0ad41 !important;
}
.ant-select-dropdown-menu-item:hover:not(.ant-select-dropdown-menu-item-disabled){
  background-color: #ffc0ad41 !important;
}
.required.error.input-dropdown {
  border-color: red;
}
.required.error:after {
  color: red;
}
.invalid-feedback {
  color: red
}
.required.error.input-dropdown .ant-select-selection.ant-select-selection--single{
  border-color: red;
}

.error.input-dropdown .ant-select-selection.ant-select-selection--single{
  border-color: red;
}

@media only screen and (min-width: 320px) and (max-width: 991px) {
  .mortgage-formlayout .input-left-container {
    padding-right: 0px !important;
  }
  .mortgage-formlayout .input-right-container {
    padding-left: 0px !important;
  }
  .ant-radio-wrapper{
    margin-bottom: 10px;
  }
}


</style>