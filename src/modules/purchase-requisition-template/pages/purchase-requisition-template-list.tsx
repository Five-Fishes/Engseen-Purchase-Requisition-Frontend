import React, { useState } from "react";
import { Col, Input, Row, Button } from "antd";
import PurchaseRequisitionTemplateTable from "../components/template-table";
import { IPurchaseRequisitionTemplate } from "@dto/i-purchase-requisition-template.dto";
import Title from "antd/lib/typography/Title";
import PurchaseRequisitionTemplateBrowser from "../components/template-browser";
import CLONING_LIB from "@utils/cloning/cloning-lib-wrapper";

const PurchaseRequisitionTemplateList: React.FC = () => {
  const [selectedPurchaseRequisitionTemplate, setSelectedPurchaseRequisitionTemplate] = useState<IPurchaseRequisitionTemplate>({} as IPurchaseRequisitionTemplate);
  const [searchText, setSearchText] = useState<string>();

  const deleteTemplateItem = (itemIndex: number) => {
    selectedPurchaseRequisitionTemplate.templateItems.splice(itemIndex, 1);
    const deepCopy: IPurchaseRequisitionTemplate = CLONING_LIB.deepClone(selectedPurchaseRequisitionTemplate);
    setSelectedPurchaseRequisitionTemplate(deepCopy);
  };

  return (
    <>
    <div className="container-fluid h-100">
      <div className="d-flex flex-column justify-content-center">
        <Title level={4}>Purchase Requisition Template</Title>
      </div>
      <div>
        <Row>
          <Col span={14}>
            <div className="border-right-2 mx-2">
              <div className="my-2 position-relative">
                <b>{selectedPurchaseRequisitionTemplate.templateName}</b>
                <div className="col d-flex flex-column justify-content-center">
                  <Input.Search
                    allowClear
                    placeholder="Search"
                    bordered={false}
                    value={searchText}
                    onChange={(e: any) => {
                      setSearchText(e.target.value);
                    }}
                    style={{ width: "40%", borderBottom: "1px solid #d9d9d9", position: "absolute", right: "5px" }}
                  />
                </div>
                
              </div>
              <PurchaseRequisitionTemplateTable
                currentTemplate={selectedPurchaseRequisitionTemplate}
                deleteTemplateComponent={deleteTemplateItem} />
            </div>
          </Col>
          <Col span={10}>
            <PurchaseRequisitionTemplateBrowser
              setSelectedTemplate={setSelectedPurchaseRequisitionTemplate} />
            <hr/>
            {/* Excel Upload */}
            <Row>
              <Col span={16}>
                <div className="input-group align-items-center">
                  <Input
                    className="form-control"
                    key="template-excel-input"
                    type="file"
                    onChange={(e: any) => {
                      console.log("File Changed");
                      // setExcelFile(e.target.value);
                    }}
                  />
                  <Button
                    className="input-group-btn mx-1"
                    key="upload-excel-button"
                    type="default"
                    onClick={() => {
                      console.log("Excel Upload");
                    }}>Upload</Button>
                </div>
              </Col>
              <Col span={6} offset={2}>
                <Button
                  className="input-group-btn float-end"
                  key="load-database-button"
                  type="primary"
                  onClick={() => {
                    console.log("Load Database");
                  }}>Load Database</Button>
              </Col>
            </Row>
            {/* Add Component */}
            <div className="mt-5">
              <Row>
                <Col span={16}>
                  <div className="input-group">
                    <Input
                      className="form-control"
                      key="component-input"
                      type="text"
                      placeholder="Component"
                      onChange={(e: any) => {
                        console.log("Component Text");
                      }}
                    />
                  </div>
                  <div className="input-group mt-2">
                    <Input
                      className="form-control"
                      key="vendor-input"
                      type="text"
                      placeholder="Vendor"
                      onChange={(e: any) => {
                        console.log("Vendor Text");
                      }}
                    />
                  </div>
                  <div className="input-group mt-2">
                    <Input
                      className="form-control"
                      key="packing-size-input"
                      type="number"
                      placeholder="Pakcing Size"
                      onChange={(e: any) => {
                        console.log("Packing Size Text");
                      }}
                    />
                  </div>
                </Col>
                <Col span={6} offset={2}>
                  <Button
                    className="input-group-btn float-end"
                    key="load-database-button"
                    type="primary"
                    onClick={() => {
                      console.log("Add Component");
                    }}>Add Component</Button>
                </Col>
              </Row>
            </div>
            <hr/>
            <Button
              key="save-template-button"
              type="primary"
              size="large"
              className="float-end"
              onClick={() => {
                console.log("Save Template")
              }}
            >Save Template</Button>
          </Col>
        </Row>
      </div>
    </div>
    </>
  );
}

export default PurchaseRequisitionTemplateList;
