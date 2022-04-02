import { isReactive, reactive } from "vue";

const useReactive = (data: any) => {
  if (isReactive(data)) {
    return data;
  } else {
    return reactive(data);
  }
};

export default useReactive;
