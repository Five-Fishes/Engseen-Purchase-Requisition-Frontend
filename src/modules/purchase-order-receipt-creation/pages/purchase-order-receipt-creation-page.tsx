import { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Input, Button, Drawer, Form } from 'antd';
import Title from 'antd/lib/typography/Title';
import { SettingOutlined } from '@ant-design/icons';

import CLONING_LIB from '@utils/cloning/cloning-lib-wrapper';
import { ITableColumnDisplaySettings } from '@dto/i-table-columns';
import { getSearchText, SearchEngine } from '@utils/search/native-search';

import PurchaseOrderReceiptCreationRequestConstructor from '../components/request-constructor/request-constructor';
import PurchaseOrderReceiptCreationTableDisplaySettings from '../components/table-column-display-settings/table-column-display-settings';
import generateIndex from '../components/request-constructor/request-constructor-indexer';
import { setLoading } from '@module/shared/reducers/app-reducers';
import { IWindowSize, useWindowResized } from '@hook/window-resized.hook';
import { APP_HEADER_HEIGHT } from '@constant/display/header.constant';
import DEFAULT_PURCHASE_ORDER_RECEIPT_CREATION_TABLE_DISPLAY_SETTINGS from '@constant/purchase-order-receipt-creation/purchase-order-receipt-creation-table-display-settings';
import { APP_CONTENT_MARGIN } from '@constant/display/content.constant';
import { PURCHASE_ORDER_RECEIPT_CREATION_BOTTOM_TOOLS_HEIGHT, PURCHASE_ORDER_RECEIPT_CREATION_TITLE_HEIGHT, PURCHASE_ORDER_RECEIPT_CREATION_TOP_TOOLS_HEIGHT } from '@constant/display/purchase-order-receipt-creation.constant';
import { IPurchaseOrderItem } from '@dto/i-purchase-order-item.dto';
import { ApiResponseStatus } from '@constant/api-status.enum';

interface IPurchaseOrderReceiptCreationPageProps extends StateProps, DispatchProps {}

const PurchaseOrderReceiptCreationPage: React.FC<IPurchaseOrderReceiptCreationPageProps> = (props: IPurchaseOrderReceiptCreationPageProps) => {
  const [submissionInProgress, setSubmissionInProgress] = useState<boolean>(false);
  const [purchaseOrderItem, setPurchaseOrderItem] = useState<IPurchaseOrderItem[]>();
  const [remarks, setRemarks] = useState<string>('');
  const [reference, setReference] = useState<string>('');
  const [tableColumnDisplaySettings, setTableColumnDisplaySettings] = useState<ITableColumnDisplaySettings[]>();
  const [tableColumnDisplaySettingsUpdateTime, setTableColumnDisplaySettingsUpdateTime] = useState<Date>(new Date());
  const [searchResult, setSearchResult] = useState<IPurchaseOrderItem[]>();
  const [showTableDisplaySettings, setShowTableDisplaySettings] = useState<boolean>(false);
  const searchEngine: SearchEngine<IPurchaseOrderItem> = new SearchEngine([], generateIndex);
  const windowSize: IWindowSize = useWindowResized();
  const PURCHASE_ORDER_RECEIPT_CREATION_CONSTRUCTOR_WRAPPER_HEIGHT_CONSTRAINT: number =
    APP_HEADER_HEIGHT + APP_CONTENT_MARGIN + PURCHASE_ORDER_RECEIPT_CREATION_TITLE_HEIGHT + PURCHASE_ORDER_RECEIPT_CREATION_TOP_TOOLS_HEIGHT + PURCHASE_ORDER_RECEIPT_CREATION_BOTTOM_TOOLS_HEIGHT;

    /* useEffect(() => {
      const getOutstandingPurchaseOrderItemList = async () => {
        const vendorID: string = '';
        const apiResponse = await getOutstanfingPurchaseOrder(vendorID);
  
        if (apiResponse && apiResponse.status === ApiResponseStatus.SUCCESS) {
          const deepCopy: IPurchaseOrderItem[] = CLONING_LIB.deepClone(apiResponse.data);
          setPurchaseOrderItem(deepCopy);
        }
      };
  
      getOustandingPurchaseOrderItemList();
    }, []); */

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

  const submitPurchaseOrderReceiptCreation = async () => {
    setSubmissionInProgress(true);
    if (purchaseOrderItem) {
      // TODO: submit for Insert PO Receipt 
      /* const purchaseOrderReceiptHeader = {};
      const purchaseOrderReceiptItems: IPurchaseOrderReceiptItem[] = purchaseOrderItem.map((item) => {
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
    console.log("Popup Modal to show receiving items");
  };

  const completePurchaseOrderReceiptCreation = () => {
    console.log("Done PO Receipt Creation");
  };

  return (
    <>
      <div className="container-fluid">
        <div className="row" style={{ height: `${PURCHASE_ORDER_RECEIPT_CREATION_TITLE_HEIGHT}px` }}>
          <div className="col d-flex flex-column justify-content-center">
            <Title level={4}>Purchase Order Receipt Creation</Title>
          </div>
        </div>

        <div>
          {/* TODO: PO Receipt Header Information */}
        </div>

        <div className="row" style={{ height: `${PURCHASE_ORDER_RECEIPT_CREATION_TOP_TOOLS_HEIGHT}px` }}>
          <div className="col-4 d-flex">
            <Input.Search placeholder="Search" onSearch={handleSearch} allowClear></Input.Search>
            <Button onClick={openTableDisplaySettings} style={{ width: '50px' }} icon={<SettingOutlined />}></Button>
          </div>
        </div>

        <div>
          <Form name="basic" layout="vertical" autoComplete="off">
            <Form.Item label="Reference">
              <Input.TextArea className="remarks-textbox" value={reference} onChange={(e) => setReference(e.target.value)} rows={3} placeholder="Reference here"></Input.TextArea>
            </Form.Item>
            <Form.Item label="Remarks">
              <Input.TextArea className="remarks-textbox" value={remarks} onChange={(e) => setRemarks(e.target.value)} rows={3} placeholder="Remarks here"></Input.TextArea>
            </Form.Item>
          </Form>
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
          </div>
          <div className="col">
            <Button type="primary" size="large" onClick={checkPurchaseOrderReceiptCreation} disabled={submissionInProgress}>
              Check Receiving
            </Button>
          </div>
          <div className="col d-flex flex-column align-items-end">
            <Button type="primary" size="large" onClick={completePurchaseOrderReceiptCreation} disabled={submissionInProgress}>
              Done
            </Button>
          </div>
        </div>
      </div>

      <Drawer title="Column Settings" placement="right" onClose={openTableDisplaySettings} visible={showTableDisplaySettings}>
        <PurchaseOrderReceiptCreationTableDisplaySettings tableColumnDisplaySettings={tableColumnDisplaySettings} setTableColumnDisplaySettings={setTableColumnDisplaySettings} />
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
