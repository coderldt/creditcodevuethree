import { ref, Ref } from "vue";

export interface Collapse {
  collapseStatus: Ref<boolean>;
  onCollapseChange: () => void;
}

function collapseHook(): Collapse {
  const collapseStatus = ref(false);

  const onCollapseChange = () => {
    collapseStatus.value = !collapseStatus.value;
  };

  return {
    collapseStatus,
    onCollapseChange,
  };
}

export default collapseHook;
