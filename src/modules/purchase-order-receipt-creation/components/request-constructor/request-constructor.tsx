import './request-constructor.less';
import React from 'react';
import Table from 'antd/lib/table';
import { Button } from 'antd';

import CLONING_LIB from '@utils/cloning/cloning-lib-wrapper';
import { ChangeEvent } from '@constant/change-event.enum';
import { ITableColumn, ITableColumnDisplaySettings } from '@dto/i-table-columns';
import { IWindowSize, useWindowResized } from '@hook/window-resized.hook';
import { APP_HEADER_HEIGHT } from '@constant/display/header.constant';
import { APP_CONTENT_MARGIN } from '@constant/display/content.constant';
import { PURCHASE_REQUISITION_BOTTOM_TOOLS_HEIGHT, PURCHASE_REQUISITION_TITLE_HEIGHT, PURCHASE_REQUISITION_TOP_TOOLS_HEIGHT } from '@constant/display/purchase-requisition-request.constant';
import { TABLE_PAGINATION_TOOLS_HEIGHT, TABLE_HEADER_HEIGHT } from '@constant/display/table.constant';
import { PurchaseOrderReceiptItemStatus, PurchaseOrderReceiptItemStatusDisplayText } from '@constant/purchase-order-receipt-item-status.enum';
import StatefulNumberInput from '@module/shared/components/stateful-input/stateful-number-input/stateful-number-input';
import { PurchaseRequisitionApprovalStatus } from '@constant/purchase-requisition-approval-status.enum';
import { IPurchaseOrderItem } from '@dto/i-purchase-order-item.dto';

interface IPurchaseOrderReceiptCreationRequestConstructorProps {
  readonly searchResult?: IPurchaseOrderItem[];
  updatePurchaseOrderReceiptItem: (purchaseOrderReceiptItemList: IPurchaseOrderItem[]) => void;
  tableColumnDisplaySettings?: ITableColumnDisplaySettings[];
  tableColumnDisplaySettingsUpdateTime: Date;
}

/**
 * Due to the need of dynamic column settings, the implementation details are as follows:
 * - The columns are stored as key value data structure as a local constant (const COLUMNS: ITableColumn)
 * - The sequence and visibility of columns are supplied by parent component, the constructor table generates column structure based on:
 *   - The sequence of column list provided
 *   - The visible as defined
 * @param props IPurchaseOrderReceiptCreationRequestConstructorProps
 * @returns PurchaseOrderReceiptCreationRequestConstructor
 */
