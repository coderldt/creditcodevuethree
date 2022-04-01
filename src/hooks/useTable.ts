import { computed, onMounted, reactive, Ref, ref, toRef, toRefs } from "vue";

import { ElMessage } from "element-plus";

interface Params {
  api: Function;
  params?: Object;
  handleSusscee?: Function;
  handleError?: Function;
}
interface Result {
  data: any;
  isLoading: Ref<Boolean>;
  getList: Function;
}

const useTable = (options: Params): Result => {
  const { api, params, handleSusscee, handleError } = options;
  let isLoading = ref(false);
  let resData = reactive({
    data: {},
  });

  const getList = async () => {
    isLoading.value = true;

    const res = await api(params);
    if (res.code === 200) {
      resData.data = res.data;
      if (handleSusscee) {
        resData.data = handleSusscee(resData.data) || resData.data;
      }
    } else {
      if (handleError) {
        handleError();
      }
      ElMessage({
        message: res.msg || "出错了！！！",
        type: "warning",
      });
    }

    isLoading.value = false;
  };

  onMounted(() => {
    getList();
  });

  return {
    ...toRefs(resData),
    isLoading,
    getList,
  };
};

export default useTable;
