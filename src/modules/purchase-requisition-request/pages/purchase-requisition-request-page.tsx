import { useState } from "react";
import { Input, Divider, Button } from "antd";
import Title from "antd/lib/typography/Title";
import { IPurchaseRequisitionTemplate } from "@dto/i-purchase-requisition-template.dto";
import PurchaseRequisitionTemplateBrowser from "../components/template-browser/template-browser";
import PurchaseRequisitionRequestConstructor from "../components/request-constructor/request-constructor";
import PurchaseRequisitionColumnFilter from "../components/column-filter/column-filter";
import { IColumnFilter } from "@dto/i-column-filter";

const PurchaseRequisitionRequestPage: React.FC = () => {
  const [selectedTemplate, setSelectedTemplate] = useState<IPurchaseRequisitionTemplate>();
  const [searchText, setSearchText] = useState<string>();
  const [purchaseRequisitionRequestFilterColumn, setPurchaseRequisitionRequestFilterColumn] = useState<IColumnFilter[]>([
    {
      title: "Row",
      dataIndex: "sequence",
      key: "sequence",
    },
    {
      title: "Component ID",
      dataIndex: "componentCode",
      key: "componentCode",
    },
    {
      title: "Component Name",
      dataIndex: "componentName",
      key: "componentName",
    },
    {
      title: "Vendor",
      dataIndex: "vendorName",
      key: "vendorName",
    },
    {
      title: "Balance Qty (kgs)",
      dataIndex: "componentCode",
      key: "componentCode",
    },
    {
      title: "Packing Size (kgs per pack)",
      dataIndex: "packagingSize",
      key: "packagingSize",
    },
    {
      title: "No. of Packs to Order",
      dataIndex: "componentCode",
      key: "componentCode",
    },
    {
      title: "Total Quantity To Order (kgs)",
      dataIndex: "componentCode",
      key: "componentCode",
    },
  ]);

  return (
    <>
      <div className=" d-flex flex-row">
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
              ></Input.Search>
            </div>
          </div>

          <div className="row">
            <div className="col">
              <PurchaseRequisitionRequestConstructor
                currentTemplate={selectedTemplate}
                tableColumn={purchaseRequisitionRequestFilterColumn ?? []}
              />
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
        
        <Divider type="vertical" style={{ height: "100vh" }} />

        <div className="mx-2">
          <PurchaseRequisitionColumnFilter
            purchaseRequisitionRequestFilterColumn={purchaseRequisitionRequestFilterColumn ?? []}
            setPurchaseRequisitionRequestFilterColumn={setPurchaseRequisitionRequestFilterColumn}
          />
        </div>
      </div>
    </>
  );
};

export default PurchaseRequisitionRequestPage;
