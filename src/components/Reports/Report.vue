<template>
  <div class="report-view-container">
    <div class="header-bar-container">
      <div class="welcome-heading">
        <Heading3
          class="top-heading-txt form-heading-txt"
          text="My Reports"
        >
        </Heading3>
      </div>
      <a-row>
        <a-col :sm="{ span: 24 }" 
               :lg="{ span: 12 }">
          <div class="input-box-padding">
            <label :class="['required', errorClass('type')]">Select Report</label>
          <a-select
            class="input-dropdown"
            :class="[errorClass('type')]"
            v-model="reportFilter.type"
            @change="updateReport($event, 'type')"
          >
            <a-select-option
              class="options-dropdowns"
              v-for="type in reportDropdown"
              :key="type.value"
              :value="type.value"
            >
              {{ type.label }}
            </a-select-option>
          </a-select>
          </div>
        </a-col>
      </a-row>
      <a-row>
        <label :class="['required', errorClass('startDate')]">Select Report Period</label>
        <div class="date-box">
          <div>
            <a-col :sm="{ span: 12 }" :lg="{ span: 6 }" class="date-picker-right">
              <a-date-picker class="date-picker-input" 
              v-model="reportFilter.startDate" 
              :class="[errorClass('startDate')]"
              @change="handleStartDate" />
            </a-col>
          </div>
          <div>
            <a-col :sm="{ span: 12 }" :lg="{ span: 6 }" class="date-picker-left">
              <a-date-picker class="date-picker-input"
                v-model="reportFilter.endDate" 
                :class="[ errorClass('endDate')]"
               @change="handleEndDate"
              />
            </a-col>
          </div>
        </div>
      </a-row>
      <a-row>
        <a-col :sm="{ span: 24 }" :lg="{ span: 12 }">
          <div class="button-container">
            <a-button 
              type="primary"
              class="orange-button"
              @click="onSubmit"
            >Submit
            </a-button>
            <a-button class="cancel-btn" @click="onCancel">Cancel</a-button>
          </div>
        </a-col>
      </a-row>
    </div>
  </div>
</template>

<script>
import Heading3 from "../Wrapper/Heading3";
import { mapState, mapActions, mapGetters } from "vuex";
import reportDropdown from "../../shared/reportDropdown";

export default {
  name: "Reports",
  components: {
    Heading3,
  },
  data() {
    return {
      reportDropdown: reportDropdown,
    };
  },
  computed: {
    ...mapState("reports", {
      reportFilter: (state) => state.reportFilter,
    }),

    ...mapGetters("reports", ["validationErrors"]),

    hasErrors() {
      return Object.keys(this.validationErrors).length > 0;
    },
  },
  methods: {
    ...mapActions("reports", [
      "reportSubmitted",
      "getReport",
      "updateReportData",
      "resetReport"
    ]),
    errorClass(name) {
      return this.validationErrors[name] ? ["error"] : "";
    },
    updateReport(e, property) {
      this.updateReportData({ prop: property, value: e.target.value });
    },
    onSubmit() {
      this.reportSubmitted(true);
      if (!this.hasErrors) {
        this.getReport(this.reportFilter);
      }
    },
    handleStartDate(date, dateString) {
      this.updateReportData({ prop: 'startDate', value: dateString });
    },
    handleEndDate(date, dateString) {
      this.updateReportData({ prop: 'endDate', value: dateString });
    },
    onCancel() {
      this.resetReport();
    },
  }
};
</script>

<style>
.report-view-container {
  padding: 20px;
}
.report-view-container .date-picker-input {
  width: 100%;
}
.report-view-container .date-picker-left {
  padding-left: 5px;
}
.report-view-container .date-picker-right {
  padding-right: 5px;
}
.report-view-container .input-box-padding {
  padding-bottom: 10px;
}
.report-view-container .input-box {
  width: 100%;
  padding: 6px 10px;
  border: 1px solid #dcdcdc;
  border-radius: 4px;
  background: transparent;
  border-width: 1px;
  margin-top: 6px;
  margin-bottom: 10px;
}
.report-view-container .input-dropdown {
  width: 100%;
  border-width: 1px;
  margin-top: 6px;
  margin-bottom: 10px;
}

.report-view-container .input-box:focus {
  border-color: #40a9ff;
  border-right-width: 1px !important;
  outline: unset;
}
.report-view-container .button-container {
  width: 100%;
  float: right;
  text-align: right;
  margin: 20px 0;
}
.report-view-container .orange-button {
  background-color: #ff5722;
  border-color: #ff5722;
}
.report-view-container .ant-btn-primary:active,
.ant-btn-primary.active {
  background-color: #ff5722;
  border-color: #ff5722;
  color: #ffffff;
}
.report-view-container .ant-btn-primary:hover,
.report-view-container .ant-btn-primary:focus {
  background-color: #ff5722;
  border-color: #ff5722;
  color: #ffffff;
}
.report-view-container .ant-btn.active,
.report-view-container .ant-btn:active {
  border-color: #ff5722;
  color: #ffffff;
}
.report-view-container .ant-btn:focus,
.report-view-container .ant-btn:hover {
  border-color: #ff5722;
  color: #ffffff;
}
.report-view-container .top-heading-txt {
  font-size: 18px;
  margin-bottom: 20px;
  border-bottom: 1px solid #d6d6d6;
  padding-bottom: 10px;
}
.report-view-container .date-box {
  margin-top: 6px;
  margin-bottom: 10px;
}
.report-view-container .welcome-heading {
  width: 100%;
}
.required::after {
  content: " *";
}
.input-box.required.error {
  border-color: red ;
}
.required.error {
  color: red;
}
.error .ant-calendar-picker-input.ant-input {
  border-color: red;
}
.input-box.error {
  border-color: red;
}
.cancel-btn:hover,.cancel-btn:active,.cancel-btn:focus{
  color:#ff5722 !important;
}
.ant-calendar-selected-day .ant-calendar-date{
  background-color:#ff5722 !important;
  color:#ffffff;
  border-color:#ff5722;
}
.ant-calendar-today .ant-calendar-date{
  color:#000000 !important;
  border-color:#000000 !important;
}
.options-dropdowns:hover, .options-dropdowns:focus, .options-dropdowns:active{
  background-color: #ffc0ad41 !important;
}
.ant-select-dropdown-menu-item:hover:not(.ant-select-dropdown-menu-item-disabled){
  background-color: #ffc0ad41 !important;
}

.report-view-container .required.error.input-dropdown {
  border-color: red;
}
.required.error.input-dropdown {
  border-color: red;
}
.required.error:after {
  color: red;
}
.report-view-container .error.input-dropdown {
  border-color: red;
}
.required.error.input-dropdown .ant-select-selection.ant-select-selection--single{
  border-color: red;
}
.error.input-dropdown .ant-select-selection.ant-select-selection--single{
  border-color: red;
}
@media only screen and (min-width: 320px) and (max-width: 576px) {
.report-view-container .date-picker-right{
  padding-right: unset !important;
  margin-bottom: 10px;
}
.report-view-container .date-picker-left{
  padding-left: unset !important;
}

}
</style>