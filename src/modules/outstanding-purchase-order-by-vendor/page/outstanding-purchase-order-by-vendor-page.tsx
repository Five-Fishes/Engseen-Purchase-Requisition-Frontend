import { SettingOutlined, StarOutlined } from '@ant-design/icons';
import { createFavouriteVendor } from '@api/favourite-vendor.api';
import { getOutstandingPurchaseOrder } from '@api/purchase-order.api';
import { ApiResponseStatus } from '@constant/api-status.enum';
import { NotificationType } from '@constant/notification.enum';
import { IPurchaseOrderItem } from '@dto/i-purchase-order-item.dto';
import VendorDebounceSelect from '@module/purchase-requisition-template/components/vendor-debounce-select';
import { popNotification } from '@module/shared/components/notification';
import { generateErrorMessage } from '@utils/api/api-error-handler';
import CLONING_LIB from '@utils/cloning/cloning-lib-wrapper';
import { getSearchText, SearchEngine } from '@utils/search/native-search';
import { Button, DatePicker, Input } from 'antd';
import Title from 'antd/lib/typography/Title';
import { AxiosResponse } from 'axios';
import moment from 'moment';
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import FavouriteVendorDrawer from '../components/favourite-vendor-drawer';
import OutstandingPurchaseOrderByVendorTable from '../components/outstanding-purchase-order-by-vendor-table';

const purchaseOrderItemSearchIndexer = (items: IPurchaseOrderItem) => {
  const str = JSON.stringify(items);
  return getSearchText(str).toLowerCase();
};

const OutstandingPurchaseOrderByVendorPage: React.FC<{}> = () => {
  const searchEngine = new SearchEngine<IPurchaseOrderItem>([], purchaseOrderItemSearchIndexer);
  const routingHistory = useHistory();
  const [tableSettingVisible, setTableSettingVisible] = useState<boolean>(false);
  const [favouriteVendortVisible, setFavouriteVendortVisible] = useState<boolean>(false);
  const [selectedVendorID, setSelectedVendorID] = useState<string>();
  const [outstandingPurchaseOrder, setOutstandingPurchaseOrder] = useState<IPurchaseOrderItem[]>();
  const [outstandingPurchaseOrderSearchResult, setOutstandingPurchaseOrderSearchResult] = useState<IPurchaseOrderItem[]>([]);
  const [poReceiptDate, setPoReceiptDate] = useState<Date>(new Date());
  const [searchText, setSearchText] = useState<string>('');

  /**
   * Initialise table data
   */
  useEffect(() => {
    (async () => {
      try {
        if (selectedVendorID) {
          const outstandingPurchaseOrderResponse: AxiosResponse<IPurchaseOrderItem[]> = await getOutstandingPurchaseOrder(selectedVendorID);
          if (outstandingPurchaseOrderResponse) {
            if (outstandingPurchaseOrderResponse.status === ApiResponseStatus.SUCCESS) {
              setOutstandingPurchaseOrder(outstandingPurchaseOrderResponse.data);
            } else {
              const errorMessage: string = generateErrorMessage(outstandingPurchaseOrderResponse.status);
              popNotification(errorMessage, NotificationType.error);
            }
          } else {
            popNotification('No response from server!! Please check is server live and running 📡📡📡', NotificationType.error);
          }
        }
      } catch (error) {
        popNotification('No response from server!! Please check is server live and running 📡📡📡', NotificationType.error);
      }
    })();
  }, [selectedVendorID]);

  useEffect(() => {
    if (outstandingPurchaseOrder) {
      const searchResult = searchEngine.updateEngine(outstandingPurchaseOrder).search(searchText);
      setOutstandingPurchaseOrderSearchResult(CLONING_LIB.deepClone(searchResult));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [outstandingPurchaseOrder, searchText]);

  const onSearch = (value: string) => {
    setSearchText(getSearchText(value));
  };

  const onMarkAsFavouriteVendorClicked = async () => {
    if (selectedVendorID) {
      try {
        const res = await createFavouriteVendor(selectedVendorID);
        if (res.status === ApiResponseStatus.SUCCESS) {
          popNotification('Successfully Added as Favourite Vendor', NotificationType.success);
        } else {
          popNotification(generateErrorMessage(res.status), NotificationType.error);
        }
      } catch (error) {
        popNotification(`${error}`, NotificationType.error);
      }
    }
  };

  const navigateToCreatePoReceiptPage = () => {
    if (selectedVendorID) {
      routingHistory.push(`/purchase-order-receipt-creation/${selectedVendorID}`); //TODO: [LU] add required path variables correctly
    } else {
      popNotification('No Vendor Selected!!', NotificationType.warning);
    }
  };

  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <div className="col">
            <Title level={4}>Outstanding Purchase Order by Vendor</Title>
          </div>
          <div className="col d-flex flex-column align-items-end">
            <div className="d-flex w-100">
              <VendorDebounceSelect selectedVendor={selectedVendorID} setSelectedVendor={setSelectedVendorID}></VendorDebounceSelect>
              <div style={{ width: 5 }}></div>
              <Button onClick={onMarkAsFavouriteVendorClicked} style={{ width: '50px' }} icon={<StarOutlined />}></Button>
            </div>
          </div>
          <div className="col d-flex flex-column align-items-end">
            <div className="d-flex">
              <Input.Search placeholder="Search" onSearch={onSearch} allowClear></Input.Search>
              <Button onClick={() => setTableSettingVisible(true)} style={{ width: '50px' }} icon={<SettingOutlined />}></Button>
              <Button onClick={() => setFavouriteVendortVisible(true)}>Fav. Vendors</Button>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col">
            <OutstandingPurchaseOrderByVendorTable
              outstandingPurchaseOrderTableColumnSettingVisible={tableSettingVisible}
              setOutstandingPurchaseOrderTableColumnSettingVisible={setTableSettingVisible}
              outstandingPurchaseOrderSearchResult={outstandingPurchaseOrderSearchResult}
            />
          </div>
        </div>
        <div className="row">
          <div className="col p-2">
            <Button onClick={navigateToCreatePoReceiptPage} type="primary">
              Create PO Receipt
            </Button>
          </div>
          <div className="col p-2">
            Date: <DatePicker format="DD/MM/YYYY" value={moment(poReceiptDate)} onChange={(date) => setPoReceiptDate(date?.toDate() || new Date())} inputReadOnly></DatePicker>
          </div>
        </div>
      </div>
      <FavouriteVendorDrawer visible={favouriteVendortVisible} setVisible={setFavouriteVendortVisible} setSelectedFavouriteVendorID={setSelectedVendorID} />
    </>
  );
};

export default OutstandingPurchaseOrderByVendorPage;
