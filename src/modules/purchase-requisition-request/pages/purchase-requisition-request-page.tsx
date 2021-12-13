import { useState } from "react";
import { Input, Divider, Button } from "antd";
import Title from "antd/lib/typography/Title";

import { IPurchaseRequisitionTemplate } from "@dto/i-purchase-requisition-template.dto";

import PurchaseRequisitionTemplateBrowser from "../components/template-browser/template-browser";
import PurchaseRequisitionRequestConstructor from "../components/request-constructor/request-constructor";

const PurchaseRequisitionRequestPage: React.FC = () => {
  const [selectedTemplate, setSelectedTemplate] = useState<IPurchaseRequisitionTemplate>();
  const [searchText, setSearchText] = useState<string>();

  return (
    <>
      <div className="container-fluid h-100 pb-2">
        <div className="row">
          <div className="col d-flex flex-column justify-content-center">
            <Title level={4}>Purchase Requisition</Title>
          </div>
          <div className="col-7">
            <PurchaseRequisitionTemplateBrowser setSelectedTemplate={setSelectedTemplate} />
          </div>
          <div className="col d-flex flex-column justify-content-center">
            <Input.Search
              placeholder="Search"
              value={searchText}
              onChange={(e) => {
                setSearchText(e.target.value);
              }}
              allowClear
            ></Input.Search>
          </div>
        </div>

        <div className="row">
          <div className="col">
            <PurchaseRequisitionRequestConstructor currentTemplate={selectedTemplate} />
          </div>
        </div>

        <Divider />
        
        <div className="row">
          <div className="col">
            <Button type="primary" size="large">
              Submit Request
            </Button>
          </div>
          <div className="col row ml-auto">
            <span className="w-25">Remarks</span>
            <Input.TextArea className="col" rows={3} placeholder="Remarks here"></Input.TextArea>
          </div>
        </div>
      </div>
    </>
  );
};

export default PurchaseRequisitionRequestPage;
