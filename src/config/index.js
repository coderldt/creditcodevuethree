const config = {
  title: "我的征信",
};
const menu = [
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
        path: "/creditQuery1",
        id: "2-2",
      },
      {
        title: "关系图谱",
        icon: "",
        path: "/creditQuery2",
        id: "2-3",
      },
    ],
  },
];

export { config, menu };
