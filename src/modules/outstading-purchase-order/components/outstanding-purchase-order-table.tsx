import { Table } from 'antd';

const OutstandingPurchaseOrderTable: React.FC = () => {
  const ds = [{ a: 1 }, { a: 2 }, { a: 3 }, { a: 4 }];

  return (
    <Table dataSource={ds} rowKey={(outstandingPurchaseOrder) => outstandingPurchaseOrder.a}>
      <Table.Column
        key="1"
        title="1"
        render={(value, record: { a: number }, index) => {
          return <div key={index}>{record.a}</div>;
        }}
      />
      <Table.Column
        title="2"
        key="2"
        render={(value, record: { a: number }, index) => {
          return <div key={index}>{record.a}</div>;
        }}
      />
      <Table.Column
        title="3"
        key="3"
        render={(value, record: { a: number }, index) => {
          return <div key={index}>{record.a}</div>;
        }}
      />
      <Table.Column
        title="4"
        key="4"
        render={(value, record: { a: number }, index) => {
          return <div key={index}>{record.a}</div>;
        }}
      />
      <Table.Column
        title="5"
        key="5"
        render={(value, record: { a: number }, index) => {
          return <div key={index}>{record.a}</div>;
        }}
      />
    </Table>
  );
};
export default OutstandingPurchaseOrderTable;
