import { InjectionKey, Ref } from "vue";

interface Collapse {
  collapseStatus: Ref<boolean>;
  onCollapseChange: () => void;
}

export const collapseKey: InjectionKey<Collapse> = Symbol("collapse");
