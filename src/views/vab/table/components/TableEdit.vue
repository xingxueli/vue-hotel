<template>
  <el-dialog
    :title="title"
    :visible.sync="dialogFormVisible"
    width="500px"
    @close="close"
  >
    <el-form ref="form" :model="form" :rules="rules" label-width="80px">
      <el-form-item label="店id" prop="storeId">
        <el-input
          v-model.trim="form.storeId"
          :readonly="true"
          autocomplete="off"
        ></el-input>
      </el-form-item>
      <el-form-item label="客房id" prop="spuId">
        <el-input
          v-model.trim="form.spuId"
          :readonly="true"
          autocomplete="off"
        ></el-input>
      </el-form-item>
      <el-form-item label="店名" prop="storeName">
        <el-input v-model.trim="form.storeName" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="客房编码" prop="roomNum">
        <el-input v-model.trim="form.roomNum" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="客房名称" prop="title">
        <el-input v-model.trim="form.title" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="分类" prop="type">
        <el-select v-model="form.typeString" placeholder="请选择房间分类">
          <el-option label="单间大床房" value="1"></el-option>
          <el-option label="家庭房1孩" value="2"></el-option>
          <el-option label="家庭房2孩" value="3"></el-option>
          <el-option label="双人标准间" value="4"></el-option>
          <el-option label="三人间" value="5"></el-option>
          <el-option label="4人间麻将房" value="6"></el-option>
          <el-option label="双大床房" value="7"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="价格" prop="price">
        <el-input v-model.number="form.price" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="划线价格" prop="originPrice">
        <el-input
          v-model.number="form.originPrice"
          autocomplete="off"
        ></el-input>
      </el-form-item>
      <el-form-item label="图片" prop="thumb">
        <el-input v-model.trim="form.thumb" autocomplete="off"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="close">取 消</el-button>
      <el-button type="primary" @click="save">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
  import { doEdit } from '@/api/table'

  export default {
    name: 'TableEdit',
    data() {
      return {
        form: {
          spuId: '',
          roomNum: '',
          roomName: '',
          roomPrice: '',
          roomOriginPrice: '',
          imageUrl: '',
          storeId: '',
          storeName: '',
          type: '',
          thumb: '',
          title: '',
        },
        rules: {
          title: [{ required: true, trigger: 'blur', message: '请输入标题' }],
          storeName: [
            { required: true, trigger: 'blur', message: '请输入店名' },
          ],
          roomNum: [
            { required: true, trigger: 'blur', message: '请输入客房编码' },
          ],
          roomName: [
            { required: true, trigger: 'blur', message: '请输入客房名称' },
          ],
          type: [{ required: true, message: '请选择分类', trigger: 'change' }],
          price: [
            {
              required: true,
              trigger: 'blur',
              message: '请输入价格',
              type: 'number',
            },
          ],
          originPrice: [
            {
              required: true,
              trigger: 'blur',
              message: '请输入客房划线价格',
              type: 'number',
            },
          ],
          imageUrl: [
            { required: true, trigger: 'blur', message: '请输入客房图片' },
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
        if (!row) {
          this.title = '添加'
          this.operationType = 'add'
        } else {
          this.title = '编辑'
          this.operationType = 'update'
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
            if (this.operationType == 'add') {
              result = await doCreate(this.form)
              if (result.code === 'Success') {
                this.$baseMessage('创建成功', 'success')
              } else {
                this.$baseMessage('创建失败', 'error')
              }
            } else if (this.operationType == 'update') {
              result = await doEdit(this.form)
              if (result.code === 'Success') {
                this.$baseMessage('修改成功', 'success')
              } else {
                this.$baseMessage('修改失败', 'error')
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
