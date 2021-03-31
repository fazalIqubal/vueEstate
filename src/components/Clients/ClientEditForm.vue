<template>
  <div class="edit-client-fome">
    <a-drawer
      :title="title"
      :visible="visible"
      :body-style="{ paddingBottom: '80px' }"
      @close="() => formCloseHandler()"
      :maskClosable="false"
    >
      <form class="ui form">
        <div>
          <label :class="['required',errorClass('name')]">Name</label>
          <input class="input-box"
            :class="['required',errorClass('name')]"
            type="text"
            maxlength="500"
            :value= "client.name"
            @input="updateClient($event, 'name')"
          />
          <div v-show="submitted && hasErrors" class="invalid-feedback">
            {{validationErrors['name']}}
          </div>
        </div>
        <div >
          <label :class="['required',errorClass('type')]">Type</label>
          <a-select 
            class="input-dropdown" 
            :class="[errorClass('type')]" 
            v-model= "client.type" @change="updateClient($event, 'type')" >
            <a-select-option
              class="options-dropdowns" 
              v-for= "type in typeDropdown" 
              :key= "type.value" 
              :value= "type.value">
              {{type.label}}
            </a-select-option>
          </a-select>
        </div>
        <div  >
          <label :class="['required',errorClass('preferedLocation')]">Prefered Location</label>
          <a-auto-complete
              :class="[errorClass('preferedLocation')]"
              v-model= "client.location_details.preferred_location"
              :data-source= "preferedLocationDropdown"
              @select="updateClient($event, 'preferred_location')"
              @search="onSearch"
              @change="onChange"
            />
            <div v-show="submitted && hasErrors" class="invalid-feedback">
              {{validationErrors['preferedLocation']}}
            </div>
        </div>
        <div>
          <label :class="['required',errorClass('budget')]">Budget</label>
          <a-row>
           <a-col :span="12" class="input-left-container">
            <input
                :class="['required', errorClass('budgetMin')]"
                class="input-box-min-max budget-left"
                placeholder="Min"
                type="number"
                :value="client.location_details.budget.min"
                @input="updateClient($event, 'min')"
              />
              <div v-show="submitted && hasErrors" class="invalid-feedback">
                {{validationErrors['budgetMin']}}
              </div>
            </a-col>
             <a-col :span="12">
              <input
                class="input-box-min-max budget-right"
                :class="['required', errorClass('budgetMax')]"
                placeholder="Max"
                type="number"
                :value="client.location_details.budget.max"
                @input="updateClient($event, 'max')"
              />
              <div v-show="submitted && hasErrors" class="invalid-feedback">
                {{validationErrors['budgetMax']}}
              </div>
            </a-col>
            <div v-show="submitted && hasErrors" class="invalid-feedback">
              {{validationErrors['budget']}}
            </div>
          </a-row>
        </div>
        <div >
          <label :class="['required',errorClass('status')]">Status</label>
          <a-select class="input-dropdown" v-model= "client.status" @change="updateClient($event, 'status')">
            <a-select-option class="options-dropdowns" v-for= "status in statusDropdown"
            :class="[errorClass('status')]"
            :key= "status.value"
            :value= "status.value"
            >
              {{status.label}}
            </a-select-option>
          </a-select>
        </div>
        <div >
          <label :class="['required',errorClass('comment')]">Comments</label>
          <textarea class="input-box"
            :class="['required',errorClass('comment')]"
            v-model= "client.comment"
            @input="updateClient($event, 'comment')"
          >
          </textarea>
          <div v-show="submitted && hasErrors" class="invalid-feedback">
            {{validationErrors['comment']}}
          </div>
        </div>
      </form>
      <div
        :style="{
          position: 'absolute',
          right: 0,
          bottom: 0,
          width: '100%',
          borderTop: '1px solid #e9e9e9',
          padding: '10px 16px',
          background: '#fff',
          textAlign: 'right',
          zIndex: 1,
        }"
      >
        <a-button
          class="cancel-btn"
          :style="{ marginRight: '8px' }"
          @click="() => formCloseHandler()"
        >
          Cancel
        </a-button>
        <div class="orange-button" @click="() => onSubmit()">
          Update
        </div>
      </div>
    </a-drawer>
  </div>
</template>
<script>
import { mapActions, mapState, mapGetters } from "vuex";
import statusDropdown from "../../shared/statusDropdown";
import typeDropdown from "../../shared/typeDropdown";
import locationLookup from "../../shared/citiesDropdown";

