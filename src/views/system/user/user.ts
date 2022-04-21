export interface List {
  id?: string;
  loginName?: string;
  userName?: string;
  status?: number | string;
  phone?: string;
  departmentId?: string;
  createTime?: string;
  roleId?: string;
  email?: string;
  desc?: string;
}

export interface Dialog {
  isEdit: boolean;
  data: List;
}

export interface Tree {
  id: string;
  label: string;
  children?: Tree[];
}

export interface Forms {
  name: string;
  status: string;
  createTime: string;
}
