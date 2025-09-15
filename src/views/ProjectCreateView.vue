<script setup lang="ts">
import { useForm, useField } from 'vee-validate'
import * as yup from 'yup'
import { ElMessage } from 'element-plus'
import { useProjectStore } from '../stores/project.store'

const store = useProjectStore()

// 値を正規化するユーティリティ（連続空白→1つ、前後空白を除去）
const normalize = (v: string | undefined | null) =>
  (v ?? '').replace(/\s+/g, ' ').trim()

// Yup スキーマ
const schema = yup.object({
  name: yup
    .string()
    .transform(normalize)              // ← 入力を正規化
    .required('必須です')
    .max(50, '50文字以内で入力してください')
    .test('no-empty-after-trim', '空白のみは不可です', (v) => !!v && v.length > 0)
    .test('no-tabs-or-newlines', '改行・タブは使用できません', (v) => !/[\r\n\t]/.test(v ?? '')),
})

const { handleSubmit, isSubmitting, errors, setFieldError, setFieldValue, meta } =
  useForm({ validationSchema: schema })

const { value: name } = useField<string>('name')

// 送信
const onSubmit = handleSubmit(async (values) => {
  try {
    // 1) クライアント側の重複チェック（簡易）
    const exists = store.list.some(p => p.name.toLowerCase() === values.name.toLowerCase())
    if (exists) {
      setFieldError('name', '同名の案件が既に存在します')
      return
    }

    // 2) 正規化済みの値で作成
    const p = await store.create(values.name)
    ElMessage.success(`「${p.name}」を登録しました`)

    // 3) クリア
    setFieldValue('name', '')
  } catch (e: any) {
    // サーバ側の検証（400）や重複（400/409）も出し分け
    if (e.status === 400) {
      // サーバ由来のメッセージを優先的にフィールドへ表示
      setFieldError('name', e.message || '入力に誤りがあります')
    } else if (e.status === 409) {
      ElMessage.error('他ユーザーによって更新されました（version競合）')
    } else {
      ElMessage.error('登録に失敗しました')
    }
  }
})
</script>

<template>
  <el-card class="box">
    <template #header>案件作成</template>

    <el-form @submit.prevent="onSubmit" label-width="80px">
      <el-form-item label="案件名" :error="errors.name">
        <el-input
          v-model="name"
          placeholder="例）2025年度 園児管理システム刷新"
          maxlength="50"
          show-word-limit
          clearable
          @blur="(e:any) => (name = (e?.target?.value ?? '').replace(/\s+/g,' ').trim())"
          @keydown.enter.prevent="onSubmit"
        />
      </el-form-item>

      <el-form-item>
        <el-button
          type="primary"
          :loading="isSubmitting"
          :disabled="!meta.valid || isSubmitting || !name"
          @click="onSubmit"
        >
          登録
        </el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<style scoped>
.box { max-width: 640px; margin: 24px auto; }
</style>