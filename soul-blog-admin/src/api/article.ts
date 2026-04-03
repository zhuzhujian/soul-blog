import fetch from "@/utils/server";
import type { IResult } from '@/types/common'

export interface ArticleListItem {
  id: number
  title: string
  category: string
  tags: string
  cover?: string
  summary?: string
  isTop: boolean
  isPublished: boolean
  createTime: string
  updateTime: string
}

export interface ArticleQuery {
  title?: string
  category?: string
  isRecommend?: boolean
  status?: 'published' | 'draft'
  page?: number
  pageSize?: number
}

export interface ArticleListResult {
  list: ArticleListItem[]
  total: number
  page: number
  pageSize: number
}

export async function getArticleList(params: ArticleQuery): Promise<IResult<ArticleListResult>> {
  // :todo 获取文章列表 API
  return fetch.get('/api/v1/articles', { params })
}

export async function deleteArticle(id: number): Promise<IResult<any>> {
  // :todo 删除文章 API
  return fetch.post(`/api/v1/articles/${id}/delete`, {}, undefined)
}

export async function deleteArticles(ids: number[]): Promise<IResult<any>> {
  // :todo 批量删除文章 API
  return fetch.post('/api/v1/articles/batch-delete', { ids }, undefined)
}
