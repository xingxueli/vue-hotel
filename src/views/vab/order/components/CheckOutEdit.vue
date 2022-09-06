<template>
  <el-dialog
    :title="title"
    :visible.sync="dialogFormVisible"
    width="500px"
    @close="close"
  >
    <el-form ref="form" :model="form" :rules="rules" label-width="80px">
      <el-form-item label="实际退房" prop="actualEndTime">
        <el-date-picker
          v-model.trim="form.actualEndTime"
          type="date"
          placeholder="选择实际退房日期"
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
  import { doCheckOut } from '@/api/order'

  export default {
    name: 'CheckOutEdit',
    data() {
      return {
        form: {
          actualEndTime: '',
        },
        rules: {
          actualEndTime: [
            { required: true, trigger: 'blur', message: '请输入实际退房时间' },
          ],
        },
        title: '',
        dialogFormVisible: false,
        operationType: '',
      }
    },
    created() {},
    methods: {
      showEdit(row) {
        this.title = '退房'
        this.operationType = 'update'
        this.form = Object.assign({}, row)
        this.dialogFormVisible = true
      },
      close() {
        this.$refs['form'].resetFields()
        this.form = this.$options.data().form
        this.dialogFormVisible = false
        this.$emit('fetch-data')
      },
      changeEndTime(date) {
        this.form.actualEndTime = date
      },
      save() {
        this.$refs['form'].validate(async (valid) => {
          if (valid) {
            const result = await doCheckOut(this.form)
            if (result.code === 'Success') {
              this.$baseMessage('退房成功', 'success')
            } else {
              this.$baseMessage('退房失败', 'error')
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
