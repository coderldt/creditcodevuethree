/* eslint-disable */
import CommonBox from "@/components/globalCom/commonBox/index.vue";
import { Ref } from "vue";

declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}
