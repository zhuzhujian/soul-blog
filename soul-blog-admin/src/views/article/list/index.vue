<script lang="ts" setup>
import { ref, reactive, onMounted } from 'vue'
import { getArticleList, deleteArticle, type ArticleListItem, type ArticleQuery } from '@/api/article'

const loading = ref(false)
const articleList = ref<ArticleListItem[]>([])
const selectedRows = ref<number[]>([])

const queryParams = reactive<ArticleQuery>({
  title: '',
  category: '',
  isRecommend: undefined,
  status: undefined,
  page: 1,
  pageSize: 10
})

const pagination = reactive({
  total: 0,
  page: 1,
  pageSize: 10
})

const categories = ref([
  { label: '技术', value: 'tech' },
  { label: '生活', value: 'life' },
  { label: '随笔', value: 'essay' }
])

const statusOptions = [
  { label: '已发布', value: 'published' },
  { label: '草稿', value: 'draft' }
]

onMounted(() => {
  fetchList()
})

const fetchList = async () => {
  loading.value = true
  try {
    // :todo 获取文章列表 API
    const res = await getArticleList(queryParams)
    if (res.data) {
      articleList.value = res.data.list
      pagination.total = res.data.total
      pagination.page = res.data.page
      pagination.pageSize = res.data.pageSize
    }
  } catch (e) {
    console.error('获取文章列表失败:', e)
    ;(window as any).$message.error('获取文章列表失败')
  } finally {
    loading.value = false
  }
}

const handleSearch = () => {
  queryParams.page = 1
  fetchList()
}

const handleReset = () => {
  queryParams.title = ''
  queryParams.category = ''
  queryParams.isRecommend = undefined
  queryParams.status = undefined
  queryParams.page = 1
  fetchList()
}

const handleSelectionChange = (selection: ArticleListItem[]) => {
  selectedRows.value = selection.map(item => item.id)
}

const handleDelete = async (id: number) => {
  try {
    await (window as any).$confirm('确认删除该文章吗？', '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    })
    // :todo 删除文章 API
    await deleteArticle(id)
    ;(window as any).$message.success('删除成功')
    fetchList()
  } catch (e) {
    console.error('删除失败:', e)
  }
}

const handlePageChange = (page: number) => {
  queryParams.page = page
  fetchList()
}

const handleSizeChange = (size: number) => {
  queryParams.pageSize = size
  queryParams.page = 1
  fetchList()
}

const formatDate = (dateStr: string) => {
  if (!dateStr) return '-'
  return dateStr.split('T')[0]
}

const getCategoryLabel = (value: string) => {
  return categories.value.find(c => c.value === value)?.label || value
}
</script>

<template>
  <div class="article-list-container w-full h-full bg-white rounded-lg px-4 py-4">
    <div class="search-bar mb-4">
      <el-form :inline="true" :model="queryParams" class="demo-form-inline">
        <el-form-item label="标题">
          <el-input v-model="queryParams.title" placeholder="请输入文章标题" clearable @clear="handleSearch" />
        </el-form-item>
        <el-form-item label="分类">
          <el-select v-model="queryParams.category" placeholder="请选择分类" clearable @clear="handleSearch">
            <el-option v-for="item in categories" :key="item.value" :label="item.label" :value="item.value" />
          </el-select>
        </el-form-item>
        <el-form-item label="状态">
          <el-select v-model="queryParams.status" placeholder="请选择状态" clearable @clear="handleSearch">
            <el-option v-for="item in statusOptions" :key="item.value" :label="item.label" :value="item.value" />
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleSearch">搜索</el-button>
          <el-button @click="handleReset">重置</el-button>
        </el-form-item>
      </el-form>
    </div>

    <div class="table-container">
      <el-table 
        v-loading="loading" 
        :data="articleList" 
        border 
        @selection-change="handleSelectionChange"
        style="width: 100%"
      >
        <el-table-column type="selection" width="55" />
        <el-table-column prop="id" label="#" width="60" align="center" />
        <el-table-column prop="title" label="标题" min-width="200" show-overflow-tooltip />
        <el-table-column prop="category" label="分类" width="100" align="center">
          <template #default="{ row }">
            {{ getCategoryLabel(row.category) }}
          </template>
        </el-table-column>
        <el-table-column prop="isTop" label="置顶" width="80" align="center">
          <template #default="{ row }">
            <el-tag v-if="row.isTop" type="warning" size="small">置顶</el-tag>
            <span v-else class="text-gray-400">-</span>
          </template>
        </el-table-column>
        <el-table-column prop="isPublished" label="状态" width="80" align="center">
          <template #default="{ row }">
            <el-tag :type="row.isPublished ? 'success' : 'info'" size="small">
              {{ row.isPublished ? '已发布' : '草稿' }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="updateTime" label="更新时间" width="120" align="center">
          <template #default="{ row }">
            {{ formatDate(row.updateTime) }}
          </template>
        </el-table-column>
        <el-table-column label="操作" width="150" align="center" fixed="right">
          <template #default="{ row }">
            <el-button link type="primary" size="small">编辑</el-button>
            <el-button link type="danger" size="small" @click="handleDelete(row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <div class="pagination-container flex justify-end mt-4">
      <el-pagination
        v-model:current-page="pagination.page"
        v-model:page-size="pagination.pageSize"
        :page-sizes="[10, 20, 50, 100]"
        :total="pagination.total"
        layout="total, sizes, prev, pager, next, jumper"
        @size-change="handleSizeChange"
        @current-change="handlePageChange"
      />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.article-list-container {
  display: flex;
  flex-direction: column;
  
  .search-bar {
    :deep(.el-form-item) {
      margin-bottom: 0;
    }
  }
  
  .table-container {
    flex: 1;
    overflow: auto;
  }
}
</style>