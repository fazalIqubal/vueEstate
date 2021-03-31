<template>
  <div class="client-view-container">
    <div class="header-bar-container">
      <div class="welcome-heading">
        <Heading3
          class="top-heading-txt"
          text="Welcome Mr. Lamba. Continue working with your clients from below list."
        ></Heading3>
      </div>
      <div class="client-form-txt">
        <!-- <router-link :to= "{name:'ClientForm'}">
       new form
     </router-link> -->
        <span
          ><router-link to="clientForm">
            <a-icon type="user-add" class="new-client-icon" /><span
              class="add-user-txt"
              >Add New Client</span
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
            :data-source="clients"
            :onSmsHandler="smsHandler"
            :onLinkHandler="linkHandler"
            :onFormOpen="formOpenHandler"
            :isEnableRowSelection="false"
          >
          </Table>
        </div>
      </a-col>
    </a-row>
    <ClientEditForm
      :visible="editFormVisible"
      title="Edit Client Form"
      :onFormClose="formCloseHandler"
      :onFormSubmit="handleFormSubmit"
    />
  </div>
</template>

<script>
import Heading3 from "../Wrapper/Heading3";
import Table from "../Wrapper/Table";
import { mapState, mapActions, mapGetters } from "vuex";
import ClientEditForm from "./ClientEditForm.vue";

export default {
  name: "Clients",
  components: {
    Heading3,
    Table,
    ClientEditForm,
  },
  data() {
    return {
      columns: [
        {
          title: "Name",
          dataIndex: "name",
          key: "name",
          width: "14%",
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
            console.log(row);
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
          title: "Prefered Location",
          dataIndex: "preferred_location",
          key: "preferred_location",
          width: "14%",
          customRender: (text, row, index) => {
            // return <span>{row.location_details.preferred_location}</span>;
            return (
              <span>
                {row.location_details &&
                  row.location_details.preferred_location
                    .charAt(0)
                    .toUpperCase() +
                    row.location_details.preferred_location.slice(1)}
              </span>
            );
          },
          sorter: (a, b) => {
            return (
              a.location_details &&
              a.location_details.preferred_location
                .toLowerCase()
                .localeCompare(
                  b.location_details.preferred_location.toLowerCase()
                )
            );
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
                2
              ).localeCompare(
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
          customRender: (text, row, index) => {
            // return <span>{row.location_details.preferred_location}</span>;
            return (
              <span>
                {row.status.charAt(0).toUpperCase() + row.status.slice(1)}
              </span>
            );
          },
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
  computed: {},
  methods: {
    ...mapActions("clients", [
      "getAll",
      "setEditClient",
      "updateClient",
      "clientSubmitted",
    ]),

    smsHandler(data) {
      console.log(data);
      alert("mail has been sent");
    },

    linkHandler(data) {
      console.log(data);
      alert("mail has been sent");
    },

    formOpenHandler(client) {
      let editClient = JSON.parse(JSON.stringify(client));
      client.type = client.type.toLowerCase();
      client.status = client.status.toLowerCase();

      if (typeof client.budget === "string") {
        client.budget = parseFloat(client.budget.substring(1));
      }
      this.selectedClientData = client;
      this.setEditClient(editClient);
      this.editFormVisible = true;
    },

    formCloseHandler() {
      this.clientSubmitted(false);
      this.editFormVisible = false;
      console.log("Close Handler");
    },

    handleFormSubmit(clientData) {
      this.updateClient(clientData).then((suc) => {
        this.editFormVisible = false;
      });
    },
  },

  computed: {
    ...mapState("clients", {
      clients: (state) =>
        (state.all.items && state.all.items.length && state.all.items) || [],
      statusList: (state) => state.all.statusDropdown,
    }),
  },
  created() {
    //this.$store.dispatch("users/getAll");
    this.getAll();
  },
};
</script>

<style>
.ant-layout-content {
  margin: 0px !important;
  padding: 24px 0 !important;
}
.ant-icon-link {
  color: black;
}
.client-view-container
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
.client-view-container .ant-table-thead > tr > th,
.client-view-container .ant-table-tbody > tr > td {
  padding: 8px 8px;
  overflow-wrap: break-word;
}

.client-view-container .top-heading-txt {
  font-size: 18px;
  margin-bottom: 10px;
  margin-left: 12px;
}
.client-view-container .header-bar-container {
  width: 100%;
  display: inline-block;
}
.client-view-container .welcome-heading {
  display: inline-block;
}
.client-view-container .client-form-txt {
  display: inline-block;
  float: right;
  margin-right: 20px;
}
.client-view-container .new-client-icon {
  font-size: 18px;
  margin-right: 6px;
  color: #ff5722;
}
.client-view-container .ant-table-pagination.ant-pagination {
  margin: 16px 10px 16px 10px;
}
.client-view-container .add-user-txt {
  color: #ff5722;
}
.client-view-container .ant-pagination-item-active a {
  color: #ff5722;
}
.client-view-container .ant-pagination-item-active {
  border-color: #ff5722;
}
.client-view-container .ant-table-header-column {
  position: relative;
  display: inline-block;
  width: 100%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.client-view-container .ant-table-tbody > tr > td > div {
  position: relative;
  display: inline-block;
  width: 95%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.client-view-container .ant-divider,
.client-view-container .ant-divider-vertical {
  width: 1px !important;
}
.client-view-container
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
  .client-view-container .top-heading-txt {
    position: relative;
    display: inline-block;
    width: 350px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
}
@media only screen and (min-width: 512px) and (max-width: 768px) {
  .client-view-container .top-heading-txt {
    position: relative;
    display: inline-block;
    width: 150px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
}
@media only screen and (min-width: 320px) and (max-width: 511px) {
  .client-view-container .top-heading-txt {
    position: relative;
    display: inline-block;
    width: 100px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
}
</style>