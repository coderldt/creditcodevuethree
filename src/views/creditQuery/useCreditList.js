import { ref } from "vue";
import { getCredit } from "@/apis/creditQuery";

export default function useCreditList() {
  const search = ref("");
  const list = ref([]);
}
