<template>
  <el-dialog
    :title="title"
    :visible.sync="dialogFormVisible"
    width="500px"
    @close="close"
  >
    <el-form ref="form" :model="form" :rules="rules" label-width="80px">
      <el-form-item label="客房id" prop="guestRoomId">
        <el-input v-model.trim="form.guestRoomId" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="支付方式" prop="payWay">
        <el-select v-model="form.payWay" placeholder="请选择支付类型">
          <el-option
            v-for="item in payWayOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="订单姓名" prop="orderName">
        <el-input v-model.trim="form.orderName" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="订单电话" prop="orderMobile">
        <el-input v-model.trim="form.orderMobile" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="金额" prop="totalAmount">
        <el-input
          v-model.number="form.totalAmount"
          autocomplete="off"
        ></el-input>
      </el-form-item>
      <el-form-item label="备注" prop="remark">
        <el-input v-model="form.remark" type="textarea"></el-input>
      </el-form-item>
      <el-form-item label="预计入住" prop="predictStartTime">
        <el-date-picker
          v-model.trim="form.predictStartTime"
          type="date"
          placeholder="选择预计入住日期"
          @change="changeStartTime"
        ></el-date-picker>
      </el-form-item>
      <el-form-item label="预计退房" prop="predictEndTime">
        <el-date-picker
          v-model.trim="form.predictEndTime"
          type="date"
          placeholder="选择预计退房日期"
          @change="changeEndTime"
        ></el-date-picker>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="close">取 消</el-button>
      <el-button type="primary" @click="save">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
  import { doEditOrder, doCreateOrder } from '@/api/order'

  export default {
    name: 'TableEdit',
    data() {
      return {
        form: {
          guestRoomId: '',
          payWay: '',
          orderName: '',
          orderMobile: '',
          totalAmount: '',
          remark: '',
          predictStartTime: '',
          predictEndTime: '',
        },
        payWayOptions: [
          {
            value: 1,
            label: '微信支付',
          },
          {
            value: 2,
            label: '支付宝支付',
          },
        ],
        rules: {
          payWay: [{ required: true, trigger: 'blur', message: '请支付方式' }],
          guestRoomId: [
            {
              required: true,
              trigger: 'blur',
              message: '请输入客房id',
            },
          ],
          roomName: [
            { required: true, trigger: 'blur', message: '请输入客房名称' },
          ],
          orderName: [
            {
              required: true,
              trigger: 'blur',
              message: '请输入下单人姓名',
            },
          ],
          orderMobile: [
            {
              required: true,
              message: '请输入下单人电话',
              trigger: 'blur',
            },
          ],
          totalAmount: [
            {
              required: true,
              trigger: 'blur',
              message: '请输入价格',
              type: 'number',
            },
          ],
          remark: [{ required: true, trigger: 'blur', message: '请输入备注' }],
          predictStartTime: [
            { required: true, trigger: 'blur', message: '请输入入住时间' },
          ],
          predictEndTime: [
            { required: true, trigger: 'blur', message: '请输入退房时间' },
          ],
        },
        title: '',
        dialogFormVisible: false,
        operationType: '',
      }
    },
    created() {},
    methods: {
      changeStartTime(date) {
        this.form.predictStartTime = date
      },
      changeEndTime(date) {
        this.form.predictEndTime = date
      },
      showEdit(row) {
        if (!row) {
          this.title = '创建订单'
          this.operationType = 'createOrder'
        } else {
          this.title = '修改订单'
          this.operationType = 'editOrder'
          this.form = Object.assign({}, row)
        }
        this.dialogFormVisible = true
      },
      close() {
        this.$refs['form'].resetFields()
        this.form = this.$options.data().form
        this.dialogFormVisible = false
        this.$emit('fetch-data')
      },
      save() {
        this.$refs['form'].validate(async (valid) => {
          if (valid) {
            let result = {}
            if (this.operationType == 'createOrder') {
              const result = await doCreateOrder(this.form)
              if (result.code === 'Success') {
                this.$baseMessage('订单创建成功', 'success')
              } else {
                this.$baseMessage('订单创建失败', 'error')
              }
            } else if (this.operationType == 'editOrder') {
              const result = await doEditOrder(this.form)
              if (result.code === 'Success') {
                this.$baseMessage('订单更新成功', 'success')
              } else {
                this.$baseMessage('订单更新失败', 'error')
              }
            }
            this.$emit('fetch-data')
            this.dialogFormVisible = false
          } else {
            return false
          }
        })
      },
    },
  }
</script>
