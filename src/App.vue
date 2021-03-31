<template>
  <a-layout id="components-layout-demo-custom-trigger">
    <div class="ui_block ui-block-loader" id="ui_block">
      <div
        :style="{
          margin: 'auto',
          maxHeight: '100%',
        }"
      >
        <div>
          <img src="./assets/loading.gif" alt="" />
        </div>
      </div>
    </div>

    <SideLayout v-if="loggedIn" :collapsed="collapsed"></SideLayout>

    <a-layout>
      <a-layout-header v-if="loggedIn" style="background: #fff; padding: 0">
        <div class="right-header-icon">
          <a-input-search
            placeholder="Search all data..."
            class="header-search-bar"
            @search="onSearch"
          />
          <a-icon class="header-profile-icon" type="user" />
          <a-icon type="logout" @click="logout" />
        </div>
        <a-icon
          class="trigger"
          :type="collapsed ? 'menu-unfold' : 'menu-fold'"
          @click="() => (collapsed = !collapsed)"
        />
      </a-layout-header>

      <a-layout-content
        :style="{
          margin: '24px 16px',
          padding: '24px',
          background: '#fff',
          minHeight: '280px',
        }"
      >
        <router-view />
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>

<script>
import SideLayout from "./components/layout/SideLayout.vue";
import { mapActions, mapState, mapGetters } from "vuex";

export default {
  name: "App",
  data() {
    return {
      collapsed: true,
    };
  },
  components: {
    SideLayout,
  },
  computed: {
    isMobile() {
      return this.windowWidth < 768;
    },
    visibleRoutes() {
      return this.routes.filter((x) => x.meta.header);
    },
    isAdminRoute() {
      return this.$route.meta.isAdmin;
    },
    ...mapState("authentication", {
      user: (state) => state.user,
      loggedIn: (state) => state.status.loggedIn,
    }),
    ...mapGetters("authentication", [
      "isAdmin",
      "isRealEstateAgent",
      "isMortgageAgent",
    ]),
  },
  methods: {
    ...mapActions("authentication", ["logout"]),

    collapseSidebar: () => {
      return !this.collapsed;
    },

    onSearch() {
      console.log("dsd");
    },
  },
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #ff5722;
}

.ui_block.ui-block-loader {
  display: none;
}
.ui-block-loader {
  display: flex;
  align-items: center;
  overflow: auto;
  z-index: 99999;
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: #ffffff87;
}

.ant-table-body {
  overflow: auto;
}

#components-layout-demo-custom-trigger .trigger {
  font-size: 18px;
  line-height: 64px;
  padding: 0 24px;
  cursor: pointer;
  transition: color 0.3s;
  color: #ffffff;
}

#components-layout-demo-custom-trigger .trigger:hover {
  color: #1890ff;
}

#components-layout-demo-custom-trigger .logo {
  background: #ff5722;
  height: 64px;
  padding: 16px;
  color: #fff;
  font-size: 20px;
  font-weight: 600;
  text-align: center;
}
.ant-layout-header {
  background: #ff5722 !important;
}
.trigger .anticon svg {
  color: #ffffff;
}
.ant-form-item {
  margin-bottom: 0px;
}
.right-header-icon {
  color: #ffffff;
  float: right;
  margin-right: 24px;
  font-size: 20px;
}
.header-profile-icon {
  margin-right: 10px;
}
.ant-layout-sider-children {
  height: 100vh;
}
#components-layout-demo-custom-trigger .trigger:hover {
  color: #ffffff;
}
.ant-input-affix-wrapper.header-search-bar {
  width: 300px;
  margin-right: 20px;
}

.btn-radio .ant-radio-wrapper:hover .ant-radio,
.btn-radio .ant-radio:hover .ant-radio-inner,
.btn-radio .ant-radio-input:focus + .ant-radio-inner,
.btn-radio .ant-radio-checked .ant-radio-inner {
  border-color: #ff5722 !important;
}

.btn-radio .ant-radio-inner::after {
  background-color: #ff5722 !important;
}
.btn-radio .ant-radio-checked::after {
  border: 1px solid #ff5722 !important;
}
.ant-table-thead > tr.ant-table-row-hover:not(.ant-table-expanded-row):not(.ant-table-row-selected) > td, 
.ant-table-tbody > tr.ant-table-row-hover:not(.ant-table-expanded-row):not(.ant-table-row-selected) > td, 
.ant-table-thead > tr:hover:not(.ant-table-expanded-row):not(.ant-table-row-selected) > td, 
.ant-table-tbody > tr:hover:not(.ant-table-expanded-row):not(.ant-table-row-selected) > td{
  background: #ff9a7b13 !important;
}

@media only screen and (min-width: 571px) and (max-width: 768px) {
  .ant-input-affix-wrapper.header-search-bar {
    width: 200px;
  }
}
  @media only screen and (min-width: 320px) and (max-width: 570px) {
  .ant-input-affix-wrapper.header-search-bar {
    display: none;
  }
}
</style>
