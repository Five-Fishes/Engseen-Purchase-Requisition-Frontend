import React from 'react';
import Table from 'antd/lib/table';
import { Moment } from 'moment';
import { Button, DatePicker, InputNumber, Popconfirm, Popover } from 'antd';

import { TABLE_PAGINATION_CONFIG } from '@constant/pagination-config';
import { IPurchaseRequisitionTemplate } from '@dto/i-purchase-requisition-template.dto';
import { IPurchaseRequisitionTemplateItem } from '@dto/i-purchase-requisition-template-item.dto';
import { ClearOutlined } from '@ant-design/icons';
import CLONING_LIB from '@utils/cloning/cloning-lib-wrapper';
import { ChangeEvent } from '@constant/change-event.enum';
import moment from 'moment';

interface IPurchaseRequisitionRequestConstructorProps {
  readonly currentTemplate?: IPurchaseRequisitionTemplate;
  readonly searchResult?: IPurchaseRequisitionTemplateItem[]
  updateTemplate: (template: IPurchaseRequisitionTemplate) => void;
  columnFilter: Map<string, boolean>;
}

const PurchaseRequisitionRequestConstructor: React.FC<IPurchaseRequisitionRequestConstructorProps> = (props) => {
  const updateTemplate = props.updateTemplate;
  
  const updateAllDeliveryDate: (value: any) => void = (value) => {
    if (props.currentTemplate) {
      const updatedPurchaseRequisitionTemplate = CLONING_LIB.deepClone(props.currentTemplate);
      if (value) {
        updatedPurchaseRequisitionTemplate.templateItems.forEach((item) => {
          item.deliveryDate = (value as Moment).toDate();
        });
        updateTemplate(updatedPurchaseRequisitionTemplate);
      }
    }
  };

  const clearAllInput: () => void = () => {
    if (props.currentTemplate) {
      const updatedPurchaseRequisitionTemplate = CLONING_LIB.deepClone(props.currentTemplate);
      updatedPurchaseRequisitionTemplate.templateItems.forEach((item) => {
        item.quantity = 0
        item.packagingSize = 0
        item.deliveryDate = undefined
      });
      updateTemplate(updatedPurchaseRequisitionTemplate);
    }
  }

  const updateData: (selectedPurchaseRequisitionApproval: IPurchaseRequisitionTemplate, value: any, record: IPurchaseRequisitionTemplateItem, key: string) => IPurchaseRequisitionTemplate = (
    selectedPurchaseRequisitionApproval,
    value,
    record,
    key
  ) => {
    const idToUpdate = record.id;
    const updatedSelectedPurchaseRequisitionApprovalItems = selectedPurchaseRequisitionApproval.templateItems.map((item) => {
      if (item.id === idToUpdate) {
        (item as any)[key] = value;
      }
      return item;
    });
    const updatedSelectedPurchaseRequisitionApproval = CLONING_LIB.deepClone(selectedPurchaseRequisitionApproval);
    updatedSelectedPurchaseRequisitionApproval.templateItems = updatedSelectedPurchaseRequisitionApprovalItems;
    return updatedSelectedPurchaseRequisitionApproval;
  };

  const clearInputByItemId: (record: IPurchaseRequisitionTemplateItem) => void = (record) => {
    if (props.currentTemplate) {
      const updatedPurchaseRequisitionTemplate = CLONING_LIB.deepClone(props.currentTemplate);
      const updatedPurchaseRequisitionTemplateItems: IPurchaseRequisitionTemplateItem[] =  updatedPurchaseRequisitionTemplate.templateItems.map((item) => {
        if (item.id === record.id) {
          return {
            ...item,
            quantity: 0,
            deliveryDate: undefined,
            packagingSize: 0,
          }
        }else {
          return item
        }
      });
      updatedPurchaseRequisitionTemplate.templateItems = updatedPurchaseRequisitionTemplateItems;
      updateTemplate(updatedPurchaseRequisitionTemplate);
    }
  }

  /**
   * Update the SelectedApprovalItem's field based on the provided key
   * @param changeEvent change event emitted by html element
   * @param record the data associated with current row
   * @param key the key of the modified field (to perform modifying logic)
   * @param index the index of current row (against table)
   */
  const dataChanged: (changeEventType: ChangeEvent, changeEvent: any, record: IPurchaseRequisitionTemplateItem, key: string, index: number) => void = (
    changeEventType,
    changeEvent,
    record,
    key,
    index
  ) => {
    console.group('dataChanged');
    console.log('changeEventType >>: ', changeEventType);
    console.log('changeEvent >>: ', changeEvent);
    console.log('record >>: ', record);
    console.log('key >>: ', key);
    console.log('index >>: ', index);
    console.groupEnd();

    let valueToUpdate: any;
    switch (changeEventType) {
      case ChangeEvent.NUMBER_INPUT:
        valueToUpdate = changeEvent;
        break;
      case ChangeEvent.DATE_TIME:
        valueToUpdate = changeEvent ? (changeEvent as Moment).toDate() : undefined;
        break;
      case ChangeEvent.TEXT_INPUT:
        valueToUpdate = changeEvent.target.value;
        break;
      default:
        valueToUpdate = '';
        break;
    }

    if (props.currentTemplate) {
      const updatedSelectedPurchaseRequisitionApproval = updateData(props.currentTemplate, valueToUpdate, record, key);
      updateTemplate(updatedSelectedPurchaseRequisitionApproval);
    }
  };

  return (
    <Table className="my-2" dataSource={props.searchResult} rowKey="id" scroll={{ x: 2000, y: 500 }} pagination={TABLE_PAGINATION_CONFIG}>
      {console.log(props.columnFilter.get('sequence'))}
      {props.columnFilter.get('sequence') !== true && <Table.Column title="Row" render={(value, record: IPurchaseRequisitionTemplateItem, index: number) => <>{index + 1}</>} />}
      {props.columnFilter.get('componentCode') !== true && <Table.Column title="Component ID" dataIndex="componentCode" key="componentCode" />}
      {props.columnFilter.get('componentName') !== true && <Table.Column title="Component Name" width={300} dataIndex="componentName" key="componentName" />}
      {props.columnFilter.get('vendor') !== true && <Table.Column title="Vendor" width={300} dataIndex="vendorName" key="vendorName" />}
      {props.columnFilter.get('balance') !== true && (
        <Table.Column
          title={
            <span>
              Balance Qty <br />
              (kgs)
            </span>
          }
          key="balance"
          render={(value, record: IPurchaseRequisitionTemplateItem, index: number) => <>{Math.floor(Math.random() * 10000)}</>}
        />
      )}
      {props.columnFilter.get('packagingSize') !== true && (
        <Table.Column
          title={
            <span>
              Packaging Size <br />
              (kgs per pack)
            </span>
          }
          dataIndex="packagingSize"
          render={(value: number, record: IPurchaseRequisitionTemplateItem, index: number) => <InputNumber onChange={ e => dataChanged(ChangeEvent.NUMBER_INPUT, e, record, "packagingSize", index)} value={value} />}
          key="packagingSize"
        />
      )}
      <Table.Column
        title="No. of Packs to Order"
        dataIndex="quantity"
        render={(value: number, record: IPurchaseRequisitionTemplateItem, index: number) => <InputNumber onChange={ e => dataChanged(ChangeEvent.NUMBER_INPUT, e, record, "quantity", index)} value={value} />}
        key="quantity"
      />
      <Table.Column title="Total Quantity to Order (kgs)" render={(value, record: IPurchaseRequisitionTemplateItem, index: number) => <>{record.packagingSize * (record.quantity || 0)}</>} />
      <Table.Column
        title={
          <Popover
            content={
              <DatePicker
                onChange={(moment) => {
                  updateAllDeliveryDate(moment);
                }}
              />
            }
            trigger="click"
          >
            <div className="cursor-pointer">
              <span>Delivery Date</span>
              <br />
              <span style={{ fontSize: '8px' }}>*Click to change all</span>
            </div>
          </Popover>
        }
        dataIndex="deliveryDate"
        render={(value: Date, record: IPurchaseRequisitionTemplateItem, index: number) => {
          let castedValue = undefined;
          if (value) {
            castedValue = moment(new Date(value));
          }
          return <DatePicker value={castedValue} onChange={(moment) => dataChanged(ChangeEvent.DATE_TIME, moment, record, 'deliveryDate', index)} />;
        }}
      />
      <Table.Column
        title={
          <Popconfirm title="Are you sure you want to clear input for all rows?" okText="OK" cancelText="Cancel" onConfirm={() => clearAllInput()}>
            <div className="cursor-pointer">
              <span>Clear Input</span>
              <br />
              <span style={{ fontSize: '8px' }}>*Click to clear all</span>
            </div>
          </Popconfirm>
        }
        render={(value, record: IPurchaseRequisitionTemplateItem, index: number) => <Button onClick={() => clearInputByItemId(record)} icon={<ClearOutlined />} />}
      />
    </Table>
  );
};

export default PurchaseRequisitionRequestConstructor;
