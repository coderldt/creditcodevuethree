/* eslint-disable */
declare module "*.vue" {
  import type Vue, { DefineComponent } from "vue";
  const component: DefineComponent<{}, {}, any>;
  export { Pagination };
  export default component | Vue | undefined;
  // export { Pagination };
  // export default Vue;

}
