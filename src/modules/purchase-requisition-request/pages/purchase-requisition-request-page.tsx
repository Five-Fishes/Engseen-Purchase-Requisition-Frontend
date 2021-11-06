import { useState } from "react";
import { Input } from "antd";
import Title from "antd/lib/typography/Title";
import { IPurchaseRequisitionTemplate } from "@dto/i-purchase-requisition-template.dto";
import PurchaseRequisitionTemplateBrowser from "../components/templateBrowser/template-browser";
import PurchaseRequisitionRequestConstructor from "../components/requestConstructor/request-constructor";

const PurchaseRequisitionRequestPage: React.FC = () => {
  const [selectedTemplate, setSelectedTemplate] = useState<IPurchaseRequisitionTemplate>();
  const [searchText, setSearchText] = useState<string>();

  return (
    <>
      <div className="container-fluid h-100">
        <div className="row">
          <div className="col d-flex flex-column justify-content-center">
            <Title level={4}>Purchase Requisition</Title>
          </div>
          <div className="col-7">
            <PurchaseRequisitionTemplateBrowser setSelectedTemplate={setSelectedTemplate} />
          </div>
          <div className="col d-flex flex-column justify-content-center">
            <Input
              placeholder="Search"
              value={searchText}
              onChange={(e) => {
                setSearchText(e.target.value);
              }}
            ></Input>
          </div>
        </div>

        <div className="row">
          <div className="col">
            <PurchaseRequisitionRequestConstructor currentTemplate={selectedTemplate} />
          </div>
        </div>
      </div>
    </>
  );
};

export default PurchaseRequisitionRequestPage;
