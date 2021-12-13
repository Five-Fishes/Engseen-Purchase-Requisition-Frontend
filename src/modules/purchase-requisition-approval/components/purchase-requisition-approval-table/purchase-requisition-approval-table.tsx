import { useEffect, useState } from "react";
import { Button, Input, Table } from "antd";

import CLONING_LIB from "@utils/cloning/cloning-lib-wrapper";
import { SearchEngine } from "@utils/search/native-search";
import { ChangeEvent } from "@constant/change-event.enum";
import { IPurchaseRequisitionApproval } from "@dto/i-purchase-requisition-approval.dto";
import { IPurchaseRequisitionApprovalItem } from "@dto/i-purchase-requisition-approval-item.dto";
import StatefulTextInput from "@module/shared/components/stateful-input/stateful-text-input/stateful-text-input";
import StatefulNumberInput from "@module/shared/components/stateful-input/stateful-number-input/stateful-number-input";
import { PurchaseRequisitionApprovalStatus, PurchaseRequisitionApprovalStatusDisplayText } from "@constant/purchase-requisition-approval-status.enum";

import generateIndex from "./purchase-requisition-approval-table-indexer";
interface IPurchaseRequititionApprovalTableProps {
  selectedPurchaseRequisitionApproval?: IPurchaseRequisitionApproval;
  updatePurchaseRequisitionApproval: (purchaseRequisitionApproval: IPurchaseRequisitionApproval) => void;
}

const PurchaseRequititionApprovalTable: React.FC<IPurchaseRequititionApprovalTableProps> = (props) => {
  const updatePurchaseRequisitionApproval = props.updatePurchaseRequisitionApproval;
  const [searchResult, setSearchResult] = useState<IPurchaseRequisitionApprovalItem[]>();
  const searchEngine: SearchEngine<IPurchaseRequisitionApprovalItem> = new SearchEngine([], generateIndex);

  useEffect(() => {
    if (props.selectedPurchaseRequisitionApproval) {
      const initSearchResult = CLONING_LIB.deepClone(props.selectedPurchaseRequisitionApproval.purchaseRequisitionApprovalItems);
      setSearchResult(initSearchResult);
    }
  }, [props.selectedPurchaseRequisitionApproval]);

  const confirmAll: () => void = () => {
    if (props.selectedPurchaseRequisitionApproval) {
      const updatedSelectedPurchaseRequisitionApprovalItems = props.selectedPurchaseRequisitionApproval.purchaseRequisitionApprovalItems.map((item) => {
        if (item.status !== PurchaseRequisitionApprovalStatus.ISSUED) {
          item.status = PurchaseRequisitionApprovalStatus.CONFIRMED;
        }
        return item;
      });
      const updatedSelectedPurchaseRequisitionApproval = CLONING_LIB.deepClone(props.selectedPurchaseRequisitionApproval);
      updatedSelectedPurchaseRequisitionApproval.purchaseRequisitionApprovalItems = updatedSelectedPurchaseRequisitionApprovalItems;
      updatePurchaseRequisitionApproval(updatedSelectedPurchaseRequisitionApproval);
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
    console.group("dataChanged");
    console.log("changeEventType >>: ", changeEventType);
    console.log("changeEvent >>: ", changeEvent);
    console.log("record >>: ", record);
    console.log("key >>: ", key);
    console.log("index >>: ", index);
    console.groupEnd();

    let valueToUpdate: any;
    if (changeEventType === ChangeEvent.NUMBER_INPUT) {
      valueToUpdate = changeEvent;
    } else {
      valueToUpdate = changeEvent.target.value;
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
      const updatedApproval = updateData(props.selectedPurchaseRequisitionApproval, udpatedValue, item, "status");
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
    console.group("Search [PurchaseRequititionApprovalTable]");
    console.log("value >>: ", value);
    console.log("event >>: ", event);
    if (props.selectedPurchaseRequisitionApproval) {
      console.log('selectedPurchaseRequisitionApproval >>: ', props.selectedPurchaseRequisitionApproval);
      const searchOutput = searchEngine.updateEngine(props.selectedPurchaseRequisitionApproval.purchaseRequisitionApprovalItems).search(value.replace(/\s+/g, ''));
      setSearchResult(searchOutput);
    }
    console.groupEnd();
  };

  const SELECTED_PURCHASE_REQUISITION_APPROVAL_ITEMS: IPurchaseRequisitionApprovalItem[] = searchResult || [];

  return (
    <>
      <div>
        <div className="d-flex justify-content-between">
          <div>
            <strong>Submission Date</strong>: {props.selectedPurchaseRequisitionApproval && new Date(props.selectedPurchaseRequisitionApproval.createdDate).toDateString()}
          </div>
          <div>
            <Input.Search placeholder="Search" onSearch={handleSearch}></Input.Search>
          </div>
        </div>
        <Table
          dataSource={SELECTED_PURCHASE_REQUISITION_APPROVAL_ITEMS}
          rowKey="id"
          className="my-2"
          scroll={{ x: 2000, y: 500 }}
          pagination={{ pageSizeOptions: ["5", "10", "20", "50", "100"], hideOnSinglePage: true, defaultPageSize: 5 }}
        >
          <Table.Column title="Component Name" dataIndex="componentName" key="componentName" />
          <Table.Column
            title={
              <div>
                Item Cost <br /> (RM/kg)
              </div>
            }
            dataIndex="itemCost"
            key="itemCost"
            render={(value, record: IPurchaseRequisitionApprovalItem, index: number) => {
              return <StatefulNumberInput state={record.status} value={value} onChange={(e) => dataChanged(ChangeEvent.NUMBER_INPUT, e, record, "itemCost", index)} />;
            }}
          />
          <Table.Column
            title="Vendor"
            dataIndex="vendorName"
            key="vendorName"
            width="300px"
            render={(value, record: IPurchaseRequisitionApprovalItem, index: number) => {
              return <StatefulTextInput state={record.status} value={value} onChange={(e) => dataChanged(ChangeEvent.TEXT_INPUT, e, record, "vendorName", index)} />;
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
            width="200px"
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
            dataIndex="packagingSize"
            key="packagingSize"
            render={(value, record: IPurchaseRequisitionApprovalItem, index: number) => {
              return <StatefulNumberInput state={record.status} value={value} onChange={(e) => dataChanged(ChangeEvent.NUMBER_INPUT, e, record, "packagingSize", index)} />;
            }}
          />
          <Table.Column
            title="No. of Packs to Order"
            dataIndex="noOfPacks"
            key="noOfPacks"
            render={(value, record: IPurchaseRequisitionApprovalItem, index: number) => {
              return <StatefulNumberInput state={record.status} value={value} onChange={(e) => dataChanged(ChangeEvent.NUMBER_INPUT, e, record, "noOfPacks", index)} />;
            }}
          />
          <Table.Column title="Total Quantity To Order (kgs)" dataIndex="quantity" key="quantity" />
          <Table.Column
            title="Delivery Date"
            dataIndex="deliveryDate"
            key="deliveryDate"
            render={(value, record: IPurchaseRequisitionApprovalItem, index: number) => {
              return new Date(value).toDateString();
            }}
          />
          <Table.Column title="Balance" dataIndex="balance" key="balance" />
        </Table>
      </div>
    </>
  );
};

export default PurchaseRequititionApprovalTable;
