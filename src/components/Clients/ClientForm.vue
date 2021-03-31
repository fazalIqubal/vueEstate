<template>
  <div class="formlayout">
    <div class="form-heading-txt">Enter New Client</div>
    <div class="form-sub-heading-txt">Client details</div>
    <form class="ui form">
      <div class="input-box-padding">
        <label :class="['required', errorClass('name')]">Name</label>
        <input
          class="input-box"
          :class="['required', errorClass('name')]"
          type="text"
          maxlength="500"
          :value="createClient.name"
          @input="updateClient($event, 'name')"
        />
        <div v-show="submitted && hasErrors" class="invalid-feedback">
          {{valdationOnSave['name']}}
        </div>
      </div>
      <!-- Address -->
      <div class="input-box-padding">
        <label :class="['required', errorClass('address')]">Address</label>
        <textarea
          class="input-box"
          :class="['required', errorClass('address')]"
          :value="createClient.address"
          @input="updateClient($event, 'address')"
        >
        </textarea>
        <div v-show="submitted && hasErrors" class="invalid-feedback">
          {{valdationOnSave['address']}}
        </div>
      </div>
      <a-row class="row-margin-container">
        <a-col
          :sm="{ span: 24 }"
          :lg="{ span: 8 }"
          class="input-left-container city-input"
        >
          <!-- city -->
          <div class="input-box-padding">
            <label :class="['required', errorClass('city')]">City</label>
            <a-auto-complete
              :class="[errorClass('city')]"
              v-model="createClient.city"
              :data-source="citiesDropdown"
              @select="updateClient($event, 'city')"
              @search="onCitiesSearch"
              @change="onChange"
            />
            <div v-show="submitted && hasErrors" class="invalid-feedback">
              {{valdationOnSave['city']}}
          </div>
          </div>
        </a-col>
        <a-col
          :sm="{ span: 24 }"
          :lg="{ span: 8 }"
          class="input-left-container"
        >
          <!-- State Dropdown -->
          <div class="input-box-padding">
            <label :class="['required', errorClass('state')]">State</label>
            <a-auto-complete
              :class="[errorClass('state')]"
              v-model="createClient.state"
              :data-source="citiesDropdown"
              @select="updateClient($event, 'state')"
              @search="onCitiesSearch"
              @change="onChange"
            />
            <div v-show="submitted && hasErrors" class="invalid-feedback">
              {{valdationOnSave['state']}}
          </div>
          </div>
        </a-col>
        <a-col
          :sm="{ span: 24 }"
          :lg="{ span: 8 }"
          class="input-right-container"
        >
          <!-- zip -->
          <div class="input-box-padding">
            <label :class="['required', errorClass('zip')]">Zip</label>
            <input
              class="input-box zip-input-box"
              :class="['required', errorClass('zip')]"
              type="number"
              :value="createClient.zip"
              @input="updateClient($event, 'zip')"
            />
            <div v-show="submitted && hasErrors" class="invalid-feedback">
              {{valdationOnSave['zip']}}
          </div>
          </div>
        </a-col>
      </a-row>
      <!-- location Details -->
      <div class="location-section">
        <div class="form-sub-heading-txt">Location details</div>
        <!-- prefered Location -->
        <div class="input-box-padding">
          <label :class="['required', errorClass('preferedLocation')]"
            >Prefered Location</label
          >
          <a-auto-complete
            :class="[errorClass('preferedLocation')]"
            v-model="createClient.preferedLocation"
            :data-source="citiesDropdown"
            @select="updateClient($event, 'preferedLocation')"
            @search="onCitiesSearch"
            @change="onChange"
          />
          <div v-show="submitted && hasErrors" class="invalid-feedback">
            {{valdationOnSave['preferedLocation']}}
          </div>
        </div>
        <!-- type -->
        <div class="input-box-padding">
          <div class="laval-txt">
          <label :class="['required', errorClass('type')]">Type</label>
          </div>
          <a-select
            class="input-dropdown"
            :class="[errorClass('type')]"
            v-model="createClient.type"
            @change="updateClient($event, 'type')"
          >
            <a-select-option
              v-for="type in typeDropdown"
              :key="type.value"
              :value="type.value"
            >
              {{ type.label }}
            </a-select-option>
          </a-select>
           <div v-show="submitted && hasErrors" class="invalid-feedback">
              {{valdationOnSave['type']}}
            </div>
        </div>
        <!-- budget -->
        <div>
          <label :class="['required', errorClass('budget')]">Budget</label>
          <div>
            <a-row>
              <a-col
                :sm="{ span: 24 }"
                :lg="{ span: 12 }"
                class="input-left-container"
              >
                <input
                  :class="['required', errorClass('budgetMin')]"
                  class="input-box-min-max"
                  placeholder="Min"
                  type="number"
                  :value="createClient.budgetMin"
                  @input="updateClient($event, 'budgetMin')"
                />
              </a-col>
              <a-col
                :sm="{ span: 24 }"
                :lg="{ span: 12 }"
                class="input-right-container"
              >
                <input
                  class="input-box-min-max"
                  :class="['required', errorClass('budgetMax')]"
                  placeholder="Max"
                  type="number"
                  :value="createClient.budgetMax"
                  @input="updateClient($event, 'budgetMax')"
                />
              </a-col>
            </a-row>
              <div v-show="submitted && hasErrors" class="invalid-feedback">
                {{valdationOnSave['budget']}}
              </div>
          </div>
        </div>
        <!-- Bedrooms -->
        <div class="laval-txt">
          <label :class="['required', errorClass('bedroom')]">Bedroom(s)</label>
        </div>
        <div
          class="select-box-container"
          v-for="(beds, index) in bedroomSelected"
          :key="`beds.value-${index}`"
        >
          <div
            @click="onBedroomClick"
            class="select-box"
            :class="beds.checked && 'selected'"
          >
            <span>{{ beds.value }}</span>
          </div>
        </div>
        <div v-show="submitted && hasErrors" class="invalid-feedback">
            {{valdationOnSave['bedroom']}}
          </div>
        <!-- bathrooms -->
        <div class="laval-txt">
          <label :class="['required', errorClass('bathroom')]"
            >Bathrooms(s)</label
          >
        </div>
        <div
          class="select-box-container"
          v-for="bath in bathroomSelected"
          :key="bath.value"
        >
          <div
            @click="onBathroomClick"
            class="select-box"
            :class="bath.checked && 'selected'"
          >
            <span>{{ bath.value }}</span>
          </div>
        </div>
        <div v-show="submitted && hasErrors" class="invalid-feedback">
            {{valdationOnSave['bathroom']}}
          </div>
        <!-- prefered School Location -->
        <div class="input-box-padding">
          <label :class="['required', errorClass('schoolDist')]"
            >Preferred School Dist</label
          >
          <a-auto-complete
            :class="[errorClass('schoolDist')]"
            v-model="createClient.schoolDist"
            :data-source="citiesDropdown"
            @select="updateClient($event, 'schoolDist')"
            @search="onCitiesSearch"
            @change="onChange"
          />
          <div v-show="submitted && hasErrors" class="invalid-feedback">
            {{valdationOnSave['schoolDist']}}
          </div>
        </div>
        <!-- Basement & Backyard -->
        <div class="input-box-padding">
          <a-row>
            <a-col :sm="{ span: 24 }" :lg="{ span: 8 }">
              <div class="laval-txt">
                <label :class="['required', errorClass('basement')]"
                  >Basement</label
                >
              </div>
              <a-radio-group
                class="btn-radio"
                v-model="createClient.basement"
                @change="onChange"
              >
                <a-radio value="yes"> Yes </a-radio>
                <a-radio value="no"> No </a-radio>
                <a-radio value="NA"> Doesn't Matter </a-radio>
              </a-radio-group>
              <div v-show="submitted && hasErrors" class="invalid-feedback">
                {{valdationOnSave['basement']}}
              </div>
            </a-col>
            <!-- Backyard -->
            <a-col :sm="{ span: 24 }" :lg="{ span: 8 }">
              <div class="laval-txt">
                <label :class="['required', errorClass('backyard')]"
                  >Backyard</label
                >
              </div>
              <a-radio-group
                class="btn-radio"
                v-model="createClient.backyard"
                @change="onChange"
              >
                <a-radio value="yes"> Yes </a-radio>
                <a-radio value="no"> No </a-radio>
                <a-radio value="NA"> Doesn't Matter </a-radio>
              </a-radio-group>
              <div v-show="submitted && hasErrors" class="invalid-feedback">
                {{valdationOnSave['backyard']}}
              </div>
            </a-col>
          </a-row>
        </div>
        <!-- Mortgage -->
        <div class="input-box-padding">
          <a-row>
            <a-col :span="24">
              <div class="laval-txt">
                <label :class="['required', errorClass('mortgageApproved')]">
                  Mortgage Approved
                </label>
              </div>
              <a-radio-group
                class="btn-radio"
                v-model="createClient.mortgageApproved"
                @change="onChange"
              >
                <a-radio value="yes"> Yes </a-radio>
                <a-radio value="no"> No </a-radio>
                <a-radio value="applied"> Applied </a-radio>
                <a-radio value="rejected"> Rejected </a-radio>
                <a-radio value="options"> Looking for option </a-radio>
              </a-radio-group>
            </a-col>
          </a-row>
          <div v-show="submitted && hasErrors" class="invalid-feedback">
            {{valdationOnSave['mortgageApproved']}}
          </div>
        </div>
        <!-- comments -->
        <div>
          <label :class="['required', errorClass('comment')]">Comments</label>
          <textarea
            class="input-box"
            :class="['required', errorClass('comment')]"
            v-model="createClient.comments"
            @input="updateClient($event, 'comment')"
          >
          </textarea>
          <div v-show="submitted && hasErrors" class="invalid-feedback">
            {{valdationOnSave['comment']}}
          </div>
        </div>
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
      </div>
    </form>
  </div>
