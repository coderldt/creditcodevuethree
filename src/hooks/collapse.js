import { ref } from "vue";

function collapseHook() {
  const collapseStatus = ref(true);

  const onCollapseChange = () => {
    collapseStatus.value = !collapseStatus.value;
  };

  return {
    collapseStatus,
    onCollapseChange,
  };
}

export default collapseHook;
