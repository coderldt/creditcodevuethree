import { ref } from "vue";

function collapseHook() {
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