const PurchaseOrderReceiptCreationRequestConstructor: React.FC<IPurchaseOrderReceiptCreationRequestConstructorProps> = (props) => {
  const { searchResult, updatePurchaseOrderReceiptItem } = props;
  const windowSize: IWindowSize = useWindowResized();
  const TABLE_BODY_MAX_HEIHGT_CONSTRAINT: number =
    APP_HEADER_HEIGHT +
    APP_CONTENT_MARGIN +
    PURCHASE_REQUISITION_TITLE_HEIGHT +
    PURCHASE_REQUISITION_TOP_TOOLS_HEIGHT +
    PURCHASE_REQUISITION_BOTTOM_TOOLS_HEIGHT +
    TABLE_HEADER_HEIGHT +
    TABLE_PAGINATION_TOOLS_HEIGHT;

  const updatePurchaseOrderReceiptItemStatus: (item: IPurchaseOrderItem) => void = (item) => {
    let udpatedValue: PurchaseOrderReceiptItemStatus;
    switch (item.status) {
      case PurchaseOrderReceiptItemStatus.PENDING:
        udpatedValue = PurchaseOrderReceiptItemStatus.CONFIRMED;
        break;
      case PurchaseOrderReceiptItemStatus.CONFIRMED:
        udpatedValue = PurchaseOrderReceiptItemStatus.PENDING;
        break;
      default:
        udpatedValue = PurchaseOrderReceiptItemStatus.PENDING;
        break;
    }
    // TODO: Update Item Status
    const updatedList = updateData(udpatedValue, item, 'status');
    updatePurchaseOrderReceiptItem(updatedList);
  };

  const updateData: (value: any, record: IPurchaseOrderItem, key: string) => IPurchaseOrderItem[] = (value, record, key) => {
    if (searchResult === undefined) {
      return [];
    }
    const idToUpdate = record.id;
    const updatedPurchaseOrderItemList = searchResult.map((item) => {
      if (item.id === idToUpdate) {
        (item as any)[key] = value;
      }
      return item;
    });
    const updatedPurchaseOrderItemListCopy = CLONING_LIB.deepClone(updatedPurchaseOrderItemList);
    return updatedPurchaseOrderItemListCopy;
  };

  /**
   * Update the SelectedApprovalItem's field based on the provided key
   * @param changeEvent change event emitted by html element
   * @param record the data associated with current row
   * @param key the key of the modified field (to perform modifying logic)
   * @param index the index of current row (against table)
   */
  const dataChanged: (changeEventType: ChangeEvent, changeEvent: any, record: IPurchaseOrderItem, key: string, index: number) => void = (changeEventType, changeEvent, record, key, index) => {
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
      case ChangeEvent.TEXT_INPUT:
        valueToUpdate = changeEvent.target.value;
        break;
      default:
        valueToUpdate = '';
        break;
    }

    if (searchResult) {
      const updatedList = updateData(valueToUpdate, record, key);
      updatePurchaseOrderReceiptItem(updatedList);
    }
  };

  /**
   * Add column display settings updated time stamp to the tail of column keys to ensure columns are always refreshed after settings updated
   * - If key remains the same, react does not refresh component, hence adding timestamp in key to force refresh
   * - However, if refresh on every render, user will be unable to edit the data in table, hence only refresh if the time stamp got updated
   */
  const CURRENT_TIME: number = props.tableColumnDisplaySettingsUpdateTime.getTime();
  const COLUMNS: ITableColumn = {
    poNumber: <Table.Column title="PO Number" width="120px" dataIndex="poNumber" key={`poNumber-${CURRENT_TIME}`} />,
    componentCode: <Table.Column title="Component Code" width="140px" dataIndex="componentCode" key={`componentCode-${CURRENT_TIME}`} />,
    componentName: <Table.Column title="Component Name" width="172px" dataIndex="componentName" key={`componentName-${CURRENT_TIME}`} />,
    orderQuantityPack: <Table.Column title="Ordered Qty(packs)" width="100px" dataIndex="orderQuantityPack" key={`orderQtyPack-${CURRENT_TIME}`} />,
    receivedQuantityPack: <Table.Column title="Received Qty(packs)" width="100px" dataIndex="receivedQuantityPack" key={`receivedQtyPack-${CURRENT_TIME}`} />,
    openQuantityPack: <Table.Column title="Open Qty(packs)" width="100px" dataIndex="openQuantityPack" key={`openQtyPack-${CURRENT_TIME}`} />,
    receivingQuantityPack: (
      <Table.Column
        title="Receiving Qty(packs)"
        width="100px"
        dataIndex="receivingQuantityPack"
        key={`receivingQtyPack-${CURRENT_TIME}`}
        render={(value, record: IPurchaseOrderItem, index: number) => {
          return (
            <StatefulNumberInput
              state={record.status === PurchaseOrderReceiptItemStatus.PENDING ? PurchaseRequisitionApprovalStatus.TO_CONFIRM : PurchaseRequisitionApprovalStatus.CONFIRMED}
              value={value}
              onChange={(e) => dataChanged(ChangeEvent.NUMBER_INPUT, e, record, 'recevingQuantityPack', index)}
            />
          );
        }}
      />
    ),
    uomPack: <Table.Column title="UOM (packs)" width="60px" dataIndex="uomPack" key={`uomPack-${CURRENT_TIME}`} />,
    orderQuantity: <Table.Column title="Ordered Qty(kgs)" width="110px" dataIndex="orderQuantity" key={`orderQty-${CURRENT_TIME}`} />,
    receivedQuantity: <Table.Column title="Received Qty(kgs)" width="110px" dataIndex="receivedQuantity" key={`receivedQty-${CURRENT_TIME}`} />,
    openQuantity: <Table.Column title="Open Qty(kgs)" width="110px" dataIndex="openQuantity" key={`openQty-${CURRENT_TIME}`} />,
    receivingQuantity: (
      <Table.Column
        title="Receiving Qty(kgs)"
        width="110px"
        dataIndex="receivingQuantity"
        key={`receivingQty-${CURRENT_TIME}`}
        render={(value, record: IPurchaseOrderItem, index: number) => {
          return (
            <StatefulNumberInput
              state={record.status === PurchaseOrderReceiptItemStatus.PENDING ? PurchaseRequisitionApprovalStatus.TO_CONFIRM : PurchaseRequisitionApprovalStatus.CONFIRMED}
              value={value}
              onChange={(e) => dataChanged(ChangeEvent.NUMBER_INPUT, e, record, 'recevingQuantity', index)}
            />
          );
        }}
      />
    ),
    uom: <Table.Column title="UOM (kgs)" width="60px" dataIndex="uom" key={`uom-${CURRENT_TIME}`} />,
    status: (
      <Table.Column
        title={<span>Issue Receiving</span>}
        width="114px"
        dataIndex="status"
        render={(value: PurchaseOrderReceiptItemStatus, record: IPurchaseOrderItem, index: number) => (
          <Button className={`po-receipt-status-${value.toLowerCase()}`} onClick={() => updatePurchaseOrderReceiptItemStatus(record)}>
            {`${PurchaseOrderReceiptItemStatusDisplayText(value)}`}
          </Button>
        )}
        key={`status-${CURRENT_TIME}`}
      />
    ),
  };

  return (
    <>
      <Table dataSource={props.searchResult} rowKey="id" scroll={{ y: windowSize.height - TABLE_BODY_MAX_HEIHGT_CONSTRAINT }} pagination={false}>
        {props.tableColumnDisplaySettings &&
          props.tableColumnDisplaySettings.filter((columnDisplaySetting) => columnDisplaySetting.visible).map((columnDisplaySetting) => COLUMNS[columnDisplaySetting.columnKey])}
      </Table>
    </>
  );
};

export default PurchaseOrderReceiptCreationRequestConstructor;
