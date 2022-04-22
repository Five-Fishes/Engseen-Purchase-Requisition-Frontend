import { IPurchaseOrderItem } from '@dto/i-purchase-order-item.dto';
import DynamicColumnTable, { DynamicColumn } from '@module/shared/components/dynamic-column-table/dynamic-column-table';
import { convertToLocalString } from '@utils/date-time/date-time-format';
import { Dispatch, SetStateAction } from 'react';

interface IOutstandingPurchaseOrderByVendorTable {
  outstandingPurchaseOrderSearchResult?: IPurchaseOrderItem[];
  outstandingPurchaseOrderTableColumnSettingVisible: boolean;
  setOutstandingPurchaseOrderTableColumnSettingVisible: Dispatch<SetStateAction<boolean>>;
}

const OutstandingPurchaseOrderByVendorTable: React.FC<IOutstandingPurchaseOrderByVendorTable> = (props) => {
  return (
    <DynamicColumnTable
      drawerWidth={400}
      tableKey="OutstandingPurchaseOrderByVendor"
      dataSource={props.outstandingPurchaseOrderSearchResult}
      visible={props.outstandingPurchaseOrderTableColumnSettingVisible}
      setVisible={props.setOutstandingPurchaseOrderTableColumnSettingVisible}
    >
      <DynamicColumn
        title="Vendor"
        key="vendorName"
        render={(value, record: IPurchaseOrderItem, index) => {
          return <div key={index}>{record.vendorName}</div>;
        }}
        columnKey="vendorName"
      />
      <DynamicColumn
        title="PO Number"
        key="poNumber"
        render={(value, record: IPurchaseOrderItem, index) => {
          return <div key={index}>{record.poNumber}</div>;
        }}
        columnKey="poNumber"
      />
      <DynamicColumn
        title="Component ID"
        key="componentCode"
        render={(value, record: IPurchaseOrderItem, index) => {
          return <div key={index}>{record.componentCode}</div>;
        }}
        columnKey="componentCode"
      />
      <DynamicColumn
        title="Component Name"
        key="componentName"
        render={(value, record: IPurchaseOrderItem, index) => {
          return <div key={index}>{record.componentName}</div>;
        }}
        columnKey="componentName"
      />
      <DynamicColumn
        title="Order Qty (kgs)"
        key="orderQuantity"
        render={(value, record: IPurchaseOrderItem, index) => {
          return <div key={index}>{record.orderQuantity}</div>;
        }}
        columnKey="orderQuantity"
      />
      <DynamicColumn
        title="Order Qty (packs)"
        key="orderQuantityPack"
        render={(value, record: IPurchaseOrderItem, index) => {
          return <div key={index}>{record.orderQuantityPack}</div>;
        }}
        columnKey="orderQuantityPack"
      />
      <DynamicColumn
        title="Received Qty (kgs)"
        key="receivedQuantity"
        render={(value, record: IPurchaseOrderItem, index) => {
          return <div key={index}>{record.receivedQuantity}</div>;
        }}
        columnKey="receivedQuantity"
      />
      <DynamicColumn
        title="Received Qty (packs)"
        key="receivedQuantityPack"
        render={(value, record: IPurchaseOrderItem, index) => {
          return <div key={index}>{record.receivedQuantityPack}</div>;
        }}
        columnKey="receivedQuantityPac"
      />
      <DynamicColumn
        title="Open Qty (kgs)"
        key="openQuantity"
        render={(value, record: IPurchaseOrderItem, index) => {
          return <div key={index}>{record.openQuantity}</div>;
        }}
        columnKey="openQuantity"
      />
      <DynamicColumn
        title="Open Qty (packs)"
        key="openQuantityPack"
        render={(value, record: IPurchaseOrderItem, index) => {
          return <div key={index}>{record.openQuantityPack}</div>;
        }}
        columnKey="openQuantityPack"
      />
      <DynamicColumn
        title="Delivery Date"
        key="deliveryDate"
        render={(value, record: IPurchaseOrderItem, index) => {
          return <div key={index}>{convertToLocalString(record.deliveryDate)}</div>;
        }}
        columnKey="deliveryDate"
      />
      <DynamicColumn
        title="Remarks"
        key="remarks"
        render={(value, record: IPurchaseOrderItem, index) => {
          return <div key={index}>{record.remarks}</div>;
        }}
        columnKey="remarks"
      />
    </DynamicColumnTable>
  );
};
export default OutstandingPurchaseOrderByVendorTable;
