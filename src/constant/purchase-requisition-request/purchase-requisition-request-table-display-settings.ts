import { ITableColumnDisplaySettings } from '@dto/i-table-columns';

const DEFAULT_PURCHASE_REQUISITION_REQUEST_TABLE_DISPLAY_SETTINGS: ITableColumnDisplaySettings[] = [
  {
    columnKey: 'sequence',
    settingDisplayName: 'Row',
    visible: true,
    visibilityEditable: true,
  },
  {
    columnKey: 'componentCode',
    settingDisplayName: 'Component Code',
    visible: true,
    visibilityEditable: false,
  },
  {
    columnKey: 'componentName',
    settingDisplayName: 'Component Name',
    visible: true,
    visibilityEditable: true,
  },
  {
    columnKey: 'vendor',
    settingDisplayName: 'Vendor',
    visible: true,
    visibilityEditable: true,
  },
  {
    columnKey: 'balance',
    settingDisplayName: 'Balance Quantity',
    visible: true,
    visibilityEditable: true,
  },
  {
    columnKey: 'packagingSize',
    settingDisplayName: 'Packaging Size',
    visible: true,
    visibilityEditable: true,
  },
  {
    columnKey: 'noOfPacks',
    settingDisplayName: 'No. of Packs',
    visible: true,
    visibilityEditable: true,
  },
  {
    columnKey: 'quantity',
    settingDisplayName: 'Total Quantity',
    visible: true,
    visibilityEditable: true,
  },
  {
    columnKey: 'deliveryDate',
    settingDisplayName: 'Delivery Date',
    visible: true,
    visibilityEditable: true,
  },
  {
    columnKey: 'clearInput',
    settingDisplayName: 'Actions',
    visible: true,
    visibilityEditable: true,
  },
];

export default DEFAULT_PURCHASE_REQUISITION_REQUEST_TABLE_DISPLAY_SETTINGS;