export default {
  props: {
    visible: {
      type: Boolean,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    onFormClose: Function,
    onFormEdit: Function,
    onFormSubmit: Function,
  },
  data() {
    return {
      typeDropdown: typeDropdown,
      statusDropdown: statusDropdown,
      preferedLocationDropdown: locationLookup,
    };
  },
  computed: {
    ...mapState('clients', {
      client: state => state.editClient,
      submitted: (state) => state.submitted,
    }),
    ...mapState("authentication", {
      user: (state) => state.user,
    }),
    ...mapGetters('clients', ['validationErrors']),
    hasErrors () {
      return Object.keys(this.validationErrors).length > 0
    },
  },
  methods: {
    ...mapActions('clients', ['updateEditClient', "clientSubmitted"]),
    formCloseHandler() {
      this.onFormClose();
    },
    onSearch(searchText) {
      this.preferedLocationDropdown =
        this.preferedLocationDropdown.length === 0 ? locationLookup : this.preferedLocationDropdown;
      this.preferedLocationDropdown = !searchText
        ? locationLookup
        : this.preferedLocationDropdown.filter((place) =>
            place.value.toLowerCase().startsWith((searchText.split(" ").join("")).toLowerCase())
          );
    },
    onSelect(value) {
      console.log("onSelect", value);
    },
    onChange(value) {
      console.log("onChange", value);
    },
    updateClient(e, property) {
      const value = property === 'preferred_location' ? e : e.target.value;
      this.updateEditClient({ prop: property, value: value });
    },
    onSubmit() {
      this.clientSubmitted(true);
      if(!this.hasErrors) {
        this.client.action= this.user.role,
        this.onFormSubmit(this.client);
      }
    },
    errorClass(name) {
      return this.validationErrors[name] ? ['error'] : '';
    }
  }
};
</script>

<style>
  .edit-client-fome .input-box{
    width: 100%;
    padding: 6px 10px;
    border: 1px solid #DCDCDC;
    border-radius: 4px;
    background: transparent;
    border-width: 1px;
    margin-top: 6px;
    margin-bottom: 10px;
  }

  .input-box {
  padding: 6px 10px;
  border: 1px solid #dcdcdc;
  border-radius: 4px;
  background: transparent;
  border-width: 1px;
  margin-top: 6px;
  margin-bottom: 10px;
  width: 100%;
}

 .input-box:focus {
    border-color: #40a9ff;
    border-right-width: 1px !important;
    outline: unset;
  }

  .ant-select-auto-complete.ant-select .ant-input{
    margin-top: 6px;
    margin-bottom: 10px;
  }

 .required:after { 
    content:" *"; 
  }

  .required.error:after {
    color: red;
  }
 .required.error.input-box {
    border-color: red;
  }
  .input-right-container {
  padding-left: 5px;
}
.input-box-min-max {
  padding: 6px 10px;
  border: 1px solid #dcdcdc;
  border-radius: 4px;
  background: transparent;
  border-width: 1px;
  margin-top: 6px;
  margin-bottom: 10px;
  width: 100%;
}
.input-box-min-max:focus {
  border-color: #40a9ff;
  border-right-width: 1px !important;
  outline: unset;
}
.required.error.input-box-min-max {
  border-color: red;
}

.orange-button{
  background-color: #ff5722;
  border-color:#ff5722;
  color:#ffffff;
  line-height: 1.499;
  position: relative;
  display: inline-block;
  font-weight: 400;
  white-space: nowrap;
  text-align: center;
  background-image: none;
  border: 1px solid transparent;
  box-shadow: 0 2px 0 rgba(0, 0, 0, 0.015);
  touch-action: manipulation;
  height: 32px;
  padding: 5px 15px;
  font-size: 14px;
  border-radius: 4px;
  cursor: pointer;
} 
.cancel-btn:hover,.cancel-btn:active,.cancel-btn:focus{
  color:#ff5722 !important;
  border-color:#ff5722 !important;
  background-color: #ffffff!important;
}
.orange-button.active, .orange-button:active{
  background-color:#ff5722;
  color:#ffffff;
}
.ant-btn-primary:active, .ant-btn-primary.active{
  background-color:#ff5722 !important;
  color:#ffffff !important;
}
.ant-btn.active, .ant-btn:active{
  border-color:#ff5722;
  color:#ff5722;
}
.error.ant-select-auto-complete.ant-select .ant-input.ant-select-search__field {
  border-color: red;
}
.invalid-feedback {
  color: red;
}
.ant-drawer-content-wrapper{
  width:40%!important;
}
.budget-left{
  margin-right: 5px;
}
.budget-right{
  margin-left: 5px;
}
.input-dropdown {
  width: 100%;
  border-width: 1px;
  margin-top: 6px;
  margin-bottom: 10px;
}
@media only screen and (min-width: 320px) and (max-width: 400px) {
  .ant-drawer-content-wrapper{
    width:100%!important;
}
}
@media only screen and (min-width: 401px) and (max-width: 768px) {
  .ant-drawer-content-wrapper{
    width:80%!important;
}
}

</style>
