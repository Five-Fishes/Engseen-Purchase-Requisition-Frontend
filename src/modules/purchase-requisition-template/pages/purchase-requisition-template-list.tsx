import React, { useState } from "react";
import { Col, Form, Input, Row, Button, InputNumber, Modal, Space, Divider } from "antd";
import PurchaseRequisitionTemplateTable from "../components/template-table";
import { IPurchaseRequisitionTemplate } from "@dto/i-purchase-requisition-template.dto";
import Title from "antd/lib/typography/Title";
import PurchaseRequisitionTemplateBrowser from "../components/template-browser";
import { genereateIndex } from "../components/template-indexer";
import CLONING_LIB from "@utils/cloning/cloning-lib-wrapper";
import readXlsxFile from "read-excel-file";
import { SearchEngine } from "@utils/search/native-search";
import { IPurchaseRequisitionTemplateItem } from "@dto/i-purchase-requisition-template-item.dto";
import { EditOutlined } from "@ant-design/icons";
import { popNotification } from "@module/shared/components/notification";
import { NotificationType } from "@constant/notification.enum";

const PurchaseRequisitionTemplateList: React.FC = () => {
  const [selectedPurchaseRequisitionTemplate, setSelectedPurchaseRequisitionTemplate] = useState<IPurchaseRequisitionTemplate>({} as IPurchaseRequisitionTemplate);
  const [filteredTemplateItems, setFilteredTemplateItems] = useState<IPurchaseRequisitionTemplateItem[]>();
  
  const [excelFile, setExcelFile] = useState<File>();
  const [excelData, setExcelData] = useState<Array<any>>([]);
  
  const [searchText, setSearchText] = useState<string>("");
  const searchEngine: SearchEngine<IPurchaseRequisitionTemplateItem> = new SearchEngine([], genereateIndex);
  
  const [editTemplateNameModal, setEditTemplateNameModal] = useState<boolean>(false);
  const [newTemplateName, setNewTemplateName] = useState<string>("");

  const search = () => {
    const filteredData = searchEngine.updateEngine(selectedPurchaseRequisitionTemplate.templateItems).search(searchText);
    setFilteredTemplateItems(filteredData);
  };

  const changeTemplateNameModal = () => {
    setNewTemplateName(selectedPurchaseRequisitionTemplate.templateName);
    setEditTemplateNameModal(true);
  };

  const closeTemplateNameModal = () => {
    setNewTemplateName("");
    setEditTemplateNameModal(false);
  };

  const editTemplateName = () => {
    if (newTemplateName.trim() !== "") {
      selectedPurchaseRequisitionTemplate.templateName = newTemplateName;
      const deepCopy: IPurchaseRequisitionTemplate = CLONING_LIB.deepClone(selectedPurchaseRequisitionTemplate);
      setSelectedPurchaseRequisitionTemplate(deepCopy);
    }
    closeTemplateNameModal();
    popNotification("Success Edit Template", NotificationType.success);
  };

  const deleteTemplateItem = (itemIndex: number) => {
    selectedPurchaseRequisitionTemplate.templateItems.splice(itemIndex, 1);
    const deepCopy: IPurchaseRequisitionTemplate = CLONING_LIB.deepClone(selectedPurchaseRequisitionTemplate);
    setSelectedPurchaseRequisitionTemplate(deepCopy);
    popNotification("Success Delete Component", NotificationType.success);
  };

  const uploadExcelFile = (): void => {
    if (excelFile !== undefined) {
      readXlsxFile(excelFile).then((rows) => {
        // Convert to Array of JSON Object
        setExcelData(rows);
        popNotification("Success Upload Excel", NotificationType.success);
      })
    }
  };

  const loadDatabaseWithExcelData = (): void => {
    console.log("Load Database");
    console.log(excelData);
  };

  const addNewComponentAsTemplateItem = (values: any): void => {
    console.log("Add Component to Template ", values);
    const lastIndex = selectedPurchaseRequisitionTemplate.templateItems.length > 0 ? selectedPurchaseRequisitionTemplate.templateItems.length : 1;
    const newTemplateItem: IPurchaseRequisitionTemplateItem = {
      ...values,
      sequence: lastIndex
    };
    selectedPurchaseRequisitionTemplate.templateItems.push(newTemplateItem);
    const deepCopy: IPurchaseRequisitionTemplate = CLONING_LIB.deepClone(selectedPurchaseRequisitionTemplate);
    setSelectedPurchaseRequisitionTemplate(deepCopy);
    popNotification("Success Add Component", NotificationType.success);
  };

  const formValidationFailed = (errorInfo: any): void => {
    console.log("Failed ", errorInfo);
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
                <b className="d-inline-flex align-items-center">
                  {selectedPurchaseRequisitionTemplate.templateName}&nbsp;
                  <EditOutlined className="cursor-pointer" onClick={changeTemplateNameModal}  hidden={selectedPurchaseRequisitionTemplate.templateName === undefined} />
                </b>
                <div className="col d-flex flex-column justify-content-center">
                  <Input.Search
                    allowClear
                    placeholder="Search"
                    bordered={false}
                    value={searchText}
                    onChange={(e: any) => setSearchText(e.target.value)}
                    onSearch={search}
                    style={{ width: "40%", borderBottom: "1px solid #d9d9d9", position: "absolute", right: "5px" }}
                  />
                </div>
                
              </div>
              <PurchaseRequisitionTemplateTable
                currentTemplate={selectedPurchaseRequisitionTemplate}
                deleteTemplateComponent={deleteTemplateItem}
                filteredItems={filteredTemplateItems} />
            </div>
          </Col>
          <Col span={10}>
            <PurchaseRequisitionTemplateBrowser
              setSelectedTemplate={setSelectedPurchaseRequisitionTemplate} />
            <Divider />
            {/* Excel Upload */}
            <Row>
              <Col span={16}>
                <div className="input-group align-items-center">
                  <Input
                    className="form-control"
                    key="template-excel-input"
                    type="file"
                    onChange={(e: any) => setExcelFile(e.target.files[0])}
                  />
                  <Button
                    className="input-group-btn mx-1"
                    key="upload-excel-button"
                    type="default"
                    onClick={() => uploadExcelFile()}
                  >Upload</Button>
                </div>
              </Col>
              <Col span={6} offset={2}>
                <Button
                  className="input-group-btn float-end"
                  key="load-database-button"
                  type="primary"
                  onClick={() => loadDatabaseWithExcelData()}
                >Load Database</Button>
              </Col>
            </Row>
            {/* Add Component */}
            <div className="mt-5">
              <Form onFinish={addNewComponentAsTemplateItem} onFinishFailed={formValidationFailed}>
                <Row>
                  <Col span={16}>
                    <Form.Item className="input-group" name="componentCode" rules={[
                      { required: true, message: "Enter component code"},
                    ]}>
                      <Input
                        key="component-input"
                        type="text"
                        placeholder="Component"
                      />
                    </Form.Item>
                    <Form.Item className="input-group" name="vendorId" rules={[
                      { required: true, message: "Enter vendor ID"},
                    ]}>
                      <Input
                        key="vendor-input"
                        type="text"
                        placeholder="Vendor"
                      />
                    </Form.Item>
                    <Form.Item className="input-group" name="packagingSize" rules={[
                      { required: true, message: "Enter packing size"},
                      { type: "number", min: 1, message: "Packing Size must be positive"}
                    ]}>
                      <InputNumber
                        className="w-100"
                        key="packing-size-input"
                        placeholder="Packing Size"
                      />
                    </Form.Item>
                  </Col>
                  <Col span={6} offset={2}>
                    <Form.Item>
                      <Button
                        className="input-group-btn float-end"
                        key="load-database-button"
                        type="primary"
                        htmlType="submit"
                      >Add Component</Button>
                    </Form.Item>
                  </Col>
                </Row>
              </Form>
            </div>
            <Divider />
            <Button
              key="save-template-button"
              type="primary"
              size="large"
              className="float-end mb-2"
              onClick={() => {
                console.log("Save Template")
              }}
            >Save Template</Button>
          </Col>
        </Row>
      </div>
    </div>
    <Modal title="Edit Template Name"
      key="edit-templateName-modal"
      visible={editTemplateNameModal}
      footer={null}
      onCancel={closeTemplateNameModal}>
      <Form onFinish={editTemplateName}>
        <Form.Item label='Template Name'>
          <Input placeholder='name' value={newTemplateName} onChange={ (e) => setNewTemplateName(e.target.value) } />
        </Form.Item>
        <Form.Item className="text-center mt-3">
          <Space className="">
            <Button htmlType="button" onClick={closeTemplateNameModal}>Cancel</Button>
            <Button htmlType="submit" type="primary">Submit</Button>
          </Space>
        </Form.Item>
      </Form>
    </Modal>
    </>
  );
}

export default PurchaseRequisitionTemplateList;
