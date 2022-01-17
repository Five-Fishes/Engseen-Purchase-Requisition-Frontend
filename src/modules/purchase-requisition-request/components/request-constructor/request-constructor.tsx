import React from 'react';
import Table from 'antd/lib/table';
import moment from 'moment';
import { Moment } from 'moment';
import { ClearOutlined } from '@ant-design/icons';
import { Button, DatePicker, InputNumber, Popconfirm, Popover } from 'antd';

import { TABLE_PAGINATION_CONFIG } from '@constant/pagination-config';
import { IPurchaseRequisitionTemplate } from '@dto/i-purchase-requisition-template.dto';
import { IPurchaseRequisitionTemplateItem } from '@dto/i-purchase-requisition-template-item.dto';
import CLONING_LIB from '@utils/cloning/cloning-lib-wrapper';
import { ChangeEvent } from '@constant/change-event.enum';
import { ITableColumn, ITableColumnDisplaySettings } from '@dto/i-table-columns';
import { IWindowSize, useWindowResized } from '@hook/window-resized.hook';
import { APP_HEADER_HEIGHT } from '@constant/display/header.constant';
import { APP_CONTENT_MARGIN } from '@constant/display/content.constant';
import { PURCHASE_REQUISITION_BOTTOM_TOOLS_HEIGHT, PURCHASE_REQUISITION_TITLE_HEIGHT, PURCHASE_REQUISITION_TOP_TOOLS_HEIGHT } from '@constant/display/purchase-requisition-request.constant';
import { TABLE_PAGINATION_TOOLS_HEIGHT, TABLE_HEADER_HEIGHT } from '@constant/display/table.constant';

interface IPurchaseRequisitionRequestConstructorProps {
  readonly currentTemplate?: IPurchaseRequisitionTemplate;
  readonly searchResult?: IPurchaseRequisitionTemplateItem[];
  updateTemplate: (template: IPurchaseRequisitionTemplate) => void;
  tableColumnDisplaySettings?: ITableColumnDisplaySettings[];
  tableColumnDisplaySettingsUpdateTime: Date;
}

/**
 * Due to the need of dynamic column settings, the implementation details are as follows:
 * - The columns are stored as key value data structure as a local constant (const COLUMNS: ITableColumn)
 * - The sequence and visibility of columns are supplied by parent component, the constructor table generates column structure based on:
 *   - The sequence of column list provided
 *   - The visible as defined
 * @param props IPurchaseRequisitionRequestConstructorProps
 * @returns PurchaseRequisitionRequestConstructor
 */
