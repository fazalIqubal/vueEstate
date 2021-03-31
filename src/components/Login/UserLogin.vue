<template>
  <div class="login-page-container">
    <div class="login-logo-txt">Lamba Realtors</div>
    <div class="login-box-container">
      <form class="ui form" @submit.prevent="handleSubmit">
        <div class="login-heading-txt">LOGIN!</div>
        <div>
          <label>Username</label>
          <input
            class="input-box"
            type="text"
            placeholder="Username"
            maxlength="500"
            v-model="email"
            name="email"
            :class="{ 'required error': submitted && !email }"
          />
          <div v-show="submitted && !email" class="invalid-feedback">
            Username is required
          </div>
        </div>
        <div>
          <label>Password</label>
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

        <a-alert
          v-if="alert.message"
          type="error"
          v-bind:message="alert.message"
          banner
        />

        <div class="login-footer-container">
          <div class="create-account-txt" type="signUp" @click="signUpPage">Create Account</div>
          <div class="footer-button-container">
            <a-button
              type="primary"
              class="orange-button"
              v-on:click="handleSubmit"
              >Login</a-button
            >
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState, mapGetters } from "vuex";
export default {
  data() {
    return {
      email: "",
      password: "",
      submitted: false,
    };
  },
  computed: {
    alert() {
      return this.$store.state.authentication.status;
    },
    loggingIn() {
      return this.$store.state.authentication.status.loggingIn;
    },
  },
  created() {
    // reset login status
    this.$store.dispatch("authentication/logout");
  },
  methods: {
    ...mapActions("authentication", ["signUpPage"]),
    handleSubmit(e) {
      this.submitted = true;
      const { email, password } = this;
      const { dispatch } = this.$store;
      if (email && password) {
        dispatch("authentication/login", { email, password });
      }
    },
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
.login-box-container {
  width: 40%;
  margin: auto;
  margin-top: 30px;
  box-shadow: 0 10px 20px -2px rgba(0, 0, 0, 0.14);
  background-color: #ffffff;
  padding: 45px;
}
.login-logo-txt {
  font-size: 24px;
  font-weight: 600;
  margin-bottom: 30px;
  margin-left: 20px;
}
.login-heading-txt {
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 20px;
}
.login-footer-container {
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
.login-page-container .orange-button {
  background-color: #ff5722;
  border-color: #ff5722;
  color: #ffffff;
}
.required.error.input-box {
  border-color: red;
}
.login-page-container .ant-btn-primary:active,
.login-page-container .ant-btn-primary.active {
  background-color: #ff5722;
  border-color: #ff5722;
  color: #ffffff;
}
.login-page-container .ant-btn-primary:hover,
.login-page-container .ant-btn-primary:focus {
  background-color: #ff5722;
  border-color: #ff5722;
  color: #ffffff;
}

.invalid-feedback {
  color: red;
}

@media only screen and (min-width: 512px) and (max-width: 768px) {
  .login-box-container {
    width: 60%;
  }
}
@media only screen and (min-width: 320px) and (max-width: 511px) {
  .login-box-container {
    width: 90%;
  }
}
</style>