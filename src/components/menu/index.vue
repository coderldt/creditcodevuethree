<script>
import { defineComponent } from "vue";
import { menu } from "@/config/";
export default defineComponent({
  setup() {
    // const initMenu = (item) => {};
    // const isCollapse = () => {
    //   return true;
    // };

    const createItem = (item) => {
      const title = (props) => (
        <>
          <el-icon>
            <component is={props.icon}></component>
          </el-icon>
          <span>{props.title}</span>
        </>
      );
      const data = (
        <>
          {item.map((i) => {
            return (
              <el-sub-menu>
                {{
                  title: (props) => title(props),
                }}
                {i.children && i.children.length > 0 && createItem(i.children)}
              </el-sub-menu>
            );
          })}
        </>
      );
      console.log(data);
      return data;
    };
    return () => {
      return (
        <>
          <el-menu default-active="2" class="el-menu-vertical-demo">
            {createItem(menu)}
          </el-menu>
        </>
      );
    };
  },
});
</script>

<style lang="less" scoped></style>
