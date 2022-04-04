import { ITableColumnDisplaySettings } from '@dto/i-table-columns';

const DEFAULT_PURCHASE_ORDER_RECEIPT_CREATION_TABLE_DISPLAY_SETTINGS: ITableColumnDisplaySettings[] = [
  {
    columnKey: 'poNumber',
    settingDisplayName: 'PO Number',
    visible: true,
    visibilityEditable: true,
  },
  {
    columnKey: 'componentCode',
    settingDisplayName: 'Component Code',
    visible: false,
    visibilityEditable: true,
  },
  {
    columnKey: 'componentName',
    settingDisplayName: 'Component Name',
    visible: true,
    visibilityEditable: true,
  },
  {
    columnKey: 'orderQuantity',
    settingDisplayName: 'Ordered Qty(kgs)',
    visible: false,
    visibilityEditable: true,
  },
  {
    columnKey: 'orderQuantityPack',
    settingDisplayName: 'Ordered Qty(packs)',
    visible: false,
    visibilityEditable: true,
  },
  {
    columnKey: 'receivedQuantity',
    settingDisplayName: 'Received Qty(kgs)',
    visible: false,
    visibilityEditable: true,
  },
  {
    columnKey: 'receivedQuantityPack',
    settingDisplayName: 'Received Qty(packs)',
    visible: false,
    visibilityEditable: true,
  },
  {
    columnKey: 'openQuantity',
    settingDisplayName: 'Open Qty(kgs)',
    visible: false,
    visibilityEditable: true,
  },
  {
    columnKey: 'openQuantityPack',
    settingDisplayName: 'Open Qty(packs)',
    visible: false,
    visibilityEditable: true,
  },
  {
    columnKey: 'receivingQuantity',
    settingDisplayName: 'Receiving Qty(kgs)',
    visible: true,
    visibilityEditable: true,
  },
  {
    columnKey: 'receivingQuantityPack',
    settingDisplayName: 'Receiving Qty(packs)',
    visible: true,
    visibilityEditable: true,
  },
  {
    columnKey: 'uom',
    settingDisplayName: 'UOM (kgs)',
    visible: true,
    visibilityEditable: true,
  },
  {
    columnKey: 'uomPack',
    settingDisplayName: 'UOM (packs)',
    visible: true,
    visibilityEditable: true,
  },
  {
    columnKey: 'status',
    settingDisplayName: 'Issue Receiving',
    visible: true,
    visibilityEditable: false,
  },
];

export default DEFAULT_PURCHASE_ORDER_RECEIPT_CREATION_TABLE_DISPLAY_SETTINGS;
