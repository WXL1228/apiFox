import { ref } from "vue"
import store from "@/store"
import { defineStore } from "pinia"

export const useProjectStore = defineStore("project", () => {
  const projectId = ref<string>("")
  const projectName = ref<string>("")

  return { projectId, projectName }
})

/** 在 setup 外使用 */
export function useProjectStoreHook() {
  return useProjectStore(store)
}
