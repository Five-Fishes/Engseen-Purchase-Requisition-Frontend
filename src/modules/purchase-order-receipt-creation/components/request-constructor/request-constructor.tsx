import React, { useEffect, useState } from 'react';
import Table from 'antd/lib/table';
import { Button, Popconfirm, Popover } from 'antd';

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
import { PurchaseOrderReceiptItemStatus, PurchaseOrderReceiptItemStatusDisplayText } from '@constant/purchase-order-receipt-item-status.enum';
import { IPurchaseOrderReceiptItem } from '@dto/i-purchase-order-receipt-item.dto';
import { IPurchaseOrderItem } from '@dto/i-purchase-order-item.dto';

interface IPurchaseOrderReceiptCreationRequestConstructorProps {
  readonly searchResult?: IPurchaseOrderItem[];
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

  const windowSize: IWindowSize = useWindowResized();
  const TABLE_BODY_MAX_HEIHGT_CONSTRAINT: number =
    APP_HEADER_HEIGHT +
    APP_CONTENT_MARGIN +
    PURCHASE_REQUISITION_TITLE_HEIGHT +
    PURCHASE_REQUISITION_TOP_TOOLS_HEIGHT +
    PURCHASE_REQUISITION_BOTTOM_TOOLS_HEIGHT +
    TABLE_HEADER_HEIGHT +
    TABLE_PAGINATION_TOOLS_HEIGHT;

    const updatePurchaseOrderReceiptItemStatus: (item: IPurchaseOrderReceiptItem) => void = (item) => {
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
        /* const updatedApproval = updateData(props.selectedPurchaseRequisitionApproval, udpatedValue, item, 'status');
        updatePurchaseRequisitionApproval(updatedApproval); */
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

  /**
   * Update the SelectedApprovalItem's field based on the provided key
   * @param changeEvent change event emitted by html element
   * @param record the data associated with current row
   * @param key the key of the modified field (to perform modifying logic)
   * @param index the index of current row (against table)
   */
  /* const dataChanged: (changeEventType: ChangeEvent, changeEvent: any, record: IPurchaseRequisitionTemplateItem, key: string, index: number) => void = (
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
  }; */

  /**
   * Add column display settings updated time stamp to the tail of column keys to ensure columns are always refreshed after settings updated
   * - If key remains the same, react does not refresh component, hence adding timestamp in key to force refresh
   * - However, if refresh on every render, user will be unable to edit the data in table, hence only refresh if the time stamp got updated
   */
  const CURRENT_TIME: number = props.tableColumnDisplaySettingsUpdateTime.getTime();
  const COLUMNS: ITableColumn = {
    poNumber: <Table.Column title="PO Number" width="120px" dataIndex="poNumber" key={`poNumber-${CURRENT_TIME}`} />,
    componentName: <Table.Column title="Component Name" width="172px" dataIndex="componentName" key={`componentName-${CURRENT_TIME}`} />,
    receivingQuantityPack: <Table.Column title="Receiving Qty(packs)" width="100px" dataIndex="receivingQuantityPack" key={`receivingQtyPack-${CURRENT_TIME}`} />,
    uomPack: <Table.Column title="UOM (packs)" width="60px" dataIndex="uomPack" key={`uomPack-${CURRENT_TIME}`} />,
    receivingQuantity: <Table.Column title="Receiving Qty(kgs)" width="110px" dataIndex="receivingQuantity" key={`receivingQty-${CURRENT_TIME}`} />,
    uom: <Table.Column title="UOM (kgs)" width="60px" dataIndex="uom" key={`uom-${CURRENT_TIME}`} />,
    status: (
      <Table.Column
        title={<span>Issue Receiving</span>}
        width="114px"
        render={
            (value: PurchaseOrderReceiptItemStatus, record: IPurchaseOrderReceiptItem, index: number) => 
                <Button onClick={() => updatePurchaseOrderReceiptItemStatus(record)}>{`${PurchaseOrderReceiptItemStatusDisplayText(value)}`}</Button>
        }
        key={`balance-${CURRENT_TIME}`}
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

export default PurchaseOrderReceiptCreationRequestConstructor;
