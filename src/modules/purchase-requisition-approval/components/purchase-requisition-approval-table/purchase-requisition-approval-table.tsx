import { useEffect, useState } from 'react';
import { Button, DatePicker, Input, Popconfirm, Popover, Table } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import moment, { Moment } from 'moment';

import CLONING_LIB from '@utils/cloning/cloning-lib-wrapper';
import { getSearchText, SearchEngine } from '@utils/search/native-search';
import { ChangeEvent } from '@constant/change-event.enum';
import { TABLE_PAGINATION_CONFIG } from '@constant/pagination-config';
import { PurchaseRequisitionApprovalStatus, PurchaseRequisitionApprovalStatusDisplayText } from '@constant/purchase-requisition-approval-status.enum';
import { IPurchaseRequisitionApproval } from '@dto/i-purchase-requisition-approval.dto';
import { IPurchaseRequisitionApprovalItem } from '@dto/i-purchase-requisition-approval-item.dto';
import StatefulTextInput from '@module/shared/components/stateful-input/stateful-text-input/stateful-text-input';
import StatefulNumberInput from '@module/shared/components/stateful-input/stateful-number-input/stateful-number-input';

import generateIndex from './purchase-requisition-approval-table-indexer';
import { popNotification } from '@module/shared/components/notification';
import { NotificationType } from '@constant/notification.enum';
import { convertToLocalString } from '@utils/date-time/date-time-format';
interface IPurchaseRequititionApprovalTableProps {
  selectedPurchaseRequisitionApproval?: IPurchaseRequisitionApproval;
  updatePurchaseRequisitionApproval: (purchaseRequisitionApproval: IPurchaseRequisitionApproval) => void;
  setLoading?: (loading: boolean) => void;
}

