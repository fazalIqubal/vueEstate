<template>
  <div class="signup-page-container">
    <div class="signup-logo-txt">Lamba Realtors</div>
    <div class="signup-box-container">
      <form class="ui form" @submit.prevent="handleSubmit">
        <div class="signup-heading-txt">SIGNUP!</div>
        <div>
          <label  :class="[ 'required error']">First Name</label>
          <input
            class="input-box"
            type="text"
            placeholder="First Name"
            maxlength="500"
            name="first_name"
            v-model="first_name"
            :class="{ 'required error': submitted && !first_name }"
          />
          <div v-show="submitted && !first_name" class="invalid-feedback">
            First Name is required
          </div>
        </div>
        <div>
          <label :class="['required error']">Last Name</label>
          <input
            class="input-box"
            type="text"
            placeholder="Last Name"
            maxlength="500"
            name="last_name"
            v-model="last_name"
            :class="{ 'required error': submitted && !last_name }"
          />
          <div v-show="submitted && !email" class="invalid-feedback">
            Last Name is required
          </div>
        </div>
        <div>
          <label :class="['required error']">Email</label>
          <input
            class="input-box"
            type="text"
            placeholder="Email"
            maxlength="500"
            v-model="email"
            name="email"
            :class="{ 'required error': submitted && !email }"
          />
          <div v-show="submitted && !email" class="invalid-feedback">
            Email is required
          </div>
        </div>
        
        <div>
          <label :class="['required error']">Password</label>
          <input
            class="input-box"
            type="Password"
            placeholder="Password"
            maxlength="500"
            v-model="password"
            v-on:keyup.13="handleSubmit"
            name="password"
            :class="{ 'required error': submitted && !password }"
          />
          <div v-show="submitted && !password" class="invalid-feedback">
            Password is required
          </div>
        </div>
        <div>
          <label :class="['required error']">Role</label>
          <a-select
            class="input-dropdown"
            v-model="roleType"
          :class="{ 'required error': submitted && !roleType }">
            <a-select-option
              class="options-dropdowns"
              v-for="(type, index) in roleDropdown"
              :key="index+type"
              :value="type"
            >
              {{ type }}
            </a-select-option>
          </a-select>
          <div v-show="submitted && !roleType" class="invalid-feedback">
            Role is required
          </div>
        </div>

        <a-alert
          v-if="alert.message"
          type="error"
          v-bind:message="alert.message"
          banner
        />

        <div class="signup-footer-container">
  <!-- <div class="create-account-txt" type="signUp" @click="cancel">Cancel</div> -->
          <!-- <div class="footer-cancel-button-container">
            <a-button
              type="primary"
              class="orange-button"
              v-on:click="cancel"
              >Cancel</a-button
            >
          </div> -->

          <div class="footer-button-container">
          
          <div>
            <a-button
              type="primary"
              class="cancel-btn"
              v-on:click="cancel"
              >Cancel</a-button
            >
            <a-button
              type="primary"
              class="orange-button"
              v-on:click="handleSubmit"
              >Sign up</a-button
            >
          </div>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState, mapGetters } from "vuex";
import roleDropdown from "../../shared/roleDropdown";

export default {
  data() {
    return {
      first_name:"",
      last_name:"",
      email: "",
      password: "",
      roleType: "",
      submitted: false,
      roleDropdown: roleDropdown,
    };
  },
  computed: {
    alert() {
      return this.$store.state.authentication.status;
    },
  },

  methods: {
    handleSubmit(e) {
      this.submitted = true;
      const { email, password, first_name, last_name, roleType } = this;
      const { dispatch } = this.$store;
      if (email && password && first_name && last_name && roleType) {
        dispatch("authentication/signUp", { email, password, first_name, last_name, roleType });
      }
    },
    cancel(e) {
      this.email = this.first_name = this.last_name = this.roleType = this.password = "";
      this.submitted = false;
    }
  },
};
</script>
<style>
.input-box {
  width: 100%;
  padding: 6px 10px;
  border: 1px solid #dcdcdc;
  border-radius: 4px;
  background: transparent;
  border-width: 1px;
  margin-top: 6px;
  margin-bottom: 10px;
}
.input-box:focus {
  border-color: #40a9ff;
  border-right-width: 1px !important;
  outline: unset;
}
.footer-button-container {
  float: right;
  display: inline-block;
}
.cancel-btn{
  color:#727272 !important;
  border-color:#727272 !important;
  background-color: #ffffff!important;
}
.cancel-btn:hover,.cancel-btn:active,.cancel-btn:focus{
  color:#ff5722 !important;
  border-color:#ff5722 !important;
  background-color: #ffffff!important;
}

.footer-cancel-button-container {
  float: left;
  display: inline-block;
}
.signup-box-container {
  width: 40%;
  margin: auto;
  margin-top: 30px;
  box-shadow: 0 10px 20px -2px rgba(0, 0, 0, 0.14);
  background-color: #ffffff;
  padding: 45px;
}
.signup-logo-txt {
  font-size: 24px;
  font-weight: 600;
  margin-bottom: 30px;
  margin-left: 10px;
}
.signup-heading-txt {
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 20px;
}
.signup-footer-container {
  display: inline-block;
  width: 100%;
  margin: 10px 0;
}
.create-account-txt {
  display: inline-block;
  color: #ff5722;
  cursor: pointer;
}

.required:after {
  content: " *";
}

.required.error:after {
  color: red;
}
.required.error.input-box {
  border-color: red;
}
.signup-page-container .orange-button {
  background-color: #ff5722;
  border-color: #ff5722;
  color: #ffffff;
}
.required.error.input-box {
  border-color: red;
}
.signup-page-container .ant-btn-primary:active,
.signup-page-container .ant-btn-primary.active {
  background-color: #ff5722;
  border-color: #ff5722;
  color: #ffffff;
}
.signup-page-container .ant-btn-primary:hover,
.signup-page-container .ant-btn-primary:focus {
  background-color: #ff5722;
  border-color: #ff5722;
  color: #ffffff;
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

@media only screen and (min-width: 512px) and (max-width: 768px) {
  .signup-box-container {
    width: 60%;
  }
}
@media only screen and (min-width: 320px) and (max-width: 511px) {
  .signup-box-container {
    width: 90%;
  }
}
</style>