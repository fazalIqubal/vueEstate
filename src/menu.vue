<template>
  <a-layout class="layout left-menu">
    <a-menu theme="dark" mode="inline">
      <!-- <a-menu-item key="1" @click="navigate('home')">
        <a-icon type="home" />
        <span class="manu-taxt">Home</span>
      </a-menu-item> -->

      <a-menu-item v-if="isRealEstateAgent" key="2" @click="navigate('clients')">
        <a-icon type="team" />
        <span class="manu-taxt">My Clients</span>
      </a-menu-item>
      <a-menu-item v-if="isRealEstateAgent" key="3" @click="navigate('report')">
        <a-icon type="file-text" />
        <span class="manu-taxt">Report</span>
      </a-menu-item>

      <a-menu-item v-if="isMortgageAgent" key="4" @click="navigate('mortgage')">
        <a-icon type="bank" />
        <span class="manu-taxt">Mortgage Clients</span>
      </a-menu-item>
    </a-menu>
  </a-layout>
</template>

<script>
import { mapActions, mapState, mapGetters } from "vuex";
import router from "./router";

export default {
  name: "menu",
  props: {},
  computed: {
    ...mapGetters("authentication", [
      "isAdmin",
      "isRealEstateAgent",
      "isMortgageAgent",
    ]),
  },
  methods: {
    navigate: (route) => {
      router.push(`/${route}`);
    },
  },
};
</script>