const PurchaseRequititionApprovalTable: React.FC<IPurchaseRequititionApprovalTableProps> = (props) => {
  const updatePurchaseRequisitionApproval = props.updatePurchaseRequisitionApproval;
  const [searchResult, setSearchResult] = useState<IPurchaseRequisitionApprovalItem[]>();
  const searchEngine: SearchEngine<IPurchaseRequisitionApprovalItem> = new SearchEngine([], generateIndex);

  const { setLoading } = props;

  useEffect(() => {
    if (props.selectedPurchaseRequisitionApproval) {
      const initSearchResult = CLONING_LIB.deepClone(props.selectedPurchaseRequisitionApproval.purchaseRequisitionApprovalItems);
      setSearchResult(initSearchResult);
    }
  }, [props.selectedPurchaseRequisitionApproval, setLoading]);

  const confirmAll: () => void = () => {
    if (props.selectedPurchaseRequisitionApproval) {
      setLoading && setLoading(true);
      const updatedSelectedPurchaseRequisitionApprovalItems = props.selectedPurchaseRequisitionApproval.purchaseRequisitionApprovalItems.map((item) => {
        if (item.status !== PurchaseRequisitionApprovalStatus.ISSUED) {
          item.status = PurchaseRequisitionApprovalStatus.CONFIRMED;
        }
        return item;
      });
      const updatedSelectedPurchaseRequisitionApproval = CLONING_LIB.deepClone(props.selectedPurchaseRequisitionApproval);
      updatedSelectedPurchaseRequisitionApproval.purchaseRequisitionApprovalItems = updatedSelectedPurchaseRequisitionApprovalItems;
      updatePurchaseRequisitionApproval(updatedSelectedPurchaseRequisitionApproval);
      setTimeout(function () {
        setLoading && setLoading(false);
      }, 500);
    }
  };

  /**
   * Update deliveryDate for all columns:
   * - If the order qty > 0
   * @param value The selected date
   */
  const updateAllDeliveryDate: (value: any) => void = (value) => {
    if (props.selectedPurchaseRequisitionApproval) {
      setLoading && setLoading(true);
      const updatedSelectedPurchaseRequisitionApproval = CLONING_LIB.deepClone(props.selectedPurchaseRequisitionApproval);
      if (value) {
        updatedSelectedPurchaseRequisitionApproval?.purchaseRequisitionApprovalItems.forEach((item) => {
          const isToConfirm = item.status === PurchaseRequisitionApprovalStatus.TO_CONFIRM;
          const isQtyMoreThan0 = item.quantity > 0;
          if (isToConfirm && isQtyMoreThan0) {
            item.deliveryDate = (value as Moment).toDate();
          }
        });
      }
      updatePurchaseRequisitionApproval(updatedSelectedPurchaseRequisitionApproval);
      setTimeout(function () {
        setLoading && setLoading(false);
      }, 500);
    }
  };

  const removeApprovalItem: (record: IPurchaseRequisitionApprovalItem) => void = (record) => {
    if (record.status !== PurchaseRequisitionApprovalStatus.TO_CONFIRM) {
      const recordStatus = PurchaseRequisitionApprovalStatusDisplayText(record.status);
      popNotification(`Cannot delete item with status "${recordStatus}", please change to status "To be confirmed"`, NotificationType.error);
    } else {
      if (props.selectedPurchaseRequisitionApproval) {
        const updatedSelectedPurchaseRequisitionApproval = CLONING_LIB.deepClone(props.selectedPurchaseRequisitionApproval);
        updatedSelectedPurchaseRequisitionApproval.purchaseRequisitionApprovalItems = updatedSelectedPurchaseRequisitionApproval.purchaseRequisitionApprovalItems.filter(
          (item) => item.id !== record.id
        );
        updatePurchaseRequisitionApproval(updatedSelectedPurchaseRequisitionApproval);
      }
    }
  };

  /**
   * Update the SelectedApprovalItem's field based on the provided key
   * @param changeEvent change event emitted by html element
   * @param record the data associated with current row
   * @param key the key of the modified field (to perform modifying logic)
   * @param index the index of current row (against table)
   */
  const dataChanged: (changeEventType: ChangeEvent, changeEvent: any, record: IPurchaseRequisitionApprovalItem, key: string, index: number) => void = (
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

    if (props.selectedPurchaseRequisitionApproval) {
      const updatedSelectedPurchaseRequisitionApproval = updateData(props.selectedPurchaseRequisitionApproval, valueToUpdate, record, key);
      updatePurchaseRequisitionApproval(updatedSelectedPurchaseRequisitionApproval);
    }
  };

  const updateApprovalItemStatus: (item: IPurchaseRequisitionApprovalItem) => void = (item) => {
    if (props.selectedPurchaseRequisitionApproval) {
      let udpatedValue: PurchaseRequisitionApprovalStatus;
      switch (item.status) {
        case PurchaseRequisitionApprovalStatus.TO_CONFIRM:
          udpatedValue = PurchaseRequisitionApprovalStatus.CONFIRMED;
          break;
        case PurchaseRequisitionApprovalStatus.CONFIRMED:
          udpatedValue = PurchaseRequisitionApprovalStatus.TO_CONFIRM;
          break;
        case PurchaseRequisitionApprovalStatus.ISSUED:
          udpatedValue = PurchaseRequisitionApprovalStatus.ISSUED;
          break;
        default:
          udpatedValue = PurchaseRequisitionApprovalStatus.TO_CONFIRM;
          break;
      }
      const updatedApproval = updateData(props.selectedPurchaseRequisitionApproval, udpatedValue, item, 'status');
      updatePurchaseRequisitionApproval(updatedApproval);
    }
  };

  const updateData: (selectedPurchaseRequisitionApproval: IPurchaseRequisitionApproval, value: any, record: IPurchaseRequisitionApprovalItem, key: string) => IPurchaseRequisitionApproval = (
    selectedPurchaseRequisitionApproval,
    value,
    record,
    key
  ) => {
    const idToUpdate = record.id;
    const updatedSelectedPurchaseRequisitionApprovalItems = selectedPurchaseRequisitionApproval.purchaseRequisitionApprovalItems.map((item) => {
      if (item.id === idToUpdate) {
        (item as any)[key] = value;
      }
      return item;
    });
    const updatedSelectedPurchaseRequisitionApproval = CLONING_LIB.deepClone(selectedPurchaseRequisitionApproval);
    updatedSelectedPurchaseRequisitionApproval.purchaseRequisitionApprovalItems = updatedSelectedPurchaseRequisitionApprovalItems;
    return updatedSelectedPurchaseRequisitionApproval;
  };

  const handleSearch = (value: string, event: React.ChangeEvent<HTMLInputElement> | React.MouseEvent<HTMLElement, MouseEvent> | React.KeyboardEvent<HTMLInputElement> | undefined) => {
    setLoading && setLoading(true);
    console.group('Search [PurchaseRequititionApprovalTable]');
    console.log('value >>: ', value);
    console.log('event >>: ', event);
    if (props.selectedPurchaseRequisitionApproval) {
      console.log('selectedPurchaseRequisitionApproval >>: ', props.selectedPurchaseRequisitionApproval);
      const sanitisedSearchText: string = getSearchText(value);
      const searchOutput = searchEngine.updateEngine(props.selectedPurchaseRequisitionApproval.purchaseRequisitionApprovalItems).search(sanitisedSearchText);
      setSearchResult(searchOutput);
    }
    console.groupEnd();
    setTimeout(function () {
      setLoading && setLoading(false);
    }, 500);
  };

  const SELECTED_PURCHASE_REQUISITION_APPROVAL_ITEMS: IPurchaseRequisitionApprovalItem[] = searchResult || [];

  return (
    <>
      <div>
        <div className="d-flex justify-content-between">
          <div>
            <strong>Submission Date</strong>: {props.selectedPurchaseRequisitionApproval && convertToLocalString(props.selectedPurchaseRequisitionApproval.createdDate)}
          </div>
          <div>
            <Input.Search placeholder="Search" onSearch={handleSearch} allowClear></Input.Search>
          </div>
        </div>
        <Table
          dataSource={SELECTED_PURCHASE_REQUISITION_APPROVAL_ITEMS}
          rowKey="id"
          className="my-2"
          style={{ width: '1580px', maxWidth: '1700px' }}
          scroll={{ y: 'calc(100vh - 350px)' }}
          pagination={TABLE_PAGINATION_CONFIG}
        >
          <Table.Column title="Component Name" width="330px" align="center" dataIndex="componentName" key="componentName" />
          <Table.Column
            title={
              <div>
                Item Cost <br /> (RM/kg)
              </div>
            }
            width="122px"
            align="center"
            dataIndex="itemCost"
            key="itemCost"
            render={(value, record: IPurchaseRequisitionApprovalItem, index: number) => {
              return <StatefulNumberInput state={record.status} value={value} onChange={(e) => dataChanged(ChangeEvent.NUMBER_INPUT, e, record, 'itemCost', index)} />;
            }}
          />
          <Table.Column
            title="Vendor"
            align="center"
            dataIndex="vendorName"
            key="vendorName"
            width="290px"
            render={(value, record: IPurchaseRequisitionApprovalItem, index: number) => {
              return <StatefulTextInput state={record.status} value={value} onChange={(e) => dataChanged(ChangeEvent.TEXT_INPUT, e, record, 'vendorName', index)} />;
            }}
          />
          <Table.Column
            title={
              <Button onClick={confirmAll} size="small" type="primary">
                Confirm All
              </Button>
            }
            dataIndex="status"
            key="status"
            width="120px"
            align="center"
            render={(value: PurchaseRequisitionApprovalStatus, record: IPurchaseRequisitionApprovalItem, index: number) => {
              return <Button onClick={() => updateApprovalItemStatus(record)}>{`${PurchaseRequisitionApprovalStatusDisplayText(value)}`}</Button>;
            }}
          />
          <Table.Column
            title={
              <div>
                Packing Size <br /> (kgs per pack)
              </div>
            }
            width="136px"
            align="center"
            dataIndex="packagingSize"
            key="packagingSize"
            render={(value, record: IPurchaseRequisitionApprovalItem, index: number) => {
              return <StatefulNumberInput state={record.status} value={value} onChange={(e) => dataChanged(ChangeEvent.NUMBER_INPUT, e, record, 'packagingSize', index)} />;
            }}
          />
          <Table.Column
            title="No. of Packs to Order"
            width="109px"
            align="center"
            dataIndex="noOfPacks"
            key="noOfPacks"
            render={(value, record: IPurchaseRequisitionApprovalItem, index: number) => {
              return <StatefulNumberInput state={record.status} value={value} onChange={(e) => dataChanged(ChangeEvent.NUMBER_INPUT, e, record, 'noOfPacks', index)} />;
            }}
          />
          <Table.Column title="Total Quantity To Order (kgs)" width="128px" align="center" dataIndex="quantity" key="quantity" />
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
            width="119px"
            align="center"
            dataIndex="deliveryDate"
            key="deliveryDate"
            render={(value, record: IPurchaseRequisitionApprovalItem, index: number) => {
              let castedValue = undefined;
              if (value) {
                castedValue = moment(new Date(value));
              }
              return (
                <DatePicker
                  inputReadOnly
                  disabled={!(record.status === PurchaseRequisitionApprovalStatus.TO_CONFIRM)}
                  value={castedValue}
                  onChange={(moment) => dataChanged(ChangeEvent.DATE_TIME, moment, record, 'deliveryDate', index)}
                />
              );
            }}
          />
          <Table.Column title="Balance" width="119px" align="center" dataIndex="balance" key="balance" />
          <Table.Column
            title="Action"
            width="88px"
            align="center"
            render={(value, record: IPurchaseRequisitionApprovalItem, index: number) => {
              return (
                <Popconfirm title="Are you sure you want to delete this item?" okText="OK" cancelText="Cancel" onConfirm={() => removeApprovalItem(record)}>
                  <Button icon={<DeleteOutlined />} />
                </Popconfirm>
              );
            }}
          />
        </Table>
      </div>
    </>
  );
};

export default PurchaseRequititionApprovalTable;
