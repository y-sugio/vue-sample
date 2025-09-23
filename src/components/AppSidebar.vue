<script setup lang="ts">
import { useRoute } from 'vue-router'
const route = useRoute()
const isActive = (name: string) => route.name === name
</script>

<template>
  <aside class="sidebar">
    <nav class="nav">
      <router-link :to="{ name: 'projects-list' }" class="item" :class="{ active: isActive('projects-list') }">
        案件一覧
      </router-link>
      <router-link :to="{ name: 'project-new' }" class="item" :class="{ active: isActive('project-new') }">
        案件作成
      </router-link>
    </nav>
  </aside>
  
</template>

<style scoped>
.sidebar { padding: 12px; }
.nav { display: flex; flex-direction: column; gap: 4px; }
.item { display:block; padding: 10px 12px; border-radius: 8px; color: #333; text-decoration: none; }
.item:hover { background: #f5f6f7; }
.active { background: #eef2ff; color: #1f56d3; font-weight: 600; }
</style>

