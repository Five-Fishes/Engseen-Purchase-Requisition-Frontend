import { getPurchaseRequisitionTemplate } from "@api/purchase-requisition-template.api";
import { ApiResponseStatus } from "@constant/api-status";
import { IPurchaseRequisitionTemplate } from "@dto/i-purchase-requisition-template.dto";
import { useEffect, useState } from "react";
import { Button, Input, Row, Col } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import CLONING_LIB from "@utils/cloning/cloning-lib-wrapper";

interface IPurchaseRequisitionTemplateProps {
  setSelectedTemplate: (template: IPurchaseRequisitionTemplate) => void;
}

const PurchaseRequisitionTemplateBrowser: React.FC<IPurchaseRequisitionTemplateProps> = (props) => {
  const [purchaseRequisitionTemplates, setPurchaseRequisitionTemplates] = useState<IPurchaseRequisitionTemplate[]>();
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [newTemplateText, setNewTemplateText] = useState("");

  useEffect(() => {
    const getTemplates = async () => {
      const apiResponse = await getPurchaseRequisitionTemplate();

      if (apiResponse && apiResponse.status === ApiResponseStatus.SUCCESS) {
        setPurchaseRequisitionTemplates(apiResponse.data);
      }
    };
    getTemplates();
  }, []);

  return (
    <>
      <Row>
        <Col span={14}>
          <div className="input-group align-items-center h-100">
            <Input
              className="form-control"
              key="new-template-input"
              placeholder="Create New Template"
              value={newTemplateText}
              onChange={(e: any) => {
                setNewTemplateText(e.target.value);
              }}
            />
            <Button
              className="input-group-btn mx-1"
              key="create-new-template-button"
              type="primary"
              onClick={() => {
                console.log("Create New Template");
              }}>Create</Button>
          </div>
        </Col>
        <Col span={8} offset={2}>
          <Button
            className="input-group-btn float-end"
            key="create-new-template-button"
            type="default"
            onClick={() => {
              console.log("Delete Template");
            }}><DeleteOutlined />Delete Template</Button>
        </Col>
      </Row>
      <div className="scrollable-menu d-inline-block text-center">
        {purchaseRequisitionTemplates &&
          purchaseRequisitionTemplates.map((template, index) => {
            return (
              <Button
                key={index}
                type={selectedIndex === index ? "primary" : "default"}
                shape="round"
                className="m-2"
                size="middle"
                onClick={() => {
                  setSelectedIndex(index);
                  const deepCopy: IPurchaseRequisitionTemplate = CLONING_LIB.deepClone(template);
                  props.setSelectedTemplate(deepCopy);
                }}
              >
                {template.templateName}
              </Button>
            );
          })}
      </div>
    </>
  );
};

export default PurchaseRequisitionTemplateBrowser;
