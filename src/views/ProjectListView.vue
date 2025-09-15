<script setup lang="ts">
import { onMounted, ref, computed } from 'vue'
import { ElMessage } from 'element-plus'
import { useProjectStore } from '../stores/project.store'

const store = useProjectStore()
const keyword = ref('')

const filtered = computed(() => {
  const k = keyword.value.trim().toLowerCase()
  return k ? store.list.filter(p => p.name.toLowerCase().includes(k)) : store.list
})

onMounted(async () => {
  try {
    await store.fetchAll()
  } catch (e: any) {
    ElMessage.error(e.message || '一覧取得に失敗しました')
  }
})
</script>

<template>
  <el-card class="box">
    <template #header>
      <div class="header-row">
        <span>案件一覧</span>
        <div class="actions">
          <el-input
            v-model="keyword"
            placeholder="案件名で検索"
            clearable
            size="small"
            style="width:240px"
          />
          <router-link :to="{ name: 'project-new' }">
            <el-button type="primary" size="small">新規作成</el-button>
          </router-link>
        </div>
      </div>
    </template>

    <el-table :data="filtered" style="width:100%;" empty-text="データがありません">
      <el-table-column label="案件名" min-width="260">
        <template #default="{ row }">
          <router-link :to="{ name: 'project-detail', params: { id: row.projectId
           } }">
            {{ row.name }}
          </router-link>
        </template>
      </el-table-column>

      <el-table-column label="作成日時" min-width="200">
        <template #default="{ row }">
          {{ new Date(row.createDate).toLocaleString('ja-JP') }}
        </template>
      </el-table-column>

      <el-table-column label="更新日時" min-width="200">
        <template #default="{ row }">
          {{ new Date(row.updateDate).toLocaleString('ja-JP') }}
        </template>
      </el-table-column>
    </el-table>
  </el-card>
</template>

<style scoped>
.box { max-width:960px; margin:24px auto; }
.header-row { display:flex; align-items:center; justify-content:space-between; }
.actions { display:flex; gap:8px; align-items:center; }
</style>