<template>
  <div :class="[className]">
    <div class="line-container-output"></div>
  </div>
</template>

<script>
import { Line, Bar, Pie } from "@antv/g2plot";
import axios from "axios";
export default {
  name: "LineChart",
  props: [
    "className",
    "chart_info",
    "columns",
    "data",
    "params",
    "tablename",
    "url",
  ],
  mounted() {
    if (this.url) {
      let chart_info = this.chart_info;
      let tablename = this.tablename;
      let container = this.$el.getElementsByClassName("line-container-output");
      axios({
        url: this.url,
        data: this.params,
        method: "POST",
      }).then(
        (res) => {
          if (res.data.data && res.data.data && res.data.data[tablename]) {
            let linePlot = new Pie(container[0], {
              data: res.data.data[tablename],
              angleField: chart_info.xField,
              colorField: chart_info.yField,
              radius: 0.8,
              label: {
                type: "inner",
                offset: "-0.5",
                // content: '{name} {percentage}',
                style: {
                  fill: "#fff",
                  fontSize: 14,
                  textAlign: "center",
                },
              },
            });
            linePlot.render();
          }
        },
        (error) => {}
      );
    }
  },
};
</script>
<style scoped>
.line-container-output {
  min-height: 200px;
}
</style>