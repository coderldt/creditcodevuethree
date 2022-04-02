import { onMounted, reactive, Ref, ref, toRefs } from "vue";
import { ElMessage } from "element-plus";
import useReactive from "./useReactive";
import { DEFAULT_FORM, DEFAULT_PAGE } from "@/config/dist";

interface Params {
  api: Function;
  page?: Object;
  form?: Object;
  handleSusscee?: Function;
  handleError?: Function;
}
interface Result {
  form: Object;
  page: Object;
  data: any;
  isLoading: Ref<Boolean>;
  getList: Function;
  handlePagintion: Function;
}

const useTable = (options: Params): Result => {
  const { api, form: optionForm, page: optionPage, handleSusscee, handleError } = options;

  const form = useReactive(optionForm) || reactive(DEFAULT_FORM);
  const page = useReactive(optionPage) || reactive(DEFAULT_PAGE);

  let isLoading = ref(false);
  let resData = reactive({
    data: {},
  });

  const getList = async () => {
    isLoading.value = true;

    const res = await api({ ...form, ...page });
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

  const handlePagintion = (params: any) => {
    if (page) {
      Object.keys(params).forEach((key: string) => {
        if (page[key]) {
          page[key] = params[key];
        }
      });
    }
    getList();
  };

  onMounted(() => {
    getList();
  });

  return {
    ...toRefs(resData),
    isLoading,
    getList,
    handlePagintion,
    form,
    page,
  };
};

export default useTable;
