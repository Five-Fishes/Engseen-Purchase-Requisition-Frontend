export interface ITableColumn {
  [columnKey: string]: JSX.Element;
}

export interface ITableColumnDisplaySettings {
  columnKey: string;
  settingDisplayName?: string;
  visible: boolean;
  visibilityEditable: boolean;
}
