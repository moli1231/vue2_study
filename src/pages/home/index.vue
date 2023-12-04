<template>
   <Table
      style="position: relative"
      :select="true"
      :radio="false"
      :data="tableData"
      :total="total"
      :columns="tableColumn"
      :headerCellStyle="{
         background: '#F5F7FA',
         fontWeight: 400,
         color: '#000000b3',
      }"
      :cellStyle="{ background: '#fff', color: '#000000e6' }"
      :onSelectChange="(rows) => onSelectListChange(rows)"
      :handleGetTableData="(param) => handleGetTableData(param)"
   >
      <el-table-column width="160" label="操作" slot="moreColumn" align="center" fixed="right" :key="tableColumn.length + 3">
         <el-button type="text">测试按钮</el-button>
      </el-table-column>
   </Table>
</template>

<script>
import Flex from "@/components/Flex";
import Table from "@/components/Table";
export default {
   name: "HomePage",
   components: { Flex, Table },
   data() {
      return {
         tableData: [
            {
               date: "2016-05-02",
               name: "王小虎",
               address: "上海市普陀区金沙江路 1518 弄",
               zt: 1,
               firstHobby: "哈哈",
               secondHobby: "asd",
            },
            {
               date: "2016-05-04",
               name: "王小虎",
               address: "上海市普陀区金沙江路 1517 弄",
               zt: 3,
               firstHobby: "哈哈",
               secondHobby: "asd",
            },
            {
               date: "2016-05-01",
               name: "王小虎",
               address: "上海市普陀区金沙江路 1519 弄",
               zt: 2,
               firstHobby: "哈哈",
               secondHobby: "asd",
            },
            {
               date: "2016-05-03",
               name: "王小虎",
               address: "上海市普陀区金沙江路 1516 弄",
               zt: 1,
               firstHobby: "哈哈",
               secondHobby: "asd",
            },
         ],
         tableColumn: [
            {
               labelName: "生日",
               param: "date",
            },
            {
               labelName: "姓名",
               param: "name",
               fixed: "left",
               searchType: "input",
               cb: (scope) => console.log(scope.$index),
            },
            {
               labelName: "爱好",
               param: "hobby",
               color: "#6babfc",
               isMerge: true,
               childList: [
                  {
                     labelName: "爱好1",
                     param: "firstHobby",
                     color: "#6babfc",
                     cb: (scope) => console.log(scope),
                  },
                  {
                     labelName: "爱好2",
                     param: "secondHobby",
                     color: "#6babfc",
                     cb: (scope) => console.log(scope),
                  },
               ],
            },
            {
               labelName: "状态",
               param: "zt",
               searchType: "filterList",
               filterList: [
                  {
                     value: 1,
                     label: "测试状态一",
                     color: "#c4c4c4",
                  },
                  {
                     value: 2,
                     label: "测试状态二",
                     color: "#facd91",
                  },
               ],
               width: 80,
            },
         ],
         total: 0,
      };
   },
   created() {},
   methods: {
      handleGetTableData(param) {
         console.log("param", param);
      },
      onSelectListChange(rows) {
         console.log("rows", rows);
      },
   },
};
</script>
<style lang="less" scoped></style>
