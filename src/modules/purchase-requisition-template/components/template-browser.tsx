import { deletePurchaseRequisitionTemplate, getPurchaseRequisitionTemplate } from '@api/purchase-requisition-template.api';
import { ApiResponseStatus } from '@constant/api-status.enum';
import { IPurchaseRequisitionTemplate } from '@dto/i-purchase-requisition-template.dto';
import { useState } from 'react';
import { Button, Input, Row, Col, Modal } from 'antd';
import Text from 'antd/lib/typography/Text';
import { DeleteOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import CLONING_LIB from '@utils/cloning/cloning-lib-wrapper';
import { popNotification } from '@module/shared/components/notification';
import { NotificationType } from '@constant/notification.enum';

interface IPurchaseRequisitionTemplateProps {
  setSelectedTemplate: (template: IPurchaseRequisitionTemplate) => void;
  setLoading?: (loading: boolean) => void;
  purchaseRequisitionTemplates: IPurchaseRequisitionTemplate[];
  setPurchaseRequisitionTemplates: (templates: IPurchaseRequisitionTemplate[]) => void;
}

const PurchaseRequisitionTemplateBrowser: React.FC<IPurchaseRequisitionTemplateProps> = (props) => {
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [newTemplateText, setNewTemplateText] = useState('');

  const { purchaseRequisitionTemplates, setPurchaseRequisitionTemplates } = props;

  const showConfirmDeleteTemplate = (): void => {
    if (purchaseRequisitionTemplates === undefined || selectedIndex === -1) {
      return;
    }
    Modal.confirm({
      title: 'Are you sure?',
      icon: <ExclamationCircleOutlined />,
      content: "You won't be able to revert it",
      okText: 'Delete',
      okType: 'primary',
      cancelText: 'Cancel',
      onOk() {
        deleteTemplate();
      },
    });
  };

  const createNewTemplate = () => {
    if (newTemplateText.trim() !== '') {
      const newTemplate: IPurchaseRequisitionTemplate = {
        id: 0,
        templateName: newTemplateText,
        purchaseRequisitionTemplateItemList: [],
        remarks: ""
      };
      if (purchaseRequisitionTemplates === undefined || purchaseRequisitionTemplates.length === 0) {
        setPurchaseRequisitionTemplates([newTemplate]);
      } else {
        purchaseRequisitionTemplates.push(newTemplate);
        const deepCopy: IPurchaseRequisitionTemplate[] = CLONING_LIB.deepClone(purchaseRequisitionTemplates);
        setPurchaseRequisitionTemplates(deepCopy);
      }
      popNotification('Success Create Template', NotificationType.success);
      setNewTemplateText('');
    }
  };

  const deleteTemplate = () => {
    if (purchaseRequisitionTemplates === undefined || selectedIndex === -1) {
      return;
    }
    const selectedPurchaseRequisitionTemplate = purchaseRequisitionTemplates[selectedIndex];
    if (selectedPurchaseRequisitionTemplate.id > 0) {
      deletePurchaseRequisitionTemplate(selectedPurchaseRequisitionTemplate.id)
        .then(() => {
          getPurchaseRequisitionTemplate()
            .then(apiResponse => {
              if (apiResponse && apiResponse.status === ApiResponseStatus.SUCCESS) {
                setPurchaseRequisitionTemplates(apiResponse.data);
              }
            })
          setSelectedIndex(-1);
          props.setSelectedTemplate({} as IPurchaseRequisitionTemplate);
          popNotification('Success Delete Template', NotificationType.success);
        })
        .catch(error => {
          const errResponse = error.response;
          const errorMessage = errResponse.data ? errResponse.data : 'Request Failed';
          popNotification(errorMessage, NotificationType.error);
        });
    } else {
      purchaseRequisitionTemplates.splice(selectedIndex, 1);
      const deepCopy: IPurchaseRequisitionTemplate[] = CLONING_LIB.deepClone(purchaseRequisitionTemplates);
      setPurchaseRequisitionTemplates(deepCopy);
      
      setSelectedIndex(-1);
      props.setSelectedTemplate({} as IPurchaseRequisitionTemplate);
      popNotification('Success Delete Template', NotificationType.success);
    }
  };

  const selectTemplateEvent = (index: number, template: IPurchaseRequisitionTemplate) => {
    props.setLoading && props.setLoading(true);
    setSelectedIndex(index);
    const sortedTemplateItemList = template.purchaseRequisitionTemplateItemList.sort((item1, item2) => item1.sequence - item2.sequence)
    template.purchaseRequisitionTemplateItemList = sortedTemplateItemList;
    const deepCopy: IPurchaseRequisitionTemplate = CLONING_LIB.deepClone(template);
    props.setSelectedTemplate(deepCopy);
    setTimeout(function () {
      props.setLoading && props.setLoading(false);
    }, 500)
  }

  return (
    <>
      <Row>
        <Col span={14}>
          <div className="input-group align-items-center h-100">
            <Input
              className="form-control"
              key="new-template-input"
              placeholder="Create New Template"
              value={newTemplateText}
              onChange={(e: any) => {
                setNewTemplateText(e.target.value);
              }}
            />
            <Button className="input-group-btn mx-1" key="create-new-template-button" type="primary" onClick={() => createNewTemplate()}>
              Create
            </Button>
          </div>
        </Col>
        <Col span={8} offset={2}>
          <Button className="input-group-btn float-end d-inline-flex align-items-center" key="create-new-template-button" type="default" onClick={() => showConfirmDeleteTemplate()}>
            <DeleteOutlined />
            Delete Template
          </Button>
        </Col>
      </Row>
      <div className="d-inline-block text-center mt-2">
        {purchaseRequisitionTemplates &&
          purchaseRequisitionTemplates.map((template, index) => {
            return (
              <Button
                key={index}
                type={selectedIndex === index ? 'primary' : 'default'}
                shape="round"
                className="m-1 selection-pile-button"
                size="middle"
                onClick={() => selectTemplateEvent(index, template)}
              >
                <Text ellipsis className={selectedIndex === index ? 'text-white' : 'text-dark'}>{template.templateName}</Text>
              </Button>
            );
          })}
      </div>
    </>
  );
};

export default PurchaseRequisitionTemplateBrowser;
