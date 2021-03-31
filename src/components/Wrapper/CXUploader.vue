<template>
  <a-upload-dragger
    name="file"
    :multiple="true"
    :action="action"
    @change="handleChange"
    :before-upload="beforeUpload"
  >
    <p class="ant-upload-drag-icon">
      <a-icon type="inbox" />
    </p>
    <p class="ant-upload-text">Click or drag file to this area to upload</p>
    <p class="ant-upload-hint">
      Support for a single or bulk upload. Strictly prohibit from uploading company data or other
      band files
    </p>
  </a-upload-dragger>
</template>

<script>
export default {
  name: "CXUploader",
  props: {
    className: String,
    accept: String,
    action: String,
    method: String,
    manual: Boolean,
    onChangeFile: Function,
    name: String
  },
  methods: {
    handleChange(info) {
      const status = info.file.status;
      if (status !== "uploading") {
        console.log(info.file, info.fileList);
      }
      if (status === "done") {
        this.$message.success(`${info.file.name} file uploaded successfully.`);
      } else if (status === "error") {
        this.$message.error(`${info.file.name} file upload failed.`);
      }
    },
    beforeUpload(file) {
      if (this.manual && this.onChangeFile) {
        this.onChangeFile(this.name , file);
        return false;
      }
    }
  }
};
</script>