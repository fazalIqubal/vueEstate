<template>
  <div class="formlayout">
    <a-drawer
      :title="title"
      :visible="visible"
      :body-style="{ paddingBottom: '80px' }"
      @close="() => formCloseHandler()"
      :maskClosable="false"
    >
      <form class="ui form">
        <div>
          <label :class="['required', errorClass('name')]">Name</label>
          <input
            class="input-box"
            :class="['required', errorClass('name')]"
            type="text"
            maxlength="500"
            :value="mortgage.name"
            @input="updateMortgage($event, 'name')"
          />
          <div v-show="submitted && hasErrors" class="invalid-feedback">
            {{ validationErrors["name"] }}
          </div>
        </div>
        <div>
          <label :class="['required', errorClass('type')]">Type</label>
          <a-select
            class="input-dropdown"
            :class="[errorClass('type')]"
            v-model="mortgage.type"
            @change="updateMortgage($event, 'type')"
          >
            <a-select-option
              class="options-dropdowns"
              v-for="type in typeDropdown"
              :key="type.value"
              :value="type.value"
            >
              {{ type.label }}
            </a-select-option>
          </a-select>
        </div>
        <div>
          <label :class="['required', errorClass('preferredLocation')]"
            >Preferred Location</label
          >
          <a-auto-complete
            v-model="mortgage.preferred_location"
            :data-source="preferredLocationDropdown"
            @select="updateMortgage($event, 'preferred_location')"
            @search="onSearch"
            @change="onChange"
          />
          <div v-show="submitted && hasErrors" class="invalid-feedback">
            {{ validationErrors["preferredLocation"] }}
          </div>
        </div>
        <div>
          <label :class="['required', errorClass('budget')]">Budget</label>
          <a-row>
            <a-col :span="12" class="input-left-container">
              <input
                :class="['required', errorClass('budgetMin')]"
                class="input-box-min-max budget-left"
                placeholder="Min"
                type="number"
                min="0"
                :value="mortgage.location_details.budget.min"
                @input="updateMortgage($event, 'min')"
              />
              <div v-show="submitted && hasErrors" class="invalid-feedback">
                {{ validationErrors["budgetMin"] }}
              </div>
            </a-col>
            <a-col :span="12">
              <input
                class="input-box-min-max budget-right"
                :class="['required', errorClass('budgetMax')]"
                placeholder="Max"
                type="number"
                min="0"
                :value="mortgage.location_details.budget.max"
                @input="updateMortgage($event, 'max')"
              />
              <div v-show="submitted && hasErrors" class="invalid-feedback">
                {{ validationErrors["budgetMax"] }}
              </div>
            </a-col>
          </a-row>
          <div v-show="submitted && hasErrors" class="invalid-feedback">
            {{ validationErrors["budget"] }}
          </div>
        </div>
        <div>
          <label :class="['required', errorClass('status')]">Status</label>
          <a-select
            class="input-dropdown"
            v-model="mortgage.status"
            :class="[errorClass('status')]"
            @change="updateMortgage($event, 'status')"
          >
            <a-select-option
              class="options-dropdowns"
              v-for="status in statusDropdown"
              :class="[errorClass('status')]"
              :key="status.value"
              :value="status.value"
            >
              {{ status.label }}
            </a-select-option>
          </a-select>
        </div>
        <div>
          <label :class="['required', errorClass('comment')]">Comments</label>
          <textarea
            class="input-box"
            :class="['required', errorClass('comment')]"
            v-model="mortgage.comment"
            @input="updateMortgage($event, 'comment')"
          >
          </textarea>
          <div v-show="submitted && hasErrors" class="invalid-feedback">
            {{ validationErrors["comment"] }}
          </div>
        </div>
        <div v-if="hasErrors" class="ui error message"></div>
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
        <a-button
          class="orange-button"
          type="primary"
          @click="() => onSubmit()"
        >
          Update
        </a-button>
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
  name: "MortgageEditForm",
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
      preferredLocationDropdown: locationLookup,
    };
  },
  computed: {
    ...mapState("mortgage", {
      mortgage: (state) => state.editMortgage,
      submitted: (state) => state.submitted,
    }),
    ...mapState("authentication", {
      user: (state) => state.user,
    }),
    ...mapGetters("mortgage", ["validationErrors"]),
    hasErrors() {
      return Object.keys(this.validationErrors).length > 0;
    },
  },
  methods: {
    ...mapActions("mortgage", ["updateEditMortgageData", "mortgageSubmitted"]),
    formCloseHandler() {
      this.mortgageSubmitted(false);
      this.onFormClose();
    },
    onSearch(searchText) {
      this.preferredLocationDropdown =
        this.preferredLocationDropdown.length === 0
          ? locationLookup
          : this.preferredLocationDropdown;
      this.preferredLocationDropdown = !searchText
        ? locationLookup
        : this.preferredLocationDropdown.filter((place) =>
            place.toLowerCase().startsWith(searchText.toLowerCase())
          );
    },
    onSelect(value) {
      console.log("onSelect", value);
    },
    onChange(value) {
      console.log("onChange", value);
    },
    updateMortgage(e, property) {
      const value = property === "preferred_location" ? e : e.target.value;
      this.updateEditMortgageData({ prop: property, value: value });
    },
    onSubmit() {
      this.mortgageSubmitted(true);
      if (!this.hasErrors) {
        (this.mortgage.action = this.user.role),
          this.onFormSubmit(this.mortgage);
      }
    },
    errorClass(name) {
      return this.validationErrors[name] ? ["error"] : "";
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

.ant-select-auto-complete.ant-select .ant-input {
  margin-top: 6px;
  margin-bottom: 10px;
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
.required.error.input-box-min-max {
  border-color: red;
}
.ant-layout-content .formlayout {
  padding: 24px !important;
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
.budget-left {
  margin-right: 5px;
}
.budget-right {
  margin-left: 5px;
}
.ant-drawer-content-wrapper {
  width: 40% !important;
}
.orange-button {
  background-color: #ff5722;
  border-color: #ff5722;
  color: #ffffff;
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
.ant-btn.active,
.ant-btn:active {
  border-color: #ff5722;
  color: #ff5722;
}
.ant-btn:focus,
.ant-btn:hover {
  border-color: #ff5722;
  color: #ff5722;
}
.cancel-btn:hover,
.cancel-btn:active,
.cancel-btn:focus {
  color: #ff5722 !important;
  border-color: #ff5722 !important;
  background-color: #ffffff !important;
}
.ant-btn:focus,
.ant-btn:hover {
  border-color: #ff5722;
  color: #ffffff;
  background-color: #ff5722;
}
.list {
  color: red;
}
.input-dropdown {
  width: 100%;
  border-width: 1px;
  margin-top: 6px;
  margin-bottom: 10px;
}
.options-dropdowns:hover,
.options-dropdowns:focus,
.options-dropdowns:active {
  background-color: #ffc0ad41 !important;
}
.ant-select-dropdown-menu-item:hover:not(.ant-select-dropdown-menu-item-disabled) {
  background-color: #ffc0ad41 !important;
}
@media only screen and (min-width: 320px) and (max-width: 400px) {
  .ant-drawer-content-wrapper {
    width: 100% !important;
  }
}
@media only screen and (min-width: 401px) and (max-width: 768px) {
  .ant-drawer-content-wrapper {
    width: 80% !important;
  }
}
</style>
