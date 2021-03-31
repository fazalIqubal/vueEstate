<template>
  <a-row>
    <a-col :span="24">
      <div class="list-view-heading-box">{{header}}</div>
    </a-col>

    <a-col :span="24">
      <a-list
        v-if="type == 'simple'"
        :footer="footer"
        :size="size"
        :bordered="bordered"
        :data-source="dataSource"
        :item-layout="itemLayout"
      >
        <a-list-item slot="renderItem" slot-scope="item">
          {{ listAllKeyData(item) }}
        </a-list-item>
      </a-list>

      <a-list
        v-if="type == 'meta'"
        :footer="footer"
        :size="size"
        :bordered="bordered"
        :data-source="dataSource"
        :item-layout="itemLayout"
      >
        <a-list-item slot="renderItem" slot-scope="item">
          <a-list-item-meta
            :description="item[description] || otherDescription"
          >
            <a slot="title" :href="item.href">{{
              item[title] || otherTitle
            }}</a>
            <a-avatar slot="avatar" :src="item[avatarUrl] || avatarUrl" />
          </a-list-item-meta>

          <p v-if="otherContent || item[content]">
            {{ otherContent || item[content] }}
          </p>

          <div v-if="contentImage && item[contentImage]" class="img-content">
            <img :src="imageUrl || item[contentImage]" />
          </div>
          <template v-if="actions" slot="actions">
            <span>
              <a-icon type="message" style="margin-right: 8px" />
              <a-icon type="heart" style="margin-right: 8px" />
              <a-icon type="retweet" style="margin-right: 8px" />
            </span>
          </template>
        </a-list-item>
      </a-list>

      <a-list
        v-if="type == 'custom'"
        
        :footer="footer"
        :size="size"
        :bordered="bordered"
        :data-source="dataSource"
        :item-layout="itemLayout"
      >
        <a-list-item slot="renderItem" slot-scope="item">
          <a-list-item-meta :description="item.description">
            <a slot="title" :href="item.href">{{ item.content }}</a>
            <a-avatar slot="avatar" :src="item.image_url" />
          </a-list-item-meta>
        </a-list-item>
      </a-list>
    </a-col>
  </a-row>
</template>

<script>
export default {
  name: "CXLabel",
  props: [
    "className",
    "bordered",
    "columns",
    "dataSource",
    "description",
    "extra",
    "footer",
    "header",
    "image",
    "itemLayout",
    "key",
    "pagination",
    "selectionKeys",
    "size",
    "title",
    "type",
    "actions",
    "otherTitle",
    "avatarUrl",
    "avatar",
    "otherDescription",
    "otherContent",
    "content",
    "contentImage",
  ],
  computed: {},
  methods: {
    listAllKeyData: function (item) {
      let values =
        this.selectionKeys &&
        this.selectionKeys.map((o) => {
          return item[o];
        });
      return (values && values.join(" ")) || "";
    },
  },
};
</script>


<style>
.ant-list-split .ant-list-item {
  background-color: #fff;
  margin: 0 10px;
  padding: 14px 20px;
}
.v-application ul {
  padding-left: 0px !important;
}

.list-view-heading-box {
  border-bottom: 1px solid #e8e8e8;
  background-color: #fff;
  color: #4ec4f2;
  padding: 10px;
  margin: 0 10px;
}
.list-right-containt {
  margin-left: 40px;
  font-size: 20px;
  color: #2c3948;
}
.ant-avatar-image {
  position: relative;
  top: 2px;
}
.ant-avatar {
  width: 40px !important;
  height: 40px !important;
}
.v-application a {
  color: rgb(44, 57, 72) !important;
  font-size: 16px;
}
.ant-list-item-meta-description {
  font-size: 12px !important;
  line-height: 10px !important;
}
.img-content {
  height: 200;
  overflow: "hidden";
  border: "1px solid rgb(204, 204, 204)";
  text-align: "center";
  border-radius: "6px";
  width: "100%";
  background: "#eaedf2";
}
</style>