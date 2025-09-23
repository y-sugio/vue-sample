<script setup lang="ts">
import { useRouter } from 'vue-router'
const router = useRouter()
</script>

<template>
  <header class="header">
    <div class="brand" @click="router.push({ name: 'projects-list' })">案件管理</div>
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