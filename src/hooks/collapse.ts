import { ref, Ref, InjectionKey } from "vue";

const collapseStatus: Ref<boolean> = ref(false);

const handleCollapse: () => void = () => {
  collapseStatus.value = !collapseStatus.value;
};

export { collapseStatus, handleCollapse };