const PurchaseRequisitionRequestConstructor: React.FC<IPurchaseRequisitionRequestConstructorProps> = (props) => {
  const updateTemplate = props.updateTemplate;
  const windowSize: IWindowSize = useWindowResized();
  const TABLE_BODY_MAX_HEIHGT_CONSTRAINT: number =
    APP_HEADER_HEIGHT +
    APP_CONTENT_MARGIN +
    PURCHASE_REQUISITION_TITLE_HEIGHT +
    PURCHASE_REQUISITION_TOP_TOOLS_HEIGHT +
    PURCHASE_REQUISITION_BOTTOM_TOOLS_HEIGHT +
    TABLE_HEADER_HEIGHT +
    TABLE_PAGINATION_TOOLS_HEIGHT;

  const updateAllDeliveryDate: (value: any) => void = (value) => {
    if (props.currentTemplate) {
      const updatedPurchaseRequisitionTemplate = CLONING_LIB.deepClone(props.currentTemplate);
      if (value) {
        updatedPurchaseRequisitionTemplate.purchaseRequisitionTemplateItemList.forEach((item) => {
          item.deliveryDate = (value as Moment).toDate();
        });
        updateTemplate(updatedPurchaseRequisitionTemplate);
      }
    }
  };

  const clearAllInput: () => void = () => {
    if (props.currentTemplate) {
      const updatedPurchaseRequisitionTemplate = CLONING_LIB.deepClone(props.currentTemplate);
      updatedPurchaseRequisitionTemplate.purchaseRequisitionTemplateItemList.forEach((item) => {
        item.quantity = 0;
        item.packagingSize = 0;
        item.deliveryDate = undefined;
      });
      updateTemplate(updatedPurchaseRequisitionTemplate);
    }
  };

  const updateData: (selectedPurchaseRequisitionApproval: IPurchaseRequisitionTemplate, value: any, record: IPurchaseRequisitionTemplateItem, key: string) => IPurchaseRequisitionTemplate = (
    selectedPurchaseRequisitionApproval,
    value,
    record,
    key
  ) => {
    const idToUpdate = record.id;
    const updatedSelectedPurchaseRequisitionApprovalItems = selectedPurchaseRequisitionApproval.purchaseRequisitionTemplateItemList.map((item) => {
      if (item.id === idToUpdate) {
        (item as any)[key] = value;
      }
      return item;
    });
    const updatedSelectedPurchaseRequisitionApproval = CLONING_LIB.deepClone(selectedPurchaseRequisitionApproval);
    updatedSelectedPurchaseRequisitionApproval.purchaseRequisitionTemplateItemList = updatedSelectedPurchaseRequisitionApprovalItems;
    return updatedSelectedPurchaseRequisitionApproval;
  };

  const clearInputByItemId: (record: IPurchaseRequisitionTemplateItem) => void = (record) => {
    if (props.currentTemplate) {
      const updatedPurchaseRequisitionTemplate = CLONING_LIB.deepClone(props.currentTemplate);
      const updatedPurchaseRequisitionTemplateItems: IPurchaseRequisitionTemplateItem[] = updatedPurchaseRequisitionTemplate.purchaseRequisitionTemplateItemList.map((item) => {
        if (item.id === record.id) {
          return {
            ...item,
            quantity: 0,
            deliveryDate: undefined,
            packagingSize: 0,
          };
        } else {
          return item;
        }
      });
      updatedPurchaseRequisitionTemplate.purchaseRequisitionTemplateItemList = updatedPurchaseRequisitionTemplateItems;
      updateTemplate(updatedPurchaseRequisitionTemplate);
    }
  };

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

  /**
   * Add column display settings updated time stamp to the tail of column keys to ensure columns are always refreshed after settings updated
   * - If key remains the same, react does not refresh component, hence adding timestamp in key to force refresh
   * - However, if refresh on every render, user will be unable to edit the data in table, hence only refresh if the time stamp got updated
   */
  const CURRENT_TIME: number = props.tableColumnDisplaySettingsUpdateTime.getTime();
  const COLUMNS: ITableColumn = {
    sequence: <Table.Column title="Row" width="65px" render={(value, record: IPurchaseRequisitionTemplateItem, index: number) => <>{index + 1}</>} key={`sequence-${CURRENT_TIME}`} />,
    componentCode: <Table.Column title="Component ID" width="150px" dataIndex="componentCode" key={`componentCode-${CURRENT_TIME}`} />,
    componentName: <Table.Column title="Component Name" width="172px" dataIndex="componentName" key={`componentName-${CURRENT_TIME}`} />,
    vendor: <Table.Column title="Vendor" width="172px" dataIndex="vendorName" key={`vendorName-${CURRENT_TIME}`} />,
    balance: (
      <Table.Column
        title={
          <span>
            Balance Qty <br />
            (kgs)
          </span>
        }
        width="133px"
        render={(value, record: IPurchaseRequisitionTemplateItem, index: number) => <>{Math.floor(Math.random() * 10000)}</>}
        key={`balance-${CURRENT_TIME}`}
      />
    ),
    packagingSize: (
      <Table.Column
        title={
          <span>
            Packaging Size <br />
            (kgs per pack)
          </span>
        }
        width="150px"
        dataIndex="packagingSize"
        render={(value: number, record: IPurchaseRequisitionTemplateItem, index: number) => (
          <InputNumber type="number" onChange={(e) => dataChanged(ChangeEvent.NUMBER_INPUT, e, record, 'packagingSize', index)} value={value} />
        )}
        key={`packagingSize-${CURRENT_TIME}`}
      />
    ),
    noOfPacks: (
      <Table.Column
        title="No. of Packs to Order"
        width="150px"
        dataIndex="quantity"
        render={(value: number, record: IPurchaseRequisitionTemplateItem, index: number) => (
          <InputNumber type="number" onChange={(e) => dataChanged(ChangeEvent.NUMBER_INPUT, e, record, 'quantity', index)} value={value} />
        )}
        key={`quantity-${CURRENT_TIME}`}
      />
    ),
    quantity: (
      <Table.Column
        title="Total Quantity to Order (kgs)"
        width="133px"
        render={(value, record: IPurchaseRequisitionTemplateItem, index: number) => <>{record.packagingSize * (record.quantity || 0)}</>}
        key={`quantity-${CURRENT_TIME}`}
      />
    ),
    deliveryDate: (
      <Table.Column
        title={
          <Popover
            content={
              <DatePicker
                inputReadOnly
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
        width="136px"
        dataIndex="deliveryDate"
        render={(value: Date, record: IPurchaseRequisitionTemplateItem, index: number) => {
          let castedValue = undefined;
          if (value) {
            castedValue = moment(new Date(value));
          }
          return <DatePicker inputReadOnly value={castedValue} onChange={(moment) => dataChanged(ChangeEvent.DATE_TIME, moment, record, 'deliveryDate', index)} />;
        }}
        key={`deliveryDate-${CURRENT_TIME}`}
      />
    ),
    clearInput: (
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
        width="114px"
        render={(value, record: IPurchaseRequisitionTemplateItem, index: number) => <Button onClick={() => clearInputByItemId(record)} icon={<ClearOutlined />} />}
        key={`clearInput-${CURRENT_TIME}`}
      />
    ),
  };

  return (
    <>
      <Table dataSource={props.searchResult} rowKey="id" scroll={{ y: windowSize.height - TABLE_BODY_MAX_HEIHGT_CONSTRAINT }} pagination={TABLE_PAGINATION_CONFIG}>
        {props.tableColumnDisplaySettings &&
          props.tableColumnDisplaySettings.filter((columnDisplaySetting) => columnDisplaySetting.visible).map((columnDisplaySetting) => COLUMNS[columnDisplaySetting.columnKey])}
      </Table>
    </>
  );
};

export default PurchaseRequisitionRequestConstructor;
