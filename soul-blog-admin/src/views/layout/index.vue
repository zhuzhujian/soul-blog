<script lang="ts" setup>
import Sidebar from './sidebar/index.vue'
</script>

<template>
  <div class="w-full h-full">
    <el-container>
      <el-header class="flex items-center space-x-5 text-sky-500">
        <div class="w-45 h-full flex items-center justify-center" style="border-right: solid 1px var(--el-menu-border-color);">
          Soul Blog
        </div>
      </el-header>
      <el-container>
        <el-aside width="200px" style="height: calc(100vh - 60px);">
          <Sidebar></Sidebar>
        </el-aside>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>