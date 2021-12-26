<template>
  <div>
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>
          <i class="el-icon-lx-file"></i> 我的简历
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="container">
      <div class="item-title">
        <span>教育经历</span>
        <el-button type="primary" size="small" class="add-button" @click="handleAdd('edu')">新增</el-button>
      </div>
      <el-table :data="educationData" stripe style="width: 100%">
        <el-table-column prop="level" label="学历" />
        <el-table-column prop="school" label="学校" />
        <el-table-column prop="major" label="专业" />
        <el-table-column prop="start_time" label="开始时间" />
        <el-table-column prop="end_time" label="结束时间" />
        <el-table-column fixed="right" label="操作" width="140">
          <template #default="scope">
            <el-button type="text" size="small" @click="handleEdit('edu',scope.row)">修改</el-button>
            <el-button type="text" size="small" @click="handleDelete('edu',scope.row.id)" style="color: indianred">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="item-title">
        <span>实习经历</span>
        <el-button type="primary" size="small" class="add-button" @click="handleAdd('exp')">新增</el-button>
      </div>
      <el-table :data="experimentData" stripe style="width: 100%">
        <el-table-column prop="role" label="职位" />
        <el-table-column prop="name" label="公司" />
        <el-table-column prop="start_time" label="开始时间" />
        <el-table-column prop="end_time" label="结束时间" />
        <el-table-column prop="description" label="简述" />
        <el-table-column fixed="right" label="操作" width="140">
          <template #default="scope">
            <el-button type="text" size="small" @click="handleEdit('exp',scope.row)">修改</el-button>
            <el-button type="text" size="small" @click="handleDelete('exp',scope.row.id)" style="color: indianred">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="item-title">
        <span>语言技能</span>
        <el-button type="primary" size="small" class="add-button" style="margin-right: 60%" @click="handleAdd('lang')">新增</el-button>
      </div>
      <el-table :data="languageData" stripe style="width: 40%">
        <el-table-column prop="language" label="语言" />
        <el-table-column prop="level" label="掌握水平" />
        <el-table-column fixed="right" label="操作" width="140">
          <template #default="scope">
            <el-button type="text" size="small" @click="handleEdit('lang',scope.row)">修改</el-button>
            <el-button type="text" size="small" @click="handleDelete('lang',scope.row.id)" style="color: indianred">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <p class="item-title">附件</p>
    </div>
    <el-dialog v-model="addVisible" :title="op === 'add' ? '新增' : '修改'" width="40%">
      <el-form :model="eduForm" v-if="addOp === 'edu'">
        <el-form-item label="学历">
          <el-select v-model="eduForm.level">
            <el-option label="高中" value="高中"></el-option>
            <el-option label="本科" value="本科"></el-option>
            <el-option label="硕士" value="硕士"></el-option>
            <el-option label="博士" value="博士"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="学校">
          <el-input v-model="eduForm.school" style="width: 70%"></el-input>
        </el-form-item>
        <el-form-item label="专业">
          <el-input v-model="eduForm.major" style="width: 70%"></el-input>
        </el-form-item>
        <el-form-item label="开始时间" prop="start_time">
          <el-date-picker
              v-model="eduForm.start_time"
              type="month">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="结束时间" prop="end_time">
          <el-date-picker
              v-model="eduForm.end_time"
              type="month">
          </el-date-picker>
        </el-form-item>
      </el-form>
      <el-form :model="expForm" v-if="addOp === 'exp'">
        <el-form-item label="职位">
          <el-input v-model="expForm.role" style="width: 70%"></el-input>
        </el-form-item>
        <el-form-item label="公司">
          <el-input v-model="expForm.name" style="width: 70%"></el-input>
        </el-form-item>
        <el-form-item label="开始时间" prop="start_time">
          <el-date-picker
              v-model="expForm.start_time"
              type="month">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="结束时间" prop="end_time">
          <el-date-picker
              v-model="expForm.end_time"
              type="month">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="简述">
          <el-input v-model="expForm.description" type="textarea" :rows="3" style="width: 70%"></el-input>
        </el-form-item>
      </el-form>
      <el-form :model="langForm" v-if="addOp === 'lang'">
        <el-form-item label="语言">
          <el-input v-model="langForm.language" style="width: 70%"></el-input>
        </el-form-item>
        <el-form-item label="掌握水平">
          <el-input v-model="langForm.level" style="width: 70%"></el-input>
        </el-form-item>
      </el-form>
      <template #footer>
      <span class="dialog-footer">
        <el-button @click="handleAddCancel">取消</el-button>
        <el-button type="primary" @click="handleAddConfirm">确定</el-button>
      </span>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import {reactive, toRefs} from "vue";
import {ResumeApi} from "../api/resume";
import {ElMessage} from "element-plus";

