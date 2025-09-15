<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'
const route = useRoute()
const router = useRouter()
const isActive = (name: string) => route.name === name
</script>

<template>
  <header class="header">
    <div class="brand" @click="router.push({ name: 'projects-list' })">Nursery Management</div>
    <nav class="nav">
      <router-link :to="{ name: 'projects-list' }" class="link" :class="{ active: isActive('projects-list') }">
        案件一覧
      </router-link>
      <router-link :to="{ name: 'project-new' }" class="link" :class="{ active: isActive('project-new') }">
        案件作成
      </router-link>
    </nav>
  </header>
</template>

<style scoped>
.header {
  display: flex; align-items: center; justify-content: space-between;
  height: 56px; padding: 0 16px; border-bottom: 1px solid #eee; background: #fff;
}
.brand { font-weight: 700; cursor: pointer; }
.nav { display: flex; gap: 12px; }
.link { text-decoration: none; color: #333; padding: 8px 10px; border-radius: 8px; }
.link.active { background: #f2f3f5; }
</style>