export interface TableColumn {
  label: string;
  prop?: string;
  width?: string | number;
  align?: "left" | "center" | "right";
  slot?: string;
}

export interface Pagination {
  pageNum: number;
  pageSize: number;
  total: number;
  pageSizes: number[];
}
