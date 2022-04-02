interface Status {
  value: string;
  label: string;
}

const statusList: Array<Status> = [
  { value: "0", label: "全部" },
  { value: "1", label: "正常" },
  { value: "2", label: "停用" },
];

export { statusList };
