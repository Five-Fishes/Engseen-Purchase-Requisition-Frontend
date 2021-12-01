import "./template-browser.less";
import { getPurchaseRequisitionTemplate } from "@api/purchase-requisition-template.api";
import { ApiResponseStatus } from "@constant/api-status";
import { IPurchaseRequisitionTemplate } from "@dto/i-purchase-requisition-template.dto";
import { useEffect, useState } from "react";
import { Button } from "antd";
import CLONING_LIB from "@utils/cloning/cloning-lib-wrapper";

interface IPurchaseRequisitionTemplateProps {
  setSelectedTemplate: (template: IPurchaseRequisitionTemplate) => void;
}

const PurchaseRequisitionTemplateBrowser: React.FC<IPurchaseRequisitionTemplateProps> = (props) => {
  const [purchaseRequisitionTemplates, setPurchaseRequisitionTemplates] = useState<IPurchaseRequisitionTemplate[]>();
  const [selectedIndex, setSelectedIndex] = useState(-1);

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
      <div className="scrollable-menu d-flex">
        {purchaseRequisitionTemplates &&
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
