import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Col, Form, Input, Row, Button, InputNumber, Modal, Space, Divider, Radio } from 'antd';
import Title from 'antd/lib/typography/Title';
import readXlsxFile from 'read-excel-file';

import PurchaseRequisitionTemplateTable from '../components/template-table';
import { IPurchaseRequisitionTemplate } from '@dto/i-purchase-requisition-template.dto';
import PurchaseRequisitionTemplateBrowser from '../components/template-browser';
import { generateIndex } from '../components/template-indexer';
import CLONING_LIB from '@utils/cloning/cloning-lib-wrapper';
import { getSearchText, SearchEngine } from '@utils/search/native-search';
import { IPurchaseRequisitionTemplateItem } from '@dto/i-purchase-requisition-template-item.dto';
import { EditOutlined } from '@ant-design/icons';
import { popNotification } from '@module/shared/components/notification';
import { ApiResponseStatus } from '@constant/api-status.enum';
import { createPurchaseRequisitionTemplate, getPurchaseRequisitionTemplate, updatePurchaseRequisitionTemplate } from '@api/purchase-requisition-template.api';
import { NotificationType } from '@constant/notification.enum';
import { setLoading } from '@module/shared/reducers/app-reducers';
import { bulkGetItemBySearch, getItemBySearch } from '@api/component.api';
import { IComponentSearch } from '@dto/i-component-search.dto';
import VendorDebounceSelect from '../components/vendor-debounce-select';
import ComponentCodeSelector from '../components/component-code-selector';

interface IPurchaseRequisitionTemplateProps extends StateProps, DispatchProps { };

