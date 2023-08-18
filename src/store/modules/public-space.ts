import { ref } from "vue"
import store from "@/store"
import { defineStore } from "pinia"

export const usePublicProjectStore = defineStore("project", () => {
  const publicProjectId = ref<string>("")
  const publicProjectName = ref<string>("")

  return { publicProjectId, publicProjectName }
})

/** 在 setup 外使用 */
export function usePublicProjectStoreHook() {
  return usePublicProjectStore(store)
}
