import { defineStore } from "pinia";
import { ref } from "vue";

export const useAuthStore = defineStore('auth', () => {
  const xAuthToken = ref<string | null>(null);

  /**
   * 设置jwt 全局变量
   * @param token 
   */
  const setXAuthToken = (token?: string):void => {
    xAuthToken.value = token || null;
  }

  const $reset = () => {
    xAuthToken.value = null;
  }

  return {
    xAuthToken,
    setXAuthToken,
    $reset
  }
})