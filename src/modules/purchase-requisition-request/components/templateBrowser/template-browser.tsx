import "./template-browser.less";
import { getPurchaseRequisitionTemplate } from "@api/purchase-requisition-template.api";
import { ApiResponseStatus } from "@constant/api-status";
import { IPurchaseRequisitionTemplate } from "@dto/i-purchase-requisition-template.dto";
import { useEffect, useState } from "react";
import { Button } from "antd";

interface IPurchaseRequisitionTemplateProps {
  setSelectedTemplate: (template: IPurchaseRequisitionTemplate) => void;
}

const PurchaseRequisitionTemplateBrowser: React.FC<IPurchaseRequisitionTemplateProps> = (props) => {
  const [purchaseRequisitionTemplates, setPurchaseRequisitionTemplates] = useState([] as IPurchaseRequisitionTemplate[]);
  const [selectedIndex, setSelectedIndex] = useState(0);

  useEffect(() => {
    const getTemplates = async () => {
      const apiResponse = await getPurchaseRequisitionTemplate();
      const apiResponse2 = await getPurchaseRequisitionTemplate();
      const apiResponse3 = await getPurchaseRequisitionTemplate();

      if (apiResponse && apiResponse.status === ApiResponseStatus.SUCCESS) {
        setPurchaseRequisitionTemplates([...apiResponse.data, ...apiResponse2.data, ...apiResponse3.data]);
      }
    };

    getTemplates();
  }, []);

  return (
    <>
      <div className="scrollable-menu d-flex">
        {purchaseRequisitionTemplates.length > 0 &&
          purchaseRequisitionTemplates.map((template, index) => {
            return (
              <Button
                key={index}
                type={selectedIndex === index ? "primary" : "default"}
                shape="round"
                className="m-2"
                size="large"
                onClick={() => {
                  setSelectedIndex(index);
                  props.setSelectedTemplate(template);
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
