<template>
  <el-container style="min-height:100vh;">
    <el-header height="56px" style="padding:0;">
      <AppHeader />
    </el-header>
    <el-container>
      <el-aside width="220px" style="border-right: 1px solid #eee; background:#fafafa;">
        <AppSidebar />
      </el-aside>
      <el-main>
        <router-view />
      </el-main>
    </el-container>
  </el-container>
  
</template>

<script setup lang="ts">
import AppHeader from '@/components/AppHeader.vue'
import AppSidebar from '@/components/AppSidebar.vue'
</script>

<style scoped>
/* .content {
  width: 100%;
  margin: 24px;
  padding: 0 16px;
  box-sizing: border-box;
} */
</style>
