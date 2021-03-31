<template>
  <div>
    <Heading1 text="Hello"></Heading1>
    <Table :columns="columns" :data="users"></Table>
  </div>
</template>

<script>
import Heading1 from "../Wrapper/Heading1";
import Table from "../Wrapper/Table";
import { mapState, mapActions, mapGetters } from "vuex";

const columns = [
  {
    title: "Name",
    dataIndex: "login",
    key: "login",
    scopedSlots: { customRender: "login" }
  },
  {
    title: "Image",
    dataIndex: "avatar_url",
    key: "avatar_url",
    width: 120
  },
  {
    title: "Repos Url",
    dataIndex: "repos_url",
    key: "repos_url 1",
    ellipsis: true
  }
];

export default {
  name: "Dashboard",
  components: {
    Heading1,
    Table
  },
  data() {
    return {
      columns
    };
  },
  methods: {
    ...mapActions("users", ["getAll"])
  },
  computed: {
    // users() {
    //   return this.$store.state.users.all.items;
    // },

    ...mapState("users", {
      users: state => state.all.items
    })
  },
  created() {
    //this.$store.dispatch("users/getAll");
    this.getAll();
  }
};
</script>