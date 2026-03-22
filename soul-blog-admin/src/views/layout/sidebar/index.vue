<script lang="ts" setup>
import { useRoute, useRouter } from 'vue-router';
import { adminMenuRoutes } from '@/router/routes';

const route = useRoute()
const router = useRouter()

const handleOpen = () => {}

const handleClose = () => {}

const handleNavigate = (item: { path: string; }) => {
  if(route.path === item.path) return
  router.push(item.path)
}
</script>

<template>
  <el-menu
    class="el-menu-vertical-demo h-full"
    :default-active="route.path"
    @open="handleOpen"
    @close="handleClose"
  >
    <template v-for="parent in adminMenuRoutes" :key="parent.name">
      <el-menu-item v-if="!parent.children" :index="parent.path" @click="handleNavigate(parent)">
        <template #title>{{ parent.meta.title }}</template>
      </el-menu-item>
      <el-sub-menu v-else :index="parent.path">
        <template #title>{{ parent.meta.title }}</template>
        <el-menu-item v-for="child in parent?.children" :key="child.name" :index="child.path" @click="handleNavigate(child)">
          <template #title>{{ child.meta.title }}</template>
        </el-menu-item>
      </el-sub-menu>
    </template>
  </el-menu>
</template>