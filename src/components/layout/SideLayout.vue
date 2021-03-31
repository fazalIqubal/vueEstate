<template>
  <a-layout-sider
    class="left-menu"
    v-model="collapsed"
    :trigger="null"
    collapsible
  >
    <div class="logo">LOGO</div>
    <Menu></Menu>
  </a-layout-sider>
</template>

<script>
import Menu from "../../menu";

export default {
  name: "SideLayout",
  props: {
    collapsed: {
      type: Boolean,
      required: true,
    },
  },
  components: {
    Menu,
  },
};
</script>
<style>
.manu-taxt {
  color: #000000;
  font-weight: 600;
}
.left-menu .ant-menu-dark .ant-menu-item-selected .anticon + span {
  color: #000000;
}
.left-menu.ant-layout-sider {
  background: #e6e6e6;
}
.left-menu .ant-menu-dark {
  background: #e6e6e6;
}
.ant-layout-sider .anticon svg {
  color: #282828;
  font-size: 20px;
  position: relative;
  top: 2px;
}
.left-menu a:hover {
  color: #282828;
}
.left-menu a {
  color: #282828;
  font-weight: 600;
}
.left-menu .ant-menu.ant-menu-dark .ant-menu-item-selected {
  background-color: #ffffff;
  border-right: 4px solid #ff5722;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.08);
}
.left-menu .ant-menu.ant-menu-dark .ant-menu-item:hover {
  background-color: #ffffff;
}
.left-menu .ant-layout-sider-children {
  height: 100vh !important;
}

</style>