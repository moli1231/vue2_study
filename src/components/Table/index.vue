<template>
   <div>
      <!-- 头部搜索表单 -->
      <el-form :inline="true" :model="searchParam" class="demo-form-inline">
         <el-form-item v-for="(item, index) in searchList" :key="index" :label="item.labelName">
            <el-input v-model="searchParam[item.param]" v-if="item.searchType == 'input'" :placeholder="item.labelName"></el-input>
            <el-select v-if="item.searchType == 'filterList'" v-model="searchParam[item.param]" :placeholder="item.labelName">
               <el-option :label="filterItem.label" :value="filterItem.value" v-for="(filterItem, filterIndex) in item.filterList" :key="filterIndex"></el-option>
            </el-select>
         </el-form-item>
         <el-button type="primary" @click="getTableData">查询</el-button>
      </el-form>
      <!-- 表格数据，根据传入的参数来判断是否需要选择框、序号等 -->
      <el-radio-group
         :style="{
            width: '100%',
            'margin-top': '10px',
            height: this.$props.height ? this.$props.height : '80%',
         }"
         v-model="selectRow"
         @change="handleRadioGroupChange"
      >
         <el-table
            ref="multipleTable"
            :data="this.$props.data"
            style="font-size: 10px; color: #555555; width: 100%"
            @selection-change="onSelectListChange"
            height="100%"
            border
            :cell-style="ceStyle"
            :header-cell-style="headerStyle"
         >
            <el-table-column :key="0" width="55" fixed="left" align="center" v-if="radio">
               <el-radio slot-scope="scope" :label="scope.row">{{ null }}</el-radio>
            </el-table-column>
            <el-table-column :key="1" type="selection" v-if="select" width="55" align="center"></el-table-column>
            <el-table-column type="index" width="50" label="序号" align="center" fixed="left" :key="2"></el-table-column>
            <template v-for="(column, index) in this.columns">
               <el-table-column v-if="!column.isMerge" :prop="column.param" :key="index + 3" align="center" :label="column.labelName" :width="column.width" :fixed="column.fixed">
                  <div slot-scope="scope" @click="column.cb ? column.cb(scope) : null">
                     <span v-if="!column.filterList">{{ scope.row[column.param] || scope.row[column.param] == "null" ? scope.row[column.param] : "--" }}</span>
                     <span v-else>{{ filterItem(scope.row[column.param], column.filterList).label }}</span>
                  </div>
                  <!-- 合并表头 -->
               </el-table-column>
               <el-table-column :label="column.labelName" align="center" v-else :key="index + 3">
                  <el-table-column
                     v-for="(column_child, index_status) in column.childList"
                     :prop="column_child.param"
                     :width="column_child.width"
                     :label="column_child.labelName"
                     :fixed="column_child.fixed"
                     align="center"
                     :key="index_status"
                  >
                     <div slot-scope="scope" @click="column_child.cb ? column_child.cb(scope) : null">
                        <span
                           :style="{
                              color: filterItem(scope.row[column_child.param], column_child.filterList).color,
                           }"
                           v-if="column_child.filterList"
                        >
                           {{ filterItem(scope.row[column_child.param], column_child.filterList).label }}
                        </span>
                        <span v-else>
                           {{ scope.row[column_child.param] || scope.row[column_child.param] == "null" ? scope.row[column_child.param] : "--" }}
                        </span>
                     </div>
                  </el-table-column>
               </el-table-column>
            </template>
            <slot name="moreColumn"></slot>
         </el-table>
      </el-radio-group>
      <el-pagination
         style="position: absolute; bottom: -50px; right: 40px"
         @size-change="handleSizeChange"
         @current-change="handleCurrentChange"
         background
         :total="total"
         :current-page.sync="searchParam.page"
         :page-size="searchParam.size"
         layout="->,sizes,prev, pager, next, jumper"
      ></el-pagination>
   </div>
</template>

<script>
export default {
   name: "Table",
   props: {
      // 表格高度
      height: {
         type: String,
         require: false,
      },

      //单选radio
      radio: {
         type: Boolean,
         require: false,
      },
      //单选选项发生变化时候调用，参数row
      onRadioChange: {
         type: Function,
         require: false,
      },
      //是否需要选择框
      select: {
         type: Boolean,
         require: false,
      },
      //多选表格数据变化调用，参数rows
      onSelectChange: {
         type: Function,
         require: false,
      },
      //表格数据
      data: {
         type: Array,
         require: false,
      },
      //表单列信息
      columns: {
         type: Array,
         require: false,
      },
      //头部表单样式
      headerCellStyle: {
         type: Object,
         required: false,
      },
      //表单内部表格样式
      cellStyle: {
         type: Object,
         required: false,
      },
      //查询列表数据接口
      handleGetTableData: {
         type: Function,
         required: true,
      },
      //总计多少条
      total: {
         type: Number,
         required: true,
      },
   },
   data() {
      return {
         selectList: [],
         selectRow: {},
         headerStyle: {
            background: "#eeeeee",
            fontWeight: 400,
            color: "#000",
         },
         ceStyle: { height: "45px", color: "#7f7f7f" },
         searchParam: {},
         searchList: null,
         tempSearchParam: { page: 1, size: 10 },
      };
   },
   created() {
      this.searchList = this.columns.filter((item) => !!item.searchType);
      this.searchParam = this.searchList.reduce(
         (acc, key) => {
            console.log(acc, key);
            acc[key.param] = null;
            return acc;
         },
         { page: 1, size: 10 },
      );
      this.getTableData();
   },
   mounted() {
      if (this.headerCellStyle) {
         this.headerStyle = this.headerCellStyle;
      }
      if (this.cellStyle) {
         this.ceStyle = this.cellStyle;
      }
   },

   methods: {
      onSelectListChange(multiples) {
         this.selectList = multiples;
         this.$props.onSelectChange(multiples);
      },
      filterItem(text, type) {
         const item = type.find((k) => k.value === text);
         return item
            ? item
            : {
                 value: null,
                 label: "--",
                 color: "#000",
              };
      },
      handleRadioGroupChange(val) {
         this.$props.onRadioChange(val);
      },
      handleCancelSelect(row, selected) {
         const rowPro = this.$props.data.find((item) => item.xqbm == row.xqbm);
         if (rowPro) this.$refs.multipleTable.toggleRowSelection(rowPro, selected);
      },
      handleSizeChange(val) {
         this.tempSearchParam.size = this.searchParam.size = val;
         this.tempSearchParam.page = this.searchParam.page = 1;
         this.getTableData();
      },
      handleCurrentChange(val) {
         this.tempSearchParam.page = this.searchParam.page = val;
         this.getTableData();
      },
      getTableData() {
         const { page: oldPage, size: oldSize, ...oldRest } = this.tempSearchParam;
         const { page: newPage, size: newSize, ...newRest } = this.searchParam;
         if (JSON.stringify(newRest) != JSON.stringify(oldRest)) {
            this.searchParam.page = 1;
         }
         this.tempSearchParam = JSON.parse(JSON.stringify(this.searchParam));
         this.handleGetTableData(this.tempSearchParam);
      },
   },
};
</script>
<style lang="less" scoped></style>
