interface config {
  title: string
}

interface Menu {
  title: string,
  icon: string,
  path?: string,
  id: string,
  children?: Array<Menu>
}

const config: config = {
  title: "我的征信",
};

const menu: Array<Menu> = [
  {
    title: "首页",
    icon: "House",
    path: "/",
    id: "1",
  },
  {
    title: "征信查询",
    icon: "Search",
    path: "/",
    id: "2",
    children: [
      {
        title: "企业查询",
        icon: "",
        path: "/creditQuery",
        id: "2-1",
      },
      {
        title: "征信报告",
        icon: "",
        path: "/creditReport",
        id: "2-2",
      },
      {
        title: "关系图谱",
        icon: "",
        path: "/relationship",
        id: "2-3",
      },
    ],
  },
];

export { config, menu };