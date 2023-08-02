import { defineConfig } from "windicss/helpers"

export default defineConfig({
  /** 排除 */
  extract: {
    exclude: ["node_modules"]
  },
  /** 自定义 */
  shortcuts: {
    "windi-wh-full": "w-full h-full",
    "windi-flex-center": "flex justify-center items-center",
    "windi-flex-x-center": "flex justify-center",
    "windi-flex-y-center": "flex items-center",
    "windi-mb-md": "mb-[10px] md:mb-5",
    "windi-mt-md": "mt-[10px] md:mt-5",
    "windi-border-left": "pl-2 border-l-[4px] border-l-[#0aa679]"
  }
})
