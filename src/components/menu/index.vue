<script lang="tsx">
import { defineComponent, resolveComponent, h, inject, ref } from "vue";
import { menu } from "@/config";
import { collapseKey } from "@/types/symbol";

interface Menu {
  children?: Array<Menu>;
  icon: string;
  title: string;
  path: string;
  id: string;
}

export default defineComponent({
  setup() {
    const baseMenuItem = (props: { icon: string; title: string }) => {
      return (
        <>
          {props.icon && <el-icon>{h(resolveComponent(props.icon))}</el-icon>}
          <span>{props.title}</span>
        </>
      );
    };

    const createItem = (menu: Array<Menu>) => {
      return menu.map((i) => {
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

    const { collapseStatus } = inject(collapseKey, {
      collapseStatus: ref(false),
      onCollapseChange: () => {},
    });
    return () => {
      return (
        <el-menu
          router
          collapse-transition
          collapse={collapseStatus.value}
          class="el-menu-vertical-demo"
        >
          {createItem(menu)}
        </el-menu>
      );
    };
  },
});
</script>
