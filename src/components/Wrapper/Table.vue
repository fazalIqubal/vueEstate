<template>
  <div>
    <a-button v-if="isEditable" class="editable-add-btn" @click="handleAdd">Add</a-button>
    <a-table :columns="allColumn" :data-source="data" bordered :row-selection="rowSelection">
      <template v-for="col in allColumn" :slot="col.dataIndex" slot-scope="text, record, index">
        <div :key="col.dataIndex">
          <a-input-number
            v-if="record.editable && (col.dataType == 'number' || col.dataType == 'SMALLINT' || col.dataType == 'INTEGER')"
            :value="text"
            @change="e => handleChange(e, index, col.dataIndex)"
          />
          <a-checkbox
            v-else-if="record.editable && col.dataType == 'BOOLEAN'"
            :checked="text"
            @change="e => handleChange(e.target.checked, index, col.dataIndex)"
          />
          <a-date-picker
            v-else-if="record.editable &&( col.dataType == 'date' || col.dataType == 'DATE' || col.dataType == 'TIMESTAMP WITHOUT TIME ZONE')"
            :value="text"
            @change="e => handleChange(e, index, col.dataIndex)"
          />
          <a-input
            v-else-if="record.editable"
            style="margin: -5px 0"
            :value="text"
            @change="e => handleChange(e.target.value, index, col.dataIndex)"
          />
          <template v-else-if="!record.editable && col.dataType == 'image' ">
            <img :src="text" width="70px" />
          </template>
          <template v-else>{{ text }}</template>
        </div>
      </template>
      <template slot="operation" slot-scope="text, record, index">
        <div class="editable-row-operations">
          <span v-if="record.editable">
            <a @click="() => save(index)">Save</a>
            <a-popconfirm title="Sure to cancel?" @confirm="() => cancel(index)">
              <a>Cancel</a>
            </a-popconfirm>
          </span>
          <span v-else>
            <a :disabled="editingKey !== ''" @click="() => edit(index)">Edit</a>
            <a-popconfirm title="Sure to delete record?" @confirm="() => deleteRow(index)">
              <a>Delete</a>
            </a-popconfirm>
          </span>
        </div>
      </template>
      <template slot="action" slot-scope="text, record, index">
        <a class="ant-icon-link" href="javascript:;">
            <a-icon type="mobile" @click="() => smsHandler(index)" /> 
        </a>
        <a-divider type="vertical" />
        <a class="ant-icon-link"  slot-scope="" href="javascript:;">
            <a-icon type="mail" /> 
        </a>
      </template>
      <template slot="linkAction" slot-scope="text, record, index">
        <div class="text-view" @click="() => linkHandler(index)">
          {{text}}
        </div>
      </template>
      <template slot="sideDrawerOpen" slot-scope="text, record, index">
        <div class="text-view" @click="() => handleFormOpen(record)">
          {{text}}
        </div>
      </template>
    </a-table>
  </div>
</template>

<script>
export default {
  name: "Table",
  props: {
    className: String,
    columns: Array,
    dataSource: Array,
    onUpdate: Function,
    onSave: Function,
    onDelete: Function,
    onSelection: Function,
    rowSelectionType: {
      type: String,
      default: "checkbox"
    },
    onSmsHandler: Function,
    onLinkHandler: Function,
    onFormOpen: Function,
    isEnableRowSelection: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      cacheData: [],
      data: [],
      editingKey: "",
      selectedRowKeys: []
    };
  },
  computed: {
    allColumn() {
      let col = [...this.columns];
      col.map(r => {
        (r.scopedSlots = r.scopedSlots ? r.scopedSlots : { customRender: r.dataIndex });
      });
      let editable = col.filter(cl => {
        return cl.editable && cl.editable.toString() == "true";
      });
      if (editable && editable.length > 0) {
        col.push({
          title: "",
          dataIndex: "operation",
          scopedSlots: { customRender: "operation" }
        });
      }

      return col;
    },
    isEditable() {
      let editable = this.columns.filter(cl => {
        return cl.editable && cl.editable.toString() == "true";
      });
      if (editable && editable.length > 0) {
        return true;
      }
      return false;
    },
    rowSelection() {
      if (!this.isEnableRowSelection) {
        return null;
      }
      return {
        type: this.rowSelectionType,
        onChange: (selectedRowKeys, selectedRows) => {
          this.selectedRowKeys = selectedRowKeys;
          this.selectedRows = selectedRows;
          if (this.onSelection) {
            this.onSelection(selectedRows);
          }
        }
      };
    }
  },
  watch: {
    dataSource: function(newData) {
      this.setListData(newData);
    }
  },
  methods: {
    setListData(rows) {
      let results = [];
      for (let i = 0; i < rows.length; i++) {
        results.push({
          key: i,
          ...rows[i]
        });
      }
      this.data = [...results];
      this.cacheData = [...results];
    },

    handleAdd() {
      const { data } = this;
      const newData = {};
      this.data = [newData, ...data];
      this.cacheData = [newData, ...data];
    },

    handleChange(value, index, column) {
      const newData = [...this.data];
      const target = newData[index];
      if (target) {
        target[column] = value;
        this.data = newData;
      }
    },
    edit(index) {
      const newData = [...this.data];
      const target = newData[index];
      this.editingKey = index;
      if (target) {
        target.editable = true;
        this.data = newData;
      }
    },
    deleteRow(index) {
      let newData = [...this.data];
      const target = newData[index];
      newData.splice(index, 1);
      this.data = newData;
      this.cacheData = [...this.data];
      if (this.onDelete) {
        this.onDelete(target);
      }
    },
    save(index) {
      const newData = [...this.data];
      const newCacheData = [...this.cacheData];
      const target = newData[index];
      const targetCache = newCacheData[index];
      if (target && targetCache) {
        delete target.editable;
        this.data = newData;
        Object.assign(targetCache, target);
        this.cacheData = newCacheData;
        this.editingKey = "";
        let pCol = this.columns.find(a => {
          return a.primaryKey == "true";
        });
        let primaryKey = pCol.dataIndex;
        if (target[primaryKey]) {
          if (this.onUpdate) {
            this.onUpdate(target);
          }
        } else {
          if (this.onSave) {
            this.onSave(target);
          }
        }
      }
    },
    cancel(index) {
      const newData = [...this.data];
      const target = newData[index];
      this.editingKey = "";
      if (target) {
        Object.assign(target, this.cacheData[index]);
        delete target.editable;
        this.data = newData;
      }
    },
    smsHandler(index) {
      this.onSmsHandler(this.data[index]);
    },
    linkHandler(index) {
      this.onLinkHandler(this.data[index]);
    },
    handleFormOpen(record) {
      this.onFormOpen(record)
    }
  }
};
</script>

<style scoped>
.editable-row-operations a {
  margin-right: 8px;
}
.text-view:hover{
  color: #ff5722;
  text-decoration: underline;
  cursor: pointer;
}
</style>