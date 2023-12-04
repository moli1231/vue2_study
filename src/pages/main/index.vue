<template>
   <div>
      这是页面主页
      <el-table
         :data="tableData"
         border
         height="580"
         style="width: 100%"
         scroll
         :header-cell-style="{
            background: '#f7f7fa',
            color: '#000',
         }"
      >
         <el-table-column type="index" label="序号" width="50" :key="1" :fixed="'left'"></el-table-column>
         <el-table-column v-for="(item, index) in tableColumnList" :prop="item.prop" :label="item.label" :key="index + 2" width="170px">
            <template slot-scope="scope">
               <template v-if="item.prop == 'first'">
                  <div style="height: 100%; width: 100%" @click="editClick(scope.row)" v-if="!scope.row['isShow']">
                     {{ scope.row[item.prop] }}
                  </div>
                  <el-input v-if="scope.row['isShow']" :key="`${scope.row.id}${scope.$index}`" :ref="`input${scope.row.id}`" type="number" v-model="scope.row[item.prop]"></el-input>
               </template>
               <span v-else style="color: black" :ref="`span${scope.row.id}3`">
                  {{ scope.row[item.prop] }}
               </span>
            </template>
         </el-table-column>
      </el-table>
   </div>
</template>

<script>
export default {
   name: "MainPage",
   props: {},
   data() {
      return {
         tableData: [
            {
               id: 111,
               first: "200",
               second: "200",
            },
            {
               id: 222,
               first: "330",
               second: "450",
            },
         ],
         tableColumnList: [
            {
               prop: "first",
               label: "测试数据1",
            },
            {
               prop: "second",
               label: "测试数据2",
            },
         ],
      };
   },

   methods: {
      editClick(row) {
         row.isShow = true;
         this.tableData = JSON.parse(JSON.stringify(this.tableData));
         this.$nextTick(() => {
            console.log(this.$refs);
         });
      },
      labelClick(row) {
         row.isShow = true;
         this.tableData = JSON.parse(JSON.stringify(this.tableData));
         // this.$nextTick(() => {
         console.log(this.$refs[`input${row.id}2`]);
         // });
      },
   },
};
</script>
<style lang="less" scoped></style>