</template>

<script>
import { mapActions, mapState, mapGetters } from "vuex";
import typeDropdown from "../../shared/typeDropdown";

export default {
  name: "ClientForm",
  data() {
    return {
      citiesDropdown: [],
      typeDropdown: typeDropdown,
    };
  },
  computed: {
    ...mapState("clients", {
      createClient: (state) => state.createClient,
      bedroomSelected: (state) => state.bedroomSelected,
      bathroomSelected: (state) => state.bathroomSelected,
      canadaCities: (state) => state.canadaCities,
      submitted: (state) => state.submitted,

    }),
    ...mapState("authentication", {
      user: (state) => state.user,
    }),
    ...mapGetters("clients", ["valdationOnSave"]),
    hasErrors() {
      return Object.keys(this.valdationOnSave).length > 0;
    },
  },
  created() {
    this.citiesDropdown = this.canadaCities;
  },
  methods: {
    ...mapActions("clients", [
      "clientSubmitted",
      "updateClientData",
      "saveClient",
      "resetClient",
      "bedroomUpdate",
      "bathroomUpdate",
    ]),

    updateClient(e, property) {
      if( property === "preferedLocation" ||
        property === "state" ||
        property === "city" ||
        property === "schoolDist" ) {
          this.citiesDropdown = this.canadaCities;
          this.updateClientData({ prop: property, value: e });
      } else {
        this.updateClientData({ prop: property, value: e.target.value });
      }
    },
    onChange(value) {
      console.log("onChange", value);
    },
    errorClass(name) {
      return this.valdationOnSave[name] ? ["error"] : "";
    },
    check(obj) {
      console.log(obj);
    },
    onCitiesSearch(searchText) {
      this.citiesDropdown = [...this.canadaCities]
      this.citiesDropdown = this.citiesDropdown.filter((place) =>
            place.value
              .toLowerCase()
              .startsWith(searchText.split(" ").join("").toLowerCase())
          );
    },
    onCancel() {
      this.resetClient();
    },
    onBedroomClick(bed) {
      let temp = {};
      if (bed && bed.target) {
        this.bedroomUpdate(bed);
      }
    },
    onBathroomClick(bath) {
      let temp = {};
      if (bath && bath.target) {
        this.bathroomUpdate(bath);
      }
    },
    onSubmit() {
      this.clientSubmitted(true);
      if (!this.hasErrors) {
        let obj = {
          name: this.createClient.name,
          address: this.createClient.address,
          city: this.createClient.city,
          state: this.createClient.state,
          zip: this.createClient.zip,
          action: this.user.role,
          location_details: {
            preferred_location: this.createClient.preferedLocation,
            budget: {
              min: this.createClient.budgetMin,
              max: this.createClient.budgetMax,
            },
            bedrooms: this.createClient.bedroomSelected,
            bathrooms: this.createClient.bathroomSelected,
            preferred_school_dist: this.createClient.schoolDist,
            basement: this.createClient.basement,
            backyard: this.createClient.backyard,
            mortgage_approved: this.createClient.mortgageApproved,
          },
          phone: "",
          email: "",
          address_line_two: "",
          type: this.createClient.type,
          first_time_home_buyer: "",
          preferred_location: "",
          no_of_household_people: "",
          profession_self: "",
          profession_spouse: "",
          income_self: "",
          any_other_mortgage: "",
          any_other_mortgage_detail: "",
          other_expenses: "",
          interest_rate: "",
          comment: this.createClient.comments,
        };
        this.saveClient(obj);
      }
    },
  },
};
</script>

