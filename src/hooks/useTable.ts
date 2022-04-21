import { onMounted, reactive, Ref, ref, toRefs } from "vue";
import { ElMessage } from "element-plus";
import { Pagination } from "@/components/table/table";
import useReactive from "./useReactive";
import { DEFAULT_FORM, DEFAULT_PAGE, PAGE_KEY, PAGE_SIZE_KEY, PAGE_SIZES_KEY } from "@/config/dist";

interface Params {
  api: Function;
  defaultValues?: Object;
  isPage?: Boolean;
  handleSusscee?: Function;
  handleError?: Function;
}

interface Options {
  immediate: Boolean;
}

interface ListQuery {
  form: any;
  page: Pagination;
}
interface Result {
  data: any;
  isLoading: Ref<Boolean>;
  getList: Function;
  handleQuery: Function;
  handlePagination: Function;
}

const defaultOptions = {
  immediate: true,
};

const useTable = (params: Params, options: Options = defaultOptions): Result => {
  const { api, defaultValues = {}, isPage = true, handleSusscee, handleError } = params;
  const listQuery = reactive<ListQuery>({
    form: defaultValues,
    page: DEFAULT_PAGE,
  });

  let isLoading = ref(false);
  let resData = reactive({
    data: {},
  });

  const getList = async () => {
    isLoading.value = true;
    const params = { ...listQuery.form };
    if (isPage) {
      params[PAGE_KEY] = listQuery.page[PAGE_KEY];
      params[PAGE_SIZE_KEY] = listQuery.page[PAGE_SIZE_KEY];
      params[PAGE_SIZES_KEY] = listQuery.page[PAGE_SIZES_KEY];
    }

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

  const handleQuery = (params: any) => {
    listQuery.form = params;
    listQuery.page[PAGE_KEY] = 1;
    getList();
  };

  const handlePagination = (params: any) => {
    listQuery.page = { ...listQuery.page, ...params };
    getList();
  };

  onMounted(() => {
    if (options.immediate) {
      getList();
    }
  });

  return {
    ...toRefs(resData),
    isLoading,
    getList,
    handleQuery,
    handlePagination,
  };
};

export default useTable;
