import { reactive, ref } from "vue";
// import { getCredit } from "@/apis/creditQuery";

export default function useCreditList() {
  const search = ref("");

  const list = reactive([]);

  const onSearch = async () => {
    console.log(1);
    // const res = await getCredit({ search: search.value });
    // if (res && res.data) {
    list.push({ title: search.value, id: "123", value: 20 });
    // }
  };

  return {
    search,
    list,
    onSearch,
  };
}