export default {
  name: "Resume",
  setup() {
    const state = reactive({
      educationData: [
        {
          level: '本科',
          school: '华东师范大学',
          major: '软件工程',
          start_time: '2018-9-10',
          end_time: '2022-6-30'
        }
      ],
      experimentData: [{
        role: '软件工程师',
        name: '某某软件公司',
        start_time: '2018-9-10',
        end_time: '2022-6-30',
        description: '巴拉巴拉巴拉爸爸那块地方和六个还是短发俺是刚来的发；了大半年是的发表；离开感觉；立法规划；来分隔空间；老客户'
      }],
      languageData: [{
        language: 'English',
        level: '能够用于面试'
      }],
      addVisible: false,
      eduForm: {
        level: '',
        school: '',
        major: '',
        start_time: '',
        end_time: ''
      },
      expForm: {
        role: '',
        name: '',
        start_time: '',
        end_time: '',
        description: ''
      },
      langForm: {
        language: '',
        level: ''
      },
      op: '',
      addOp: '',
    })

    const userId = localStorage.getItem('userId')

    const getEduList = () => {
      ResumeApi.getEducationList({user_id: userId}).then(res => {
        if(res.code === 0){
          state.educationData = res.data
        }else{
          ElMessage.error(res.msg)
        }
      })
    }
    const getExpList = () => {
      ResumeApi.getExperimentList({user_id: userId}).then(res => {
        if(res.code === 0){
          state.experimentData = res.data
        }else{
          ElMessage.error(res.msg)
        }
      })
    }
    const getLangList = () => {
      ResumeApi.getLanguageList({user_id: userId}).then(res => {
        if(res.code === 0){
          state.languageData = res.data
        }else{
          ElMessage.error(res.msg)
        }
      })
    }
    getEduList()
    getExpList()
    getLangList()

    const handleEdit = (op, record) => {
      state.op = 'edit'
      state.addOp = op
      switch (op){
        case 'edu':
          state.eduForm = {...record}
          break
        case 'exp':
          state.expForm = {...record}
          break
        case 'lang':
          state.langForm = {...record}
          break
      }
      state.addVisible = true
    }

    const handleDelete = (op, id) => {
      switch (op){
        case 'edu':
          ResumeApi.deleteEducation({id: id, user_id: userId}).then(res => {
            if(res.code === 0){
              ElMessage.success('删除成功')
              getEduList()
            }else{
              ElMessage.error(res.msg)
            }
          })
          break
        case 'exp':
          ResumeApi.deleteExperiment({id: id, user_id: userId}).then(res => {
            if(res.code === 0){
              ElMessage.success('删除成功')
              getExpList()
            }else{
              ElMessage.error(res.msg)
            }
          })
          break
        case 'lang':
          ResumeApi.deleteLanguage({id: id, user_id: userId}).then(res => {
            if(res.code === 0){
              ElMessage.success('删除成功')
              getLangList()
            }else{
              ElMessage.error(res.msg)
            }
          })
          break
      }
    }

    const handleAdd = entity => {
      state.op = 'add'
      state.addOp = entity
      resetForm(state.eduForm)
      resetForm(state.expForm)
      resetForm(state.langForm)
      state.addVisible = true
    }
    const handleAddCancel = () => {
      switch (state.addOp){
        case 'edu':
          resetForm(state.eduForm)
          break
        case 'exp':
          resetForm(state.expForm)
          break
        case 'lang':
          resetForm(state.langForm)
          break
      }
      state.addVisible = false
    }
    const handleAddConfirm = () => {
      state.eduForm.user_id = userId
      state.expForm.user_id  = userId
      state.langForm.user_id = userId
      if(state.op === 'add'){
        switch (state.addOp){
          case 'edu':
            state.eduForm.start_time = new Date(state.eduForm.start_time).getTime()
            state.eduForm.end_time = new Date(state.eduForm.end_time).getTime()
            ResumeApi.addEducation(state.eduForm).then(res => {
              if(res.code === 0){
                ElMessage.success('添加成功')
                resetForm(state.eduForm)
                getEduList()
                state.addVisible = false
              }else{
                ElMessage.error('添加失败')
              }
            })
            break
          case 'exp':
            state.expForm.start_time = new Date(state.expForm.start_time).getTime()
            state.expForm.end_time = new Date(state.expForm.end_time).getTime()
            ResumeApi.addExperiment(state.expForm).then(res => {
              if(res.code === 0){
                ElMessage.success('添加成功')
                getExpList()
                state.addVisible = false
              }else{
                ElMessage.error('添加失败')
              }
            })
            break
          case 'lang':
            state.langForm.major = state.langForm.language
            ResumeApi.addLanguage(state.langForm).then(res => {
              if(res.code === 0){
                ElMessage.success('添加成功')
                getLangList()
                state.addVisible = false
              }else{
                ElMessage.error('添加失败')
              }
            })
            break
        }
      }else if(state.op === 'edit'){
        switch (state.addOp){
          case 'edu':
            state.eduForm.start_time = new Date(state.eduForm.start_time).getTime()
            state.eduForm.end_time = new Date(state.eduForm.end_time).getTime()
            ResumeApi.updateEducation(state.eduForm).then(res => {
              if(res.code === 0){
                ElMessage.success('修改成功')
                resetForm(state.eduForm)
                getEduList()
                state.addVisible = false
              }else{
                ElMessage.error('修改失败')
              }
            })
            break
          case 'exp':
            state.expForm.start_time = new Date(state.expForm.start_time).getTime()
            state.expForm.end_time = new Date(state.expForm.end_time).getTime()
            ResumeApi.updateExperiment(state.expForm).then(res => {
              if(res.code === 0){
                ElMessage.success('修改成功')
                getExpList()
                state.addVisible = false
              }else{
                ElMessage.error('修改失败')
              }
            })
            break
          case 'lang':
            state.langForm.major = state.langForm.language
            ResumeApi.updateLanguage(state.langForm).then(res => {
              if(res.code === 0){
                ElMessage.success('修改成功')
                getLangList()
                state.addVisible = false
              }else{
                ElMessage.error('修改失败')
              }
            })
            break
        }
      }
    }

    const resetForm = form => {
      Object.keys(form).forEach(key => {
        form[key] = ''
      })
    }

    return {
      ...toRefs(state),
      handleAdd,
      handleAddConfirm,
      handleAddCancel,
      handleEdit,
      handleDelete
    }
  },
}
</script>

<style scoped>
.item-title {
  font-size: large;
  margin-bottom: 10px;
  margin-top: 14px;
}
.add-button {
  float: right;
}
</style>