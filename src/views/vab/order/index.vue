<template>
  <div class="table-container">
    <vab-query-form>
      <vab-query-form-left-panel>
        <el-button
          icon="el-icon-plus"
          type="primary"
          @click="handleCreateOrder"
        >
          创建订单
        </el-button>
      </vab-query-form-left-panel>
      <vab-query-form-right-panel>
        <el-form
          ref="form"
          :model="queryForm"
          :inline="true"
          @submit.native.prevent
        >
          <el-form-item>
            <el-input v-model="queryForm.title" placeholder="标题" />
          </el-form-item>
          <el-form-item>
            <el-button
              icon="el-icon-search"
              type="primary"
              native-type="submit"
              @click="handleQuery"
            >
              查询
            </el-button>
          </el-form-item>
        </el-form>
      </vab-query-form-right-panel>
    </vab-query-form>

    <el-table
      ref="tableSort"
      v-loading="listLoading"
      :element-loading-text="elementLoadingText"
      :height="height"
      :data="list"
      @selection-change="setSelectRows"
      @sort-change="tableSortChange"
    >
      <el-table-column
        show-overflow-tooltip
        type="selection"
        width="55"
      ></el-table-column>
      <el-table-column
        v-if="false"
        show-overflow-tooltip
        label="guestRoomId"
        prop="guestRoomId"
      ></el-table-column>
      <el-table-column
        v-if="false"
        show-overflow-tooltip
        label="订单id"
        prop="orderId"
      ></el-table-column>
      <el-table-column
        show-overflow-tooltip
        label="订单编号"
        prop="orderNum"
        width="55"
      ></el-table-column>
      <el-table-column
        show-overflow-tooltip
        prop="orderName"
        label="用户"
        width="80"
      ></el-table-column>
      <el-table-column
        show-overflow-tooltip
        prop="storeName"
        label="店名"
        width="100"
      ></el-table-column>
      <el-table-column
        show-overflow-tooltip
        prop="roomNum"
        label="客房id"
      ></el-table-column>
      <el-table-column
        show-overflow-tooltip
        label="订单金额"
        prop="totalAmount"
      ></el-table-column>
      <el-table-column show-overflow-tooltip label="入住状态">
        <template #default="{ row }">
          <el-tooltip
            :content="row.registerStatusString"
            class="item"
            effect="dark"
            placement="top-start"
          >
            <el-tag
              v-if="row.registerStatus === 0"
              type="warning"
              size="medium"
            >
              {{ row.registerStatusString }}
            </el-tag>
            <el-tag
              v-if="row.registerStatus === 1"
              type="success"
              size="medium"
            >
              {{ row.registerStatusString }}
            </el-tag>
            <el-tag
              v-if="row.registerStatus === 2"
              type="success"
              size="medium"
            >
              {{ row.registerStatusString }}
            </el-tag>
          </el-tooltip>
        </template>
      </el-table-column>
      <el-table-column
        show-overflow-tooltip
        label="预计入住日期"
        prop="predictStartTime"
      ></el-table-column>
      <el-table-column
        show-overflow-tooltip
        label="预计退房日期"
        prop="predictEndTime"
      ></el-table-column>
      <el-table-column
        show-overflow-tooltip
        label="实际入住日期"
        prop="actualStartTime"
      ></el-table-column>
      <el-table-column
        show-overflow-tooltip
        label="实际退房日期"
        prop="actualEndTime"
      ></el-table-column>
      <el-table-column show-overflow-tooltip label="支付类型" prop="payType">
        <template #default="{ row }">
          <el-tooltip
            :content="row.payTypeName"
            class="item"
            effect="dark"
            placement="top-start"
          >
            <el-tag type="success" size="medium">
              {{ row.payTypeName }}
            </el-tag>
          </el-tooltip>
        </template>
      </el-table-column>
      <el-table-column show-overflow-tooltip label="支付方式" prop="payWay">
        <template #default="{ row }">
          <el-tooltip
            :content="row.payWayName"
            class="item"
            effect="dark"
            placement="top-start"
          >
            <el-tag type="success" size="medium">
              {{ row.payWayName }}
            </el-tag>
          </el-tooltip>
        </template>
      </el-table-column>
      <el-table-column show-overflow-tooltip label="订单状态">
        <template #default="{ row }">
          <el-tooltip
            :content="row.orderStatusName"
            class="item"
            effect="dark"
            placement="top-start"
          >
            <el-tag type="success" size="medium">
              {{ row.orderStatusName }}
            </el-tag>
          </el-tooltip>
        </template>
      </el-table-column>
      <el-table-column
        show-overflow-tooltip
        label="创建时间"
        prop="createTime"
        width="50px"
      ></el-table-column>
      <el-table-column show-overflow-tooltip label="操作" width="180px">
        <template #default="{ row }">
          <el-button type="text" @click="handleEditOrder(row)">修改</el-button>
          <el-button type="text" @click="handleCheckIn(row)">入住</el-button>
          <el-button type="text" @click="handleCheckOut(row)">退房</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      :background="background"
      :current-page="queryForm.pageNum"
      :layout="layout"
      :page-size="queryForm.pageSize"
      :total="total"
      @current-change="handleCurrentChange"
      @size-change="handleSizeChange"
    ></el-pagination>
    <table-edit ref="edit" @fetch-data="fetchData"></table-edit>
    <check-in-edit ref="checkInEdit" @fetch-data="fetchData"></check-in-edit>
    <check-out-edit ref="checkOutEdit" @fetch-data="fetchData"></check-out-edit>
  </div>
