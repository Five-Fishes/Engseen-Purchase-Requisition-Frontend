import { FormOutlined, SettingOutlined } from '@ant-design/icons';
import { getGrnReceiptWithVendorOutstandingPO, getOutstandingPurchaseOrder } from '@api/purchase-order.api';
import { ApiResponseStatus } from '@constant/api-status.enum';
import { APP_CONTENT_MARGIN } from '@constant/display/content.constant';
import { APP_HEADER_HEIGHT } from '@constant/display/header.constant';
import {
  PURCHASE_ORDER_RECEIPT_CREATION_BOTTOM_TOOLS_HEIGHT,
  PURCHASE_ORDER_RECEIPT_CREATION_TITLE_HEIGHT,
  PURCHASE_ORDER_RECEIPT_CREATION_TOP_TOOLS_HEIGHT,
} from '@constant/display/purchase-order-receipt-creation.constant';
import DEFAULT_PURCHASE_ORDER_RECEIPT_CREATION_TABLE_DISPLAY_SETTINGS from '@constant/purchase-order-receipt-creation/purchase-order-receipt-creation-table-display-settings';
import { PurchaseOrderReceiptItemStatus } from '@constant/purchase-order-receipt-item-status.enum';
import { IPurchaseOrderItem } from '@dto/i-purchase-order-item.dto';
import { ITableColumnDisplaySettings } from '@dto/i-table-columns';
import { IWindowSize, useWindowResized } from '@hook/window-resized.hook';
import { setLoading } from '@module/shared/reducers/app-reducers';
import CLONING_LIB from '@utils/cloning/cloning-lib-wrapper';
import { getSearchText, SearchEngine } from '@utils/search/native-search';
import { Button, Drawer, Input, Popover, Table } from 'antd';
import Title from 'antd/lib/typography/Title';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';
import PurchaseOrderReceiptHeaderInfo from '../components/receipt-header-info/receipt-header-info';
import PurchaseOrderReceiptCreationRequestConstructor from '../components/request-constructor/request-constructor';
import generateIndex from '../components/request-constructor/request-constructor-indexer';
import PurchaseOrderReceiptCreationRequestRemarks from '../components/request-remark/request-remark';
import PurchaseOrderReceiptCreationTableDisplaySettings from '../components/table-column-display-settings/table-column-display-settings';

interface IPurchaseOrderReceiptCreationPageProps extends StateProps, DispatchProps, RouteComponentProps<{ vendorId: string; grnNo?: string }> {}

