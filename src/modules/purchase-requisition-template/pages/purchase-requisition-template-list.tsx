import React, { useState } from 'react'
import { Col, Form, Input, Row, Button, InputNumber, Modal, Space, Divider, Radio } from 'antd'
import PurchaseRequisitionTemplateTable from '../components/template-table'
import { IPurchaseRequisitionTemplate } from '@dto/i-purchase-requisition-template.dto'
import Title from 'antd/lib/typography/Title'
import PurchaseRequisitionTemplateBrowser from '../components/template-browser'
import { generateIndex } from '../components/template-indexer'
import CLONING_LIB from '@utils/cloning/cloning-lib-wrapper'
import readXlsxFile from 'read-excel-file'
import { getSearchText, SearchEngine } from '@utils/search/native-search'
import { IPurchaseRequisitionTemplateItem } from '@dto/i-purchase-requisition-template-item.dto'
import { EditOutlined } from '@ant-design/icons'
import { popNotification } from '@module/shared/components/notification'
import { ApiResponseStatus } from '@constant/api-status.enum'
import { getItemBySearch } from '@api/purchase-requisition-template.api'
import { NotificationType } from '@constant/notification.enum'

const PurchaseRequisitionTemplateList: React.FC = () => {
  const [selectedPurchaseRequisitionTemplate, setSelectedPurchaseRequisitionTemplate] = useState<IPurchaseRequisitionTemplate>({} as IPurchaseRequisitionTemplate)
  const [filteredTemplateItems, setFilteredTemplateItems] = useState<IPurchaseRequisitionTemplateItem[]>()

  const [excelFile, setExcelFile] = useState<File>()
  const [excelData, setExcelData] = useState<Array<any>>([])

  const [searchText, setSearchText] = useState<string>('')
  const searchEngine: SearchEngine<IPurchaseRequisitionTemplateItem> = new SearchEngine([], generateIndex)

  const [editTemplateNameModal, setEditTemplateNameModal] = useState<boolean>(false)
  const [newTemplateName, setNewTemplateName] = useState<string>('')

  const [templateInsertItemSelect, setTemplateInsertItemSelect] = useState<boolean>(false)
  const [insertItemOptions, setInsertItemOptions] = useState<IPurchaseRequisitionTemplateItem[]>()
  const [insertItemsForm] = Form.useForm()

  const search = () => {
    const sanitisedSearchText: string = getSearchText(searchText)
    const filteredData = searchEngine.updateEngine(selectedPurchaseRequisitionTemplate.templateItems).search(sanitisedSearchText)
    setFilteredTemplateItems(filteredData)
  }

  const changeTemplateNameModal = () => {
    setNewTemplateName(selectedPurchaseRequisitionTemplate.templateName)
    setEditTemplateNameModal(true)
  }

  const closeTemplateNameModal = () => {
    setNewTemplateName('')
    setEditTemplateNameModal(false)
  }

  const editTemplateName = () => {
    if (newTemplateName.trim() !== '') {
      selectedPurchaseRequisitionTemplate.templateName = newTemplateName
      const deepCopy: IPurchaseRequisitionTemplate = CLONING_LIB.deepClone(selectedPurchaseRequisitionTemplate)
      setSelectedPurchaseRequisitionTemplate(deepCopy)
    }
    closeTemplateNameModal()
    popNotification('Success Edit Template', NotificationType.success)
  }

  const deleteTemplateItem = (itemIndex: number) => {
    selectedPurchaseRequisitionTemplate.templateItems.splice(itemIndex, 1)
    const sortedResult = updateTemplateItemsSequence(selectedPurchaseRequisitionTemplate.templateItems)
    selectedPurchaseRequisitionTemplate.templateItems = sortedResult
    const deepCopy: IPurchaseRequisitionTemplate = CLONING_LIB.deepClone(selectedPurchaseRequisitionTemplate)
    setSelectedPurchaseRequisitionTemplate(deepCopy)
    popNotification('Success Delete Component', NotificationType.success)
  }

  const uploadExcelFile = (): void => {
    if (excelFile !== undefined) {
      readXlsxFile(excelFile).then((rows) => {
        // Convert to Array of JSON Object
        setExcelData(rows)
        popNotification('Success Upload Excel', NotificationType.success)
      })
    }
  }

  const loadDatabaseWithExcelData = (): void => {
    console.log('Load Database')
    console.log(excelData)
  }

  const getItems = async (component: string, vendor: string, packingSize?: number) => {
    const apiResponse = await getItemBySearch(component, vendor, packingSize)

    if (apiResponse && apiResponse.status === ApiResponseStatus.SUCCESS) {
      setInsertItemOptions(apiResponse.data)
    }
  }

  const addNewComponentAsTemplateItem = (values: any): void => {
    if (Boolean(selectedPurchaseRequisitionTemplate.templateName)) {
      getItems(values.componentCode, values.vendorId, values.packingSize).then(() => {
        setTemplateInsertItemSelect(true)
      })
    }
  }

  const formValidationFailed = (errorInfo: any): void => {
    console.log('Failed ', errorInfo)
  }

  const closeTemplateInsertItemSelectModal = (): void => {
    setTemplateInsertItemSelect(false)
  }

  const insertItemToTemplate = (values: any): void => {
    const itemToInsert: IPurchaseRequisitionTemplateItem = {
      ...values.selectedItem,
      sequence: values.itemSequence,
    }
    const insertIndex: number =
      values.itemSequence === 0 || values.itemSequence > selectedPurchaseRequisitionTemplate.templateItems.length ? selectedPurchaseRequisitionTemplate.templateItems.length : values.itemSequence
    selectedPurchaseRequisitionTemplate.templateItems.splice(insertIndex, 0, itemToInsert)
    const sortedResult = updateTemplateItemsSequence(selectedPurchaseRequisitionTemplate.templateItems)
    selectedPurchaseRequisitionTemplate.templateItems = sortedResult
    const deepCopy: IPurchaseRequisitionTemplate = CLONING_LIB.deepClone(selectedPurchaseRequisitionTemplate)
    setSelectedPurchaseRequisitionTemplate(deepCopy)
    setTemplateInsertItemSelect(false)
    insertItemsForm.resetFields()
    popNotification('Success Add Component', NotificationType.success)
  }

  const updateTemplateItemsSequence = (templateItems: IPurchaseRequisitionTemplateItem[]): IPurchaseRequisitionTemplateItem[] => {
    const sortedResult = templateItems.map((item, index) => {
      item.sequence = index + 1
      return item
    })
    return sortedResult
  }

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
                    <EditOutlined className="cursor-pointer" onClick={changeTemplateNameModal} hidden={selectedPurchaseRequisitionTemplate.templateName === undefined} />
                  </b>
                  <div className="col d-flex flex-column justify-content-center">
                    <Input.Search
                      allowClear
                      placeholder="Search"
                      bordered={false}
                      value={searchText}
                      onChange={(e: any) => setSearchText(e.target.value)}
                      onSearch={search}
                      style={{
                        width: '40%',
                        borderBottom: '1px solid #d9d9d9',
                        position: 'absolute',
                        right: '5px',
                      }}
                    />
                  </div>
                </div>
                <PurchaseRequisitionTemplateTable currentTemplate={selectedPurchaseRequisitionTemplate} deleteTemplateComponent={deleteTemplateItem} filteredItems={filteredTemplateItems} />
              </div>
            </Col>
            <Col span={10}>
              <PurchaseRequisitionTemplateBrowser setSelectedTemplate={setSelectedPurchaseRequisitionTemplate} />
              <Divider />
              {/* Excel Upload */}
              <Row>
                <Col span={16}>
                  <div className="input-group align-items-center">
                    <Input className="form-control" key="template-excel-input" type="file" onChange={(e: any) => setExcelFile(e.target.files[0])} />
                    <Button className="input-group-btn mx-1" key="upload-excel-button" type="default" onClick={() => uploadExcelFile()}>
                      Upload
                    </Button>
                  </div>
                </Col>
                <Col span={6} offset={2}>
                  <Button className="input-group-btn float-end" key="load-database-button" type="primary" onClick={() => loadDatabaseWithExcelData()}>
                    Load Database
                  </Button>
                </Col>
              </Row>
              {/* Add Component */}
              <div className="mt-5">
                <Form onFinish={addNewComponentAsTemplateItem} onFinishFailed={formValidationFailed}>
                  <Row>
                    <Col span={16}>
                      <Form.Item className="input-group" name="componentCode" rules={[{ required: true, message: 'Enter component code' }]}>
                        <Input key="component-input" type="text" placeholder="Component" />
                      </Form.Item>
                      <Form.Item className="input-group" name="vendorId" rules={[{ required: true, message: 'Enter vendor ID' }]}>
                        <Input key="vendor-input" type="text" placeholder="Vendor" />
                      </Form.Item>
                      <Form.Item
                        className="input-group"
                        name="packagingSize"
                        rules={[
                          { required: true, message: 'Enter packing size' },
                          {
                            type: 'number',
                            min: 1,
                            message: 'Packing Size must be positive',
                          },
                        ]}
                      >
                        <InputNumber className="w-100" key="packing-size-input" placeholder="Packing Size" />
                      </Form.Item>
                    </Col>
                    <Col span={6} offset={2}>
                      <Form.Item>
                        <Button className="input-group-btn float-end" key="load-database-button" type="primary" htmlType="submit">
                          Add Component
                        </Button>
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
                  console.log('Save Template')
                }}
              >
                Save Template
              </Button>
            </Col>
          </Row>
        </div>
      </div>
      <Modal title="Edit Template Name" key="edit-templateName-modal" visible={editTemplateNameModal} footer={null} onCancel={closeTemplateNameModal}>
        <Form onFinish={editTemplateName}>
          <Form.Item label="Template Name">
            <Input placeholder="name" value={newTemplateName} onChange={(e) => setNewTemplateName(e.target.value)} />
          </Form.Item>
          <Form.Item className="text-center mt-3">
            <Space className="">
              <Button htmlType="button" onClick={closeTemplateNameModal}>
                Cancel
              </Button>
              <Button htmlType="submit" type="primary">
                Submit
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>
      {/* Modal to Select Item Insert to Template */}
      <Modal title="Select Item to Insert" key="template-item-select-modal" visible={templateInsertItemSelect} footer={null} onCancel={closeTemplateInsertItemSelectModal}>
        <Form onFinish={insertItemToTemplate} form={insertItemsForm}>
          <Form.Item label="Item Row" name="itemSequence">
            <InputNumber placeholder="Row to insert" />
          </Form.Item>
          <Form.Item label="Items" name="selectedItem" rules={[{ required: true, message: 'Please select 1 item' }]}>
            <Radio.Group>
              <Space direction="vertical">
                {insertItemOptions &&
                  insertItemOptions.length > 0 &&
                  insertItemOptions.map((item, index) => {
                    return <Radio.Button id={`item-option-${index}`} value={item}>{`${item.componentName} - ${item.vendorName} ${item.packagingSize}`}</Radio.Button>
                  })}
              </Space>
            </Radio.Group>
          </Form.Item>
          <Form.Item className="text-center mt-3">
            <Space className="">
              <Button htmlType="button" onClick={closeTemplateInsertItemSelectModal}>
                Cancel
              </Button>
              <Button htmlType="submit" type="primary">
                Submit
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>
    </>
  )
}

export default PurchaseRequisitionTemplateList