</template>

<script>
  import { getList, doCheckIn, doCheckOut } from '@/api/order'
  import TableEdit from './components/TableEdit'
  import CheckInEdit from './components/CheckInEdit'
  import CheckOutEdit from './components/CheckOutEdit'
  export default {
    name: 'ComprehensiveTable',
    components: {
      TableEdit,
      CheckInEdit,
      CheckOutEdit,
    },
    data() {
      return {
        imgShow: true,
        list: [],
        imageList: [],
        listLoading: true,
        layout: 'total, sizes, prev, pager, next, jumper',
        total: 0,
        background: true,
        selectRows: '',
        elementLoadingText: '正在加载...',
        queryForm: {
          pageNum: 1,
          pageSize: 20,
          title: '',
        },
      }
    },
    computed: {
      height() {
        return this.$baseTableHeight()
      },
    },
    created() {
      this.fetchData()
    },
    beforeDestroy() {},
    mounted() {},
    methods: {
      tableSortChange() {
        const imageList = []
        this.$refs.tableSort.tableData.forEach((item, index) => {
          imageList.push(item.img)
        })
        this.imageList = imageList
      },
      setSelectRows(val) {
        this.selectRows = val
      },
      handleCheckIn(row) {
        if (!row.guestRoomId) {
          this.$baseMessage('请先绑定房间', 'error')
          return
        }
        this.$refs['checkInEdit'].showEdit(row)
      },
      handleCheckOut(row) {
        if (!row.guestRoomId) {
          this.$baseMessage('请先绑定房间', 'error')
          return
        }
        this.$refs['checkOutEdit'].showEdit(row)
      },
      handleCreateOrder(row) {
        this.$refs['edit'].showEdit()
      },
      handleEditOrder(row) {
        this.$refs['edit'].showEdit(row)
      },
      handleSizeChange(val) {
        this.queryForm.pageSize = val
        this.fetchData()
      },
      handleCurrentChange(val) {
        this.queryForm.pageNum = val
        this.fetchData()
      },
      handleQuery() {
        this.queryForm.pageNum = 1
        this.fetchData()
      },
      async fetchData() {
        this.listLoading = true
        const { data } = await getList(this.queryForm)
        const { orders, totalCount } = data
        this.list = orders
        this.total = totalCount
        setTimeout(() => {
          this.listLoading = false
        }, 500)
      },
    },
  }
</script>
