import { CheckCircleOutlined } from "@ant-design/icons";
import { Button } from "antd";

const PurchaseRequisitionSelector: React.FC = () => {
  const APPROVAL_LIST: any[] = [];
  for (let index = 0; index < 20; index++) {
    APPROVAL_LIST.push({ date: new Date(), approved: index > 3 });
  }
  return (
    <>
      <div className="d-flex flex-column scrollable-menu" style={{ maxHeight: "350px" }}>
        {APPROVAL_LIST.map((element, index) => (
          <Button className="m-2" shape="round" size="large" key={index}>
            {element.date.toDateString()} {element.approved && <CheckCircleOutlined style={{ color: "#22A70C", transform: "translateY(-3px)" }} />}
          </Button>
        ))}
      </div>
    </>
  );
};

export default PurchaseRequisitionSelector;
