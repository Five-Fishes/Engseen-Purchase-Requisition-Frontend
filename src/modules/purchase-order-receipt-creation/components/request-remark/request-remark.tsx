import { Form, Input } from "antd";

interface IPurchaseOrderReceiptCreationRequestRemarksProps {
  remarks: string;
  setRemarks: (value: string) => void;
  reference: string;
  setReference: (value: string) => void;
}

const PurchaseOrderReceiptCreationRequestRemarks: React.FC<IPurchaseOrderReceiptCreationRequestRemarksProps> = (props) => {
  const remarks = props.remarks;
  const setRemarks = props.setRemarks;
  const reference = props.reference;
  const setReference = props.setReference;

  return (
    <>
      <div className="d-flex flex-column justify-content-between h-100">
        <Form name="basic" layout="vertical" autoComplete="off">
          <Form.Item label="Reference">
            <Input.TextArea className="remarks-textbox" value={reference} onChange={(e) => setReference(e.target.value)} rows={3} placeholder="Reference here"></Input.TextArea>
          </Form.Item>
          {/* Update Button */}
          <Form.Item label="Remarks">
            <Input.TextArea className="remarks-textbox" value={remarks} onChange={(e) => setRemarks(e.target.value)} rows={3} placeholder="Remarks here"></Input.TextArea>
          </Form.Item>
          {/* Update Button */}
        </Form>
      </div>
    </>
  );
};

export default PurchaseOrderReceiptCreationRequestRemarks;
