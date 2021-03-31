<template>
  <div class="mortgage-view-container">
    <div class="header-bar-container">
      <div class="welcome-heading">
        <Heading3
          class="top-heading-txt"
          text="Welcome Mr. Lamba. Continue working with your clients from below list."
        ></Heading3>
      </div>
      <div class="client-form-txt">
        <span
          ><router-link to="mortgageForm"
            ><a-icon type="user-add" class="new-client-icon" /><span
              class="add-user-txt"
              >My Mortgage Clients</span
            ></router-link
          ></span
        >
      </div>
    </div>
    <a-row>
      <a-col :span="24">
        <div class="table-view-layout">
          <Table
            :columns="columns"
            :data-source="mortgages"
            :onSmsHandler="smsHandler"
            :onLinkHandler="linkHandler"
            :onFormOpen="formOpenHandler"
            :isEnableRowSelection="false"
          >
          </Table>
        </div>
      </a-col>
    </a-row>
    <MortgageEditForm
      :visible="editFormVisible"
      title="Edit client Form"
      :onFormClose="formCloseHandler"
      :onFormSubmit="handleFormSubmit"
    />
  </div>
</template>

<script>
import MortgageEditForm from "../Mortgage/MortgageEditForm";
import Heading3 from "../Wrapper/Heading3";
import Table from "../Wrapper/Table";
import { mapState, mapActions, mapGetters } from "vuex";

export default {
  name: "Mortgage",
  components: {
    Heading3,
    Table,
    MortgageEditForm,
  },
  data() {
    return {
      columns: [
        {
          title: "Name",
          dataIndex: "name",
          key: "name",
          width: "14%",
          class: "text-view",
          scopedSlots: {
            customRender: "linkAction",
            customRender: "sideDrawerOpen",
          },
          sorter: (a, b) =>
            a.name.toLowerCase().localeCompare(b.name.toLowerCase()),
          sortDirections: ["descend", "ascend", "descend"],
        },
        {
          title: "Type",
          dataIndex: "type",
          key: "type",
          width: "14%",
          customRender: (text, row, index) => {
            return (
              <span>
                {row.type.charAt(0).toUpperCase() + row.type.slice(1)}
              </span>
            );
          },
          sorter: (a, b) =>
            a.type.toLowerCase().localeCompare(b.type.toLowerCase()),
          sortDirections: ["descend", "ascend", "descend"],
        },
        {
          title: "preferred Location",
          dataIndex: "preferred_location",
          key: "preferred_location",
          width: "14%",
          customRender: (text, row, index) => {
            // return <span>{row.location_details.preferred_location}</span>;
            return (
              <span>
                {row.preferred_location.charAt(0).toUpperCase() +
                  row.preferred_location.slice(1)}
              </span>
            );
          },
          sorter: (a, b) => {
            return a.preferred_location
              .toLowerCase()
              .localeCompare(b.preferred_location.toLowerCase());
          },
          sortDirections: ["descend", "ascend", "descend"],
        },
        {
          title: "Budget",
          dataIndex: "budget",
          key: "budget",
          width: "14%",
          customRender: (text, row, index) => {
            return (
              <span>
                {row.location_details &&
                  row.location_details.budget &&
                  `min-${row.location_details.budget.min} - max-${row.location_details.budget.max}`}
              </span>
            );
          },
          sorter: (a, b) => {
            if (a.location_details && a.location_details.budget) {
              return (
                (a.location_details.budget.min +
                  a.location_details.budget.max) /
                  2 -
                (b.location_details.budget.min +
                  b.location_details.budget.max) /
                  2
              );
            }
          },
          sortDirections: ["descend", "ascend", "descend"],
        },
        {
          title: "Status",
          dataIndex: "status",
          key: "status",
          width: "14%",
          sorter: (a, b) =>
            a.status.toLowerCase().localeCompare(b.status.toLowerCase()),
          sortDirections: ["descend", "ascend", "descend"],
        },
        {
          title: "Action",
          dataIndex: "action",
          class: "action-btn",
          width: "14%",
          scopedSlots: { customRender: "action" },
          // customRender: (text, row, index) => {
          // return <div >adsdsad</div>;
          // },
        },
        {
          title: "Comments",
          dataIndex: "comment",
          key: "comment",
          width: "16%",
          sorter: (a, b) =>
            a.comment.toLowerCase().localeCompare(b.comment.toLowerCase()),
          sortDirections: ["descend", "ascend", "descend"],
        },
      ],
      editFormVisible: false,
    };
  },
  computed: {
    ...mapState("mortgage", {
      mortgages: (state) => state.all.items,
      statusList: (state) => state.all.statusDropdown,
    }),
    ...mapState("authentication", {
      user: (state) => state.user,
    }),
  },
  created() {
    //this.$store.dispatch("users/getAll");
    this.getAll();
  },
  methods: {
    ...mapActions("mortgage", [
      "getAll",
      "setEditMortgage",
      "updateMortgage",
      "mortgageSubmitted",
    ]),

    smsHandler(data) {
      console.log(data);
      alert("mail has been sent");
    },

    linkHandler(data) {
      console.log(data);
      alert("mail has been sent");
    },

    formOpenHandler(mortgage) {
      let editMortgage = JSON.parse(JSON.stringify(mortgage));
      mortgage.type = mortgage.type.toLowerCase();
      if (mortgage && mortgage.status) {
        mortgage.status = mortgage.status.toLowerCase();
      }
      if (typeof mortgage.budget === "string") {
        mortgage.budget = parseFloat(mortgage.budget.substring(1));
      }
      if (
        editMortgage.location_details &&
        editMortgage.location_details.length < 1
      ) {
        editMortgage.location_details.budget = {
          min: "",
          max: "",
        };
      }

      this.selectedMortgageData = mortgage;

      this.mortgageSubmitted(true);
      this.setEditMortgage(editMortgage);
      this.editFormVisible = true;
    },

    formCloseHandler() {
      this.editFormVisible = false;
      console.log("Close Handler");
    },

    handleFormSubmit(mortgageData) {
      this.updateMortgage(mortgageData).then((suc) => {
        this.editFormVisible = false;
      });
    },
  },
};
</script>