const PurchaseRequisitionTemplateList: React.FC<IPurchaseRequisitionTemplateProps> = (props: IPurchaseRequisitionTemplateProps) => {
  const [purchaseRequisitionTemplates, setPurchaseRequisitionTemplates] = useState<IPurchaseRequisitionTemplate[]>();
  const [selectedPurchaseRequisitionTemplate, setSelectedPurchaseRequisitionTemplate] = useState<IPurchaseRequisitionTemplate>({} as IPurchaseRequisitionTemplate);
  const [filteredTemplateItems, setFilteredTemplateItems] = useState<IPurchaseRequisitionTemplateItem[]>();

  const [excelFile, setExcelFile] = useState<File>();
  const [excelData, setExcelData] = useState<Array<any>>([]);

  const [searchText, setSearchText] = useState<string>('');
  const searchEngine: SearchEngine<IPurchaseRequisitionTemplateItem> = new SearchEngine([], generateIndex);

  const [editTemplateNameModal, setEditTemplateNameModal] = useState<boolean>(false);
  const [newTemplateName, setNewTemplateName] = useState<string>('');

  const [templateInsertItemSelect, setTemplateInsertItemSelect] = useState<boolean>(false);
  const [insertItemOptions, setInsertItemOptions] = useState<IPurchaseRequisitionTemplateItem[]>();
  const [insertItemsForm] = Form.useForm();

  const [selectedVendor, setSelectedVendor] = useState<string>();
  const [selectedComponentCode, setSelectedComponentCode] = useState<string>('');

  useEffect(() => {
    const getTemplates = async () => {
      const apiResponse = await getPurchaseRequisitionTemplate();

      if (apiResponse && apiResponse.status === ApiResponseStatus.SUCCESS) {
        setPurchaseRequisitionTemplates(apiResponse.data);
      }
    };
    getTemplates();
  }, []);

  const search = () => {
    props.setLoading(true);
    const sanitisedSearchText: string = getSearchText(searchText);
    const filteredData = searchEngine.updateEngine(selectedPurchaseRequisitionTemplate.purchaseRequisitionTemplateItemList).search(sanitisedSearchText);
    setFilteredTemplateItems(filteredData);
    setTimeout(function () {
      props.setLoading(false);
    }, 500);
  };

  const changeTemplateNameModal = () => {
    setNewTemplateName(selectedPurchaseRequisitionTemplate.templateName);
    setEditTemplateNameModal(true);
  };

  const closeTemplateNameModal = () => {
    setNewTemplateName('');
    setEditTemplateNameModal(false);
  };

  const editTemplateName = () => {
    if (newTemplateName.trim() !== '') {
      selectedPurchaseRequisitionTemplate.templateName = newTemplateName;
      const deepCopy: IPurchaseRequisitionTemplate = CLONING_LIB.deepClone(selectedPurchaseRequisitionTemplate);
      setSelectedPurchaseRequisitionTemplate(deepCopy);
    }
    closeTemplateNameModal();
    popNotification('Success Edit Template', NotificationType.success);
  };

  const deleteTemplateItem = (itemIndex: number) => {
    selectedPurchaseRequisitionTemplate.purchaseRequisitionTemplateItemList.splice(itemIndex, 1);
    const sortedResult = updateTemplateItemsSequence(selectedPurchaseRequisitionTemplate.purchaseRequisitionTemplateItemList);
    selectedPurchaseRequisitionTemplate.purchaseRequisitionTemplateItemList = sortedResult;
    const deepCopy: IPurchaseRequisitionTemplate = CLONING_LIB.deepClone(selectedPurchaseRequisitionTemplate);
    setSelectedPurchaseRequisitionTemplate(deepCopy);
    popNotification('Success Delete Component', NotificationType.success);
  };

  const uploadExcelFile = (): void => {
    if (excelFile !== undefined) {
      props.setLoading(true);
      readXlsxFile(excelFile).then((rows) => {
        // Convert to Array of JSON Object
        setExcelData(rows);
        popNotification('Success Upload Excel', NotificationType.success);
      })
        .then(() => props.setLoading(false));
    }
  };

  const loadDatabaseWithExcelData = async () => {
    console.log('Load Database');
    if (!Boolean(selectedPurchaseRequisitionTemplate.templateName)) {
      popNotification('Please Select a Template', NotificationType.error);
    } else if (excelData.length === 0) {
      popNotification('Please Upload an Excel File', NotificationType.error);
    } else {
      const formattedExcelData = formatExcelData(excelData);
      const apiResponse = await bulkGetItemBySearch(formattedExcelData);

      if (apiResponse && apiResponse.status === ApiResponseStatus.SUCCESS) {
        apiResponse.data.forEach(item => insertExcelItemToTemplate(item));
        popNotification('Success Load Component from File', NotificationType.success);
      }
    }
  };

  const insertExcelItemToTemplate = (values: any): void => {
    const itemToInsert: IPurchaseRequisitionTemplateItem = {
      ...values,
      sequence: 0,
    };
    const insertIndex: number =
      values.itemSequence === 0 || values.itemSequence > selectedPurchaseRequisitionTemplate.purchaseRequisitionTemplateItemList?.length ? selectedPurchaseRequisitionTemplate.purchaseRequisitionTemplateItemList?.length : values.itemSequence - 1;
    selectedPurchaseRequisitionTemplate.purchaseRequisitionTemplateItemList.splice(insertIndex, 0, itemToInsert);
    const sortedResult = updateTemplateItemsSequence(selectedPurchaseRequisitionTemplate.purchaseRequisitionTemplateItemList);
    selectedPurchaseRequisitionTemplate.purchaseRequisitionTemplateItemList = sortedResult;
    const deepCopy: IPurchaseRequisitionTemplate = CLONING_LIB.deepClone(selectedPurchaseRequisitionTemplate);
    setSelectedPurchaseRequisitionTemplate(deepCopy);
  };

  /**
   * Excel data format is:
   * | ComponentCode | VendorId | PackagingSize |
   * 
   * @param excelData raw excel rows
   * @returns request body for component search
   */
  const formatExcelData = (excelData: any[]) => {
    // TODO: [LU] Please add typing to data
    return excelData.map(row => {
      return {
        componentCode: row[0],
        vendorId: row[1],
        packagingSize: row[2]
      } as IComponentSearch
    })
  }

  const getItems = async (component: string, vendor: string, packingSize?: number) => {
    const apiResponse = await getItemBySearch(component, vendor, packingSize);

    if (apiResponse && apiResponse.status === ApiResponseStatus.SUCCESS) {
      setInsertItemOptions(apiResponse.data);
    }
  };

  const addNewComponentAsTemplateItem = (values: any): void => {
    if (Boolean(selectedPurchaseRequisitionTemplate.templateName)) {
      getItems(selectedComponentCode, selectedVendor || '', values.packagingSize).then(() => {
        setTemplateInsertItemSelect(true);
      });
    } else {
      popNotification('Please Select a Template', NotificationType.error);
    }
  };

  const formValidationFailed = (errorInfo: any): void => {
    console.log('Failed ', errorInfo);
  };

  const closeTemplateInsertItemSelectModal = (): void => {
    setTemplateInsertItemSelect(false);
  };

  const insertItemToTemplate = (values: any): void => {
    const itemToInsert: IPurchaseRequisitionTemplateItem = {
      ...values.selectedItem,
      sequence: values.itemSequence,
    };
    const insertIndex: number =
      values.itemSequence === 0 || values.itemSequence > selectedPurchaseRequisitionTemplate.purchaseRequisitionTemplateItemList?.length ? selectedPurchaseRequisitionTemplate.purchaseRequisitionTemplateItemList?.length : values.itemSequence - 1;
    selectedPurchaseRequisitionTemplate.purchaseRequisitionTemplateItemList.splice(insertIndex, 0, itemToInsert);
    const sortedResult = updateTemplateItemsSequence(selectedPurchaseRequisitionTemplate.purchaseRequisitionTemplateItemList);
    selectedPurchaseRequisitionTemplate.purchaseRequisitionTemplateItemList = sortedResult;
    const deepCopy: IPurchaseRequisitionTemplate = CLONING_LIB.deepClone(selectedPurchaseRequisitionTemplate);
    setSelectedPurchaseRequisitionTemplate(deepCopy);
    setTemplateInsertItemSelect(false);
    insertItemsForm.resetFields();
    popNotification('Success Add Component', NotificationType.success);
  };

  const updateTemplateItemsSequence = (templateItems: IPurchaseRequisitionTemplateItem[]): IPurchaseRequisitionTemplateItem[] => {
    const sortedResult = templateItems.map((item, index) => {
      item.sequence = index + 1;
      return item;
    });
    return sortedResult;
  };

  const saveTemplate = () => {
    if (selectedPurchaseRequisitionTemplate.id) {
      updatePurchaseRequisitionTemplate(selectedPurchaseRequisitionTemplate)
        .then(res => {
          setSelectedPurchaseRequisitionTemplate(res.data);
          popNotification('Success Update Template', NotificationType.success);
          getPurchaseRequisitionTemplate()
            .then(apiResponse => {
              if (apiResponse && apiResponse.status === ApiResponseStatus.SUCCESS) {
                setPurchaseRequisitionTemplates(apiResponse.data);
              }
            });
        })
        .catch(error => {
          const errResponse = error.response;
          const errorMessage = errResponse.data ? errResponse.data : 'Request Failed';
          popNotification(errorMessage, NotificationType.error);
        });
    } else {
      createPurchaseRequisitionTemplate(selectedPurchaseRequisitionTemplate)
        .then(res => {
          setSelectedPurchaseRequisitionTemplate(res.data);
          popNotification('Success Create Template', NotificationType.success);
          getPurchaseRequisitionTemplate()
            .then(apiResponse => {
              if (apiResponse && apiResponse.status === ApiResponseStatus.SUCCESS) {
                setPurchaseRequisitionTemplates(apiResponse.data);
              }
            });
        })
        .catch(error => {
          const errResponse = error.response;
          const errorMessage = errResponse.data ? errResponse.data : 'Request Failed';
          popNotification(errorMessage, NotificationType.error);
        });
    }
  };

  return (
    <>
      <div className="d-flex flex-row">
        <div className="container-fluid h-100" style={{ width: "max-content" }}>
          <div className="d-flex flex-column justify-content-center">
            <Title level={4}>Purchase Requisition Template</Title>
          </div>
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
        </div>

        <Divider type="vertical" style={{ height: '100vh' }} className="mx-4" />

        <div className="px-2" style={{ minWidth: "680px" }}>
          <PurchaseRequisitionTemplateBrowser
            setSelectedTemplate={setSelectedPurchaseRequisitionTemplate}
            setLoading={props.setLoading}
            purchaseRequisitionTemplates={purchaseRequisitionTemplates ?? []}
            setPurchaseRequisitionTemplates={setPurchaseRequisitionTemplates} />
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
            <Row>
              <VendorDebounceSelect selectedVendor={selectedVendor} setSelectedVendor={setSelectedVendor} />
            </Row>
            <Row>
              <ComponentCodeSelector selectedVendor={selectedVendor} selectedComponentCode={selectedComponentCode} setSelectedComponentCode={setSelectedComponentCode} />
            </Row>
            <Form onFinish={addNewComponentAsTemplateItem} onFinishFailed={formValidationFailed}>
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
                <InputNumber type="number" className="w-100" key="packing-size-input" placeholder="Packing Size" />
              </Form.Item>
              <Form.Item>
                <Button className="input-group-btn float-end" key="load-database-button" type="primary" htmlType="submit">
                  Add Component
                </Button>
              </Form.Item>
            </Form>
          </div>
          <Divider />
          <Button
            key="save-template-button"
            type="primary"
            size="large"
            className="float-end mb-2"
            onClick={saveTemplate}
          >
            Save Template
          </Button>
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
            <InputNumber type="number" placeholder="Row to insert" />
          </Form.Item>
          <Form.Item label="Items" name="selectedItem" rules={[{ required: true, message: 'Please select 1 item' }]}>
            <Radio.Group>
              <Space direction="vertical">
                {insertItemOptions &&
                  insertItemOptions.length > 0 &&
                  insertItemOptions.map((item, index) => {
                    return <Radio.Button key={index} id={`item-option-${index}`} value={item}>{`${item.componentName} - ${item.vendorName} ${item.packagingSize}`}</Radio.Button>;
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
  );
};

const mapStateToProps = () => ({});

const mapDispatchToProps = {
  setLoading,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(PurchaseRequisitionTemplateList);
