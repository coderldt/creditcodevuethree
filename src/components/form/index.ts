export interface SelectOptions {
  label: string;
  value: string;
}
export interface Config {
  placeholder?: string;
  columnConfig?: object; // 用户自定义覆盖默认属性
  // select
  optionList?: SelectOptions[];
  // date
  // "date" | "year" | "month" | "day" | "daterange" | "monthrange" | "datetimerange";
  dateType?: string;
  dateStartPlaceHolder?: string;
  dateEndPlaceHolder?: string;
  handleChange?: (e: Event) => any;
}

export interface FormButtonList {
  type: string;
  label: string;
}