<style>
.ant-layout-content {
  margin: 0px !important;
  padding: 24px 0 !important;
}
.mortgage-formlayout {
  padding: 20px;
}
.mortgage-view-container .ant-icon-link {
  color: black;
}
.mortgage-view-container
  .ant-table-thead
  > tr
  > th
  .ant-table-header-column
  .ant-table-column-sorters
  > *:not(.ant-table-column-sorter) {
  position: relative;
  display: inline-block;
  width: 98%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.mortgage-view-container .ant-table-thead > tr > th,
.ant-table-tbody > tr > td {
  padding: 8px 8px;
  overflow-wrap: break-word;
}
.mortgage-view-container .text-view:hover {
  color: #ff5722;
  text-decoration: underline;
  cursor: pointer;
}
.mortgage-view-container .top-heading-txt {
  font-size: 18px;
  margin-bottom: 10px;
  margin-left: 12px;
}
.mortgage-view-container .header-bar-container {
  width: 100%;
  display: inline-block;
}
.mortgage-view-container .welcome-heading {
  display: inline-block;
}
.mortgage-view-container .client-form-txt {
  display: inline-block;
  float: right;
  margin-right: 20px;
}
.mortgage-view-container .new-client-icon {
  font-size: 18px;
  margin-right: 6px;
  color: #ff5722;
}
.mortgage-view-container .add-user-txt {
  color: #ff5722;
}
.mortgage-view-container .ant-pagination-item-active {
  border-color: #ff5722;
}
.mortgage-view-container .ant-pagination-item-active a {
  color: #ff5722;
}
.mortgage-view-container .ant-table-pagination.ant-pagination {
  margin: 16px 10px 16px 10px;
}
.mortgage-view-container .ant-table-header-column {
  position: relative;
  display: inline-block;
  width: 100%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.mortgage-view-container .ant-table-tbody > tr > td > div {
  position: relative;
  display: inline-block;
  width: 95%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.mortgage-view-container .ant-divider,
.ant-divider-vertical {
  width: 1px !important;
}
.mortgage-view-container
  .ant-table-thead
  > tr
  > th
  .ant-table-header-column
  .ant-table-column-sorters {
  width: 100%;
}
.ant-table-thead
  > tr
  > th
  .ant-table-column-sorter
  .ant-table-column-sorter-inner
  .ant-table-column-sorter-up.on,
.ant-table-thead
  > tr
  > th
  .ant-table-column-sorter
  .ant-table-column-sorter-inner
  .ant-table-column-sorter-down.on {
  color: #ff5722;
}
.action-btn a:active {
  color: #ff5722;
}
.action-btn a:hover {
  color: #ff5722;
}

@media only screen and (min-width: 768px) and (max-width: 1000px) {
  .mortgage-view-container .top-heading-txt {
    position: relative;
    display: inline-block;
    width: 350px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
}
@media only screen and (min-width: 512px) and (max-width: 768px) {
  .mortgage-view-container .top-heading-txt {
    position: relative;
    display: inline-block;
    width: 150px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
}
@media only screen and (min-width: 320px) and (max-width: 768px) {
  .mortgage-view-container .top-heading-txt {
    position: relative;
    display: inline-block;
    width: 200px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
}
</style>