const PurchaseOrderReceiptCreationPage: React.FC<IPurchaseOrderReceiptCreationPageProps> = (props: IPurchaseOrderReceiptCreationPageProps) => {
  const [submissionInProgress, setSubmissionInProgress] = useState<boolean>(false);
  const [purchaseOrderItem, setPurchaseOrderItem] = useState<IPurchaseOrderItem[]>();
  const [searchResult, setSearchResult] = useState<IPurchaseOrderItem[]>();
  const searchEngine: SearchEngine<IPurchaseOrderItem> = new SearchEngine([], generateIndex);
  const [doNumber, setDONumber] = useState<string>('');
  const [remarks, setRemarks] = useState<string>('');
  const [reference, setReference] = useState<string>('');
  const [showRemarksSider, setShowRemarksSider] = useState<boolean>(false);
  const [tableColumnDisplaySettings, setTableColumnDisplaySettings] = useState<ITableColumnDisplaySettings[]>();
  const [tableColumnDisplaySettingsUpdateTime, setTableColumnDisplaySettingsUpdateTime] = useState<Date>(new Date());
  const [showTableDisplaySettings, setShowTableDisplaySettings] = useState<boolean>(false);
  const windowSize: IWindowSize = useWindowResized();
  const PURCHASE_ORDER_RECEIPT_CREATION_CONSTRUCTOR_WRAPPER_HEIGHT_CONSTRAINT: number =
    APP_HEADER_HEIGHT + APP_CONTENT_MARGIN + PURCHASE_ORDER_RECEIPT_CREATION_TITLE_HEIGHT + PURCHASE_ORDER_RECEIPT_CREATION_TOP_TOOLS_HEIGHT + PURCHASE_ORDER_RECEIPT_CREATION_BOTTOM_TOOLS_HEIGHT;

  const { vendorId, grnNo } = props.match.params;

  useEffect(() => {
    const getGrnPOReceiptWithVendorOutstandingPO = async () => {
      const apiResponse = await getGrnReceiptWithVendorOutstandingPO(vendorId, grnNo ?? '');

      if (apiResponse && apiResponse.status === ApiResponseStatus.SUCCESS) {
        const deepCopy: IPurchaseOrderItem[] = CLONING_LIB.deepClone(apiResponse.data);
        setPurchaseOrderItem(deepCopy);
      }
    };

    const getOutstandingPurchaseOrderItemList = async () => {
      const apiResponse = await getOutstandingPurchaseOrder(vendorId);

      if (apiResponse && apiResponse.status === ApiResponseStatus.SUCCESS) {
        const deepCopy: IPurchaseOrderItem[] = CLONING_LIB.deepClone(apiResponse.data);
        setPurchaseOrderItem(deepCopy);
      }
    };

    if (grnNo != null && grnNo.trim() !== '') {
      getGrnPOReceiptWithVendorOutstandingPO();
    } else {
      getOutstandingPurchaseOrderItemList();
    }
  }, [vendorId, grnNo]);

  useEffect(() => {
    const savedPurchaseOrderReceiptCreationTableDisplaySettings = localStorage.getItem('purchaseOrderReceiptCreationTableDisplaySettings');
    if (savedPurchaseOrderReceiptCreationTableDisplaySettings) {
      const parsedSavedPurchaseOrderReceiptCreationTableDisplaySettings: ITableColumnDisplaySettings[] = JSON.parse(savedPurchaseOrderReceiptCreationTableDisplaySettings);
      setTableColumnDisplaySettings(parsedSavedPurchaseOrderReceiptCreationTableDisplaySettings);
    } else {
      setTableColumnDisplaySettings(DEFAULT_PURCHASE_ORDER_RECEIPT_CREATION_TABLE_DISPLAY_SETTINGS);
    }
  }, []);

  /**
   * Update the tableColumnDisplaySettingsUpdateTime to latest date if it is being modified
   */
  useEffect(() => {
    setTableColumnDisplaySettingsUpdateTime(new Date());
  }, [tableColumnDisplaySettings]);

  useEffect(() => {
    if (purchaseOrderItem !== undefined) {
      const initSearchResult = CLONING_LIB.deepClone(purchaseOrderItem);
      setSearchResult(initSearchResult);
    }
  }, [purchaseOrderItem]);

  const handleSearch = (value: string, event: React.ChangeEvent<HTMLInputElement> | React.MouseEvent<HTMLElement, MouseEvent> | React.KeyboardEvent<HTMLInputElement> | undefined) => {
    props.setLoading(true);
    console.group('Search [PurchaseOrderReceiptCreationTable]');
    console.log('value >>: ', value);
    console.log('event >>: ', event);
    if (purchaseOrderItem) {
      console.log('purchaseOrderItem >>: ', purchaseOrderItem);
      const sanitisedSearchText: string = getSearchText(value);
      const searchOutput = searchEngine.updateEngine(purchaseOrderItem).search(sanitisedSearchText);
      setSearchResult(searchOutput);
    }
    setTimeout(function () {
      props.setLoading(false);
    }, 500);
    console.groupEnd();
  };

  const openTableDisplaySettings = () => {
    setShowTableDisplaySettings(!showTableDisplaySettings);
  };

  const openRemarksSider = () => {
    setShowRemarksSider(!showRemarksSider);
  };

  const updatePurchaseOrderReceiptItem = (list: IPurchaseOrderItem[]) => {
    if (searchResult) {
      const updatedList = CLONING_LIB.deepClone(list);
      setSearchResult(updatedList);
    }
  };

  const submitPurchaseOrderReceiptCreation = async () => {
    setSubmissionInProgress(true);
    if (purchaseOrderItem) {
      // TODO: submit for Insert PO Receipt
      /* const purchaseOrderReceiptHeader = {};
      const purchaseOrderReceiptItems: IPurchaseOrderItem[] = purchaseOrderItem.map((item) => {
        return {};
      });
      
      const result = await createPurchaseOrderReceipts(purchaseOrderReceiptHeader);
      if (result) {
        setSubmissionInProgress(false);
        if (result.status === ApiResponseStatus.SUCCESS) {
          popNotification('Successfully Create PO Receipt', NotificationType.success);
        }
      } */
    }
  };

  const checkPurchaseOrderReceiptCreation = () => {
    console.log('Popup Modal to show receiving items');
    console.log(PurchaseOrderReceiptItemStatus.CONFIRMED);
    console.log(purchaseOrderItem);
    const confirmedItems = CLONING_LIB.deepClone(purchaseOrderItem ?? []).filter((item) => item.status === PurchaseOrderReceiptItemStatus.CONFIRMED);
    console.log(confirmedItems);
    return (
      <Table dataSource={confirmedItems}>
        <Table.Column title="Component Code" align="center" dataIndex="componentCode" key="componentCode" />
        <Table.Column title="Receiving Qty(packs)" align="center" dataIndex="receivingQuantityPack" key="receivingQuantityPack" />
        <Table.Column title="Receiving Qty(kgs)" align="center" dataIndex="receivingQuantity" key="receivingQuantity" />
      </Table>
    );
  };

  const completePurchaseOrderReceiptCreation = () => {
    console.log('Done PO Receipt Creation');
  };

  return (
    <>
      <div className="container-fluid">
        <div className="row" style={{ height: `${PURCHASE_ORDER_RECEIPT_CREATION_TITLE_HEIGHT}px` }}>
          <div className="col d-flex flex-column justify-content-center">
            <Title level={4}>Purchase Order Receipt Creation</Title>
          </div>
        </div>

        <div style={{ height: `${PURCHASE_ORDER_RECEIPT_CREATION_TOP_TOOLS_HEIGHT}px` }}>
          <div>
            <PurchaseOrderReceiptHeaderInfo vendorId={vendorId} doNumber={doNumber} setDONumber={setDONumber} grnNo={grnNo} />
          </div>
          <div className="d-flex float-end">
            <Input.Search placeholder="Search" onSearch={handleSearch} allowClear></Input.Search>
            <Button onClick={openRemarksSider} style={{ width: '50px' }} icon={<FormOutlined />}></Button>
            <Button onClick={openTableDisplaySettings} style={{ width: '50px' }} icon={<SettingOutlined />}></Button>
          </div>
        </div>

        <div
          className="row"
          style={{
            height: `${windowSize.height - PURCHASE_ORDER_RECEIPT_CREATION_CONSTRUCTOR_WRAPPER_HEIGHT_CONSTRAINT}px`,
          }}
        >
          <div className="col">
            <PurchaseOrderReceiptCreationRequestConstructor
              searchResult={searchResult ?? []}
              updatePurchaseOrderReceiptItem={updatePurchaseOrderReceiptItem}
              tableColumnDisplaySettings={tableColumnDisplaySettings}
              tableColumnDisplaySettingsUpdateTime={tableColumnDisplaySettingsUpdateTime}
            />
          </div>
        </div>

        <div className="row" style={{ height: `${PURCHASE_ORDER_RECEIPT_CREATION_BOTTOM_TOOLS_HEIGHT}px` }}>
          <div className="col">
            <Button type="primary" size="large" onClick={submitPurchaseOrderReceiptCreation} disabled={submissionInProgress}>
              Submit Receiving
            </Button>
            <Popover content={checkPurchaseOrderReceiptCreation} trigger="click">
              <Button className="mx-4 input-group-btn" type="default" size="large" disabled={submissionInProgress}>
                Check Receiving
              </Button>
            </Popover>
          </div>
          <div className="col d-flex flex-column align-items-end">
            <Button className="mx-4 input-group-btn" type="default" size="large" onClick={completePurchaseOrderReceiptCreation} disabled={submissionInProgress}>
              Done
            </Button>
          </div>
        </div>
      </div>

      <Drawer title="Column Settings" placement="right" onClose={openTableDisplaySettings} visible={showTableDisplaySettings}>
        <PurchaseOrderReceiptCreationTableDisplaySettings tableColumnDisplaySettings={tableColumnDisplaySettings} setTableColumnDisplaySettings={setTableColumnDisplaySettings} />
      </Drawer>

      <Drawer title="Remarks & Reference" placement="right" width="max-content" onClose={openRemarksSider} visible={showRemarksSider}>
        <PurchaseOrderReceiptCreationRequestRemarks remarks={remarks} setRemarks={setRemarks} reference={reference} setReference={setReference} />
      </Drawer>
    </>
  );
};

const mapStateToProps = () => ({});

const mapDispatchToProps = {
  setLoading,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(PurchaseOrderReceiptCreationPage);
