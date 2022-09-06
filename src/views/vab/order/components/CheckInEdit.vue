<template>
  <el-dialog
    :title="title"
    :visible.sync="dialogFormVisible"
    width="500px"
    @close="close"
  >
    <el-form ref="form" :model="form" :rules="rules" label-width="80px">
      <el-form-item label="实际入住" prop="actualStartTime">
        <el-date-picker
          v-model.trim="form.actualStartTime"
          type="date"
          placeholder="选择实际入住日期"
          @change="changeStartTime"
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
  import { doCheckIn } from '@/api/order'

  export default {
    name: 'CheckInEdit',
    data() {
      return {
        form: {
          actualStartTime: '',
        },
        rules: {
          actualStartTime: [
            { required: true, trigger: 'blur', message: '请输入实际入住时间' },
          ],
        },
        title: '',
        dialogFormVisible: false,
      }
    },
    created() {},
    methods: {
      showEdit(row) {
        this.title = '入住'
        this.form = Object.assign({}, row)
        this.dialogFormVisible = true
      },
      close() {
        this.$refs['form'].resetFields()
        this.form = this.$options.data().form
        this.dialogFormVisible = false
        this.$emit('fetch-data')
      },
      changeStartTime(date) {
        this.form.actualStartTime = date
      },
      save() {
        this.$refs['form'].validate(async (valid) => {
          if (valid) {
            const result = await doCheckIn(this.form)
            if (result.code === 'Success') {
              this.$baseMessage('入住成功', 'success')
            } else {
              this.$baseMessage('入住失败', 'error')
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
