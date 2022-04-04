import { IPurchaseOrderItem } from '@dto/i-purchase-order-item.dto';
import { Table } from 'antd';

interface IOutstandingPurchaseOrderTableProps {
  outstandingPurchaseOrderSearchResult?: IPurchaseOrderItem[];
  outstandingPurchaseOrderTableColumnSetting: any;
}

const OutstandingPurchaseOrderTable: React.FC<IOutstandingPurchaseOrderTableProps> = (props) => {
  const outstandingPurchaseOrderSearchResult = props.outstandingPurchaseOrderSearchResult;

  return (
    <Table dataSource={outstandingPurchaseOrderSearchResult} rowKey={(outstandingPurchaseOrder) => outstandingPurchaseOrder.id}>
      <Table.Column
        title="Vendor"
        key="vendorName"
        render={(value, record: IPurchaseOrderItem, index) => {
          return <div key={index}>{record.vendorName}</div>;
        }}
      />
      <Table.Column
        title="PO Number"
        key="poNumber"
        render={(value, record: IPurchaseOrderItem, index) => {
          return <div key={index}>{record.poNumber}</div>;
        }}
      />
      <Table.Column
        title="Component ID"
        key="componentCode"
        render={(value, record: IPurchaseOrderItem, index) => {
          return <div key={index}>{record.componentCode}</div>;
        }}
      />
      <Table.Column
        title="Component Name"
        key="componentName"
        render={(value, record: IPurchaseOrderItem, index) => {
          return <div key={index}>{record.componentName}</div>;
        }}
      />
      <Table.Column
        title="Order Qty (kgs)"
        key="orderQuantity"
        render={(value, record: IPurchaseOrderItem, index) => {
          return <div key={index}>{record.orderQuantity}</div>;
        }}
      />
      <Table.Column
        title="Order Qty (packs)"
        key="orderQuantityPack"
        render={(value, record: IPurchaseOrderItem, index) => {
          return <div key={index}>{record.orderQuantityPack}</div>;
        }}
      />
      <Table.Column
        title="Received Qty (kgs)"
        key="receivedQuantity"
        render={(value, record: IPurchaseOrderItem, index) => {
          return <div key={index}>{record.receivedQuantity}</div>;
        }}
      />
      <Table.Column
        title="Received Qty (packs)"
        key="receivedQuantityPack"
        render={(value, record: IPurchaseOrderItem, index) => {
          return <div key={index}>{record.receivedQuantityPack}</div>;
        }}
      />
      <Table.Column
        title="Open Qty (kgs)"
        key="openQuantity"
        render={(value, record: IPurchaseOrderItem, index) => {
          return <div key={index}>{record.openQuantity}</div>;
        }}
      />
      <Table.Column
        title="Open Qty (packs)"
        key="openQuantityPack"
        render={(value, record: IPurchaseOrderItem, index) => {
          return <div key={index}>{record.openQuantityPack}</div>;
        }}
      />
      <Table.Column
        title="Delivery Date"
        key="deliveryDate"
        render={(value, record: IPurchaseOrderItem, index) => {
          return <div key={index}>{record.deliveryDate}</div>;
        }}
      />
      <Table.Column
        title="Remarks"
        key="remarks"
        render={(value, record: IPurchaseOrderItem, index) => {
          return <div key={index}>{record.remarks}</div>;
        }}
      />
    </Table>
  );
};
export default OutstandingPurchaseOrderTable;