<style>
.formlayout .input-box {
  width: 100%;
  padding: 6px 10px;
  border: 1px solid #dcdcdc;
  border-radius: 4px;
  background: transparent;
  border-width: 1px;
  margin-top: 6px;
  margin-bottom: 10px;
}

.formlayout .input-box:focus {
  border-color: #40a9ff;
  border-right-width: 1px !important;
  outline: unset;
}

.formlayout .ant-select-auto-complete.ant-select .ant-input {
  margin-top: 6px;
  margin-bottom: 10px;
}
.formlayout .required:after {
  content: " *";
}

.formlayout .required.error:after {
  color: red;
}
.formlayout .required.error.input-box {
  border-color: red;
}
.formlayout .required.error.input-box {
  border-color: red;
}

.formlayout .form-heading-txt {
  font-size: 20px;
  font-weight: 600;

  padding-bottom: 10px;
}
.formlayout .form-sub-heading-txt {
  border-top: 1px solid #d6d6d6;
  font-size: 18px;
  padding-top: 10px;
  margin-bottom: 20px;
}
.formlayout .location-section {
  margin-top: 30px;
}
.formlayout .input-box-min-max {
  padding: 6px 10px;
  border: 1px solid #dcdcdc;
  border-radius: 4px;
  background: transparent;
  border-width: 1px;
  margin-top: 6px;
  margin-bottom: 10px;
  width: 100%;
}
.formlayout .input-box-min-max:focus {
  border-color: #40a9ff;
  border-right-width: 1px !important;
  outline: unset;
}
.formlayout .ant-checkbox-group {
  width: 100%;
  margin: 10px 0;
}
.formlayout .laval-txt {
  width: 100%;
  margin: 10px 0;
}
.formlayout .button-container {
  width: 100%;
  float: right;
  text-align: right;
  margin: 20px 0;
}

