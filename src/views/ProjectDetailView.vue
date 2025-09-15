<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { ElMessage } from 'element-plus'
import { useProjectStore } from '../stores/project.store'

const route = useRoute()
const store = useProjectStore()
const loading = ref(false)
const notFound = ref(false)

const id = String(route.params.id)

onMounted(load)

watch(() => route.params.id, async () => {
  notFound.value = false
  await load()
})

async function load() {
  loading.value = true
  try {
    const p = await store.fetchById(id)
    if (!p) notFound.value = true
  } catch (e: any) {
    notFound.value = true
    ElMessage.error(e.message || '詳細取得に失敗しました')
  } finally {
    loading.value = false
  }
}

const project = computed(() => store.getCached(id))
</script>

<template>
  <el-card class="box" v-loading="loading">
    <template #header>
      <div class="header-row">
        <span>案件詳細</span>
        <router-link :to="{ name: 'projects-list' }">
          <el-button size="small">一覧へ戻る</el-button>
        </router-link>
      </div>
    </template>

    <el-empty v-if="notFound" description="データが見つかりませんでした" />
    <template v-else>
      <el-descriptions v-if="project" :column="1" border>
        <el-descriptions-item label="ID">{{ project.projectId  }}</el-descriptions-item>
        <el-descriptions-item label="案件名">{{ project.name }}</el-descriptions-item>  
        <el-descriptions-item label="作成日時">{{ new Date(project.createDate).toLocaleString() }}</el-descriptions-item>
        <el-descriptions-item label="更新日時">{{ new Date(project.updateDate).toLocaleString() }}</el-descriptions-item>
      </el-descriptions>
    </template>
  </el-card>
</template>

<style scoped>
.box { max-width: 720px; margin: 24px auto; }
.header-row { display: flex; align-items: center; justify-content: space-between; }
</style>