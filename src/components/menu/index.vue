<script>
import { defineComponent, resolveComponent, h, inject, ref, nextTick, watch } from "vue";
import { menu } from "@/config/";
import { useRoute } from "vue-router";
export default defineComponent({
  setup() {
    const baseMenuItem = (props) => {
      return (
        <>
          {props.icon && <el-icon>{h(resolveComponent(props.icon))}</el-icon>}
          <span>{props.title}</span>
        </>
      );
    };

    const createItem = (item) => {
      return item.map((i) => {
        if (i.children && i.children.length > 0) {
          return (
            <el-sub-menu index={i.path}>
              {{
                title: () => baseMenuItem(i),
                default: () => createItem(i.children),
              }}
            </el-sub-menu>
          );
        } else {
          return <el-menu-item index={i.path}>{baseMenuItem(i)}</el-menu-item>;
        }
      });
    };

    const router = useRoute();
    const defaultActivePath = ref("");
    setTimeout(() => {
      defaultActivePath.value = router.path;
    }, 500);

    const { collapseStatus } = inject("collapse");
    return () => {
      return (
        <el-menu router default-active={defaultActivePath.value} collapse-transition collapse={collapseStatus.value} class="el-menu-vertical-demo">
          {createItem(menu)}
        </el-menu>
      );
    };
  },
});
</script>

<style lang="less" scoped></style>
