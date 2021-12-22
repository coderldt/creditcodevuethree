import { ref, Ref } from "vue";


function collapseHook() {
  const collapseStatus: Ref<boolean> = ref(false);

  const onCollapseChange = () => {
    collapseStatus.value = !collapseStatus.value;
  };

  return {
    collapseStatus,
    onCollapseChange,
  };
}

export default collapseHook;