.ant-layout-content .formlayout {
  padding: 24px !important;
}
.formlayout .input-left-container {
  padding-right: 5px;
}
.formlayout .input-right-container {
  padding-left: 5px;
}
.formlayout .input-box[data-v-f2533e34] {
  padding: 4px 10px;
  margin-top: 0px;
  margin-bottom: 0px;
}
.formlayout .city-input {
  padding-right: 10px;
}
.formlayout .select-box-container {
  display: inline-block;
}

.input-box-min-max.required.error {
  border-color: red;
}
.error.ant-select-auto-complete.ant-select .ant-input.ant-select-search__field {
  border-color: red;
}
.formlayout .select-box:hover{
   border: 1px solid #ff5722;
  color: #ff5722;
}
.formlayout .select-box {
  border: 1px solid #dcdcdc;
  display: inline-block;
  width: 50px;
  text-align: center;
  padding: 3px 0px;
  border-radius: 20px;
  cursor: pointer;
  margin-bottom: 10px;
  margin-right: 10px;
}
.formlayout .selected {
  border: 1px solid #ff5722;
  color: #ff5722;
  font-weight: 600;
}
.formlayout .input-box-padding {
  padding-bottom: 10px;
}
.formlayout .orange-button {
  background-color: #ff5722;
  border-color: #ff5722;
}
.formlayout .ant-btn-primary:active,
.formlayout .ant-btn-primary.active {
  background-color: #ff5722;
  border-color: #ff5722;
  color: #ffffff;
}
.formlayout .ant-btn-primary:hover,
.formlayout .ant-btn-primary:focus {
  background-color: #ff5722;
  border-color: #ff5722;
  color: #ffffff;
}
.formlayout .ant-btn.active,
.formlayout .ant-btn:active {
  border-color: #ff5722;
  color: #ffffff;
}
.formlayout .ant-btn:focus,
.formlayout .ant-btn:hover {
  border-color: #ff5722;
  color: #ffffff;
}
.formlayout .zip-input-box{
  height: 32px;
}
.cancel-btn:hover,.cancel-btn:active,.cancel-btn:focus{
  color:#ff5722 !important;
}

.list {
  color: red;
}
.options-dropdowns:hover, .options-dropdowns:focus, .options-dropdowns:active{
    background-color: #ffc0ad41 !important;
}
.ant-select-dropdown-menu-item:hover:not(.ant-select-dropdown-menu-item-disabled){
  background-color: #ffc0ad41 !important;
}
.input-dropdown {
  width: 100%;
  border-width: 1px;
  margin-top: 6px;
  margin-bottom: 10px;
}
.formlayout .required.error.input-dropdown {
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

.required.error.input-dropdown .ant-select-selection.ant-select-selection--single{
  border-color: red;
}

.error.input-dropdown .ant-select-selection.ant-select-selection--single{
  border-color: red;
}
.invalid-feedback{
  color:red
}

@media only screen and (min-width: 320px) and (max-width: 991px) {
  .formlayout .input-left-container {
    padding-right: 0px !important;
  }
  .formlayout .input-right-container {
    padding-left: 0px !important;
  }
  .ant-radio-wrapper{
    margin-bottom: 10px;
  }
}

</style>