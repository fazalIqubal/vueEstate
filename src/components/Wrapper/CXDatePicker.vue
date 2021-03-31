<template>
  <a-date-picker
    :placeholder="placeholder"
    :name="name"
    :class="[className,'cx-date-picker']"
    @change="dateChange"
  />
</template>

<script>
export default {
  name: "CXDatePicker",
  props: ["className", "inpuDateChange", "value", "name", "placeholder"],
  methods: {
    dateChange(file) {
      if (this.inpuDateChange) {
        this.inpuDateChange(this.name, file);
      }
    }
  }
};
</script>
<style>
.cx-date-picker {
  width: 100%;
}
</style>
