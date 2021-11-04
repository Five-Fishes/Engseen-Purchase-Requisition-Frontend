import { useState } from "react";
import { IPurchaseRequisitionTemplate } from "@dto/i-purchase-requisition-template.dto";
import PurchaseRequisitionTemplateBrowser from "../components/templateBrowser/template-browser";
import Title from "antd/lib/typography/Title";

const PurchaseRequisitionRequestPage: React.FC = () => {
  const [selectedTemplate, setSelectedTemplate] = useState({} as IPurchaseRequisitionTemplate);

  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <div className="col d-flex flex-column justify-content-center">
            <Title level={4}>Purchase Requisition</Title>
          </div>
          <div className="col-7">
            <PurchaseRequisitionTemplateBrowser setSelectedTemplate={setSelectedTemplate} />
          </div>
          <div className="col">search bar here</div>
        </div>

        <div className="row">
          <div className="col">
            {selectedTemplate &&
              selectedTemplate.templateItems.map((item) => {
                return <div>{JSON.stringify(item)}</div>;
              })}
          </div>
        </div>
      </div>
    </>
  );
};

export default PurchaseRequisitionRequestPage;
