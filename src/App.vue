<template>
  <el-container style="min-height:100vh;">
    <el-header height="56px" style="padding:0;">
      <AppHeader />
    </el-header>
    <el-main>
      <router-view />
    </el-main>
  </el-container>
</template>

<script setup lang="ts">
import AppHeader from '@/components/AppHeader.vue'
</script>