import { SettingOutlined } from '@ant-design/icons';
import { getOutstandingPurchaseOrder } from '@api/purchase-order.api';
import { ApiResponseStatus } from '@constant/api-status.enum';
import { NotificationType } from '@constant/notification.enum';
import { IPurchaseOrderItem } from '@dto/i-purchase-order-item.dto';
import OutstandingPurchaseOrderTable from '@module/outstading-purchase-order/components/outstanding-purchase-order-table';
import { popNotification } from '@module/shared/components/notification';
import { generateErrorMessage } from '@utils/api/api-error-handler';
import CLONING_LIB from '@utils/cloning/cloning-lib-wrapper';
import { getSearchText, SearchEngine } from '@utils/search/native-search';
import { Button, Input } from 'antd';
import Title from 'antd/lib/typography/Title';
import { AxiosResponse } from 'axios';
import { useEffect, useState } from 'react';

const purchaseOrderItemSearchIndexer = (items: IPurchaseOrderItem) => {
  const str = JSON.stringify(items);
  return getSearchText(str).toLowerCase();
};

const OutstandingPurchaseOrderByVendorPage: React.FC<{}> = () => {
  const searchEngine = new SearchEngine<IPurchaseOrderItem>([], purchaseOrderItemSearchIndexer);
  const [tableSettingVisible, setTableSettingVisible] = useState<boolean>(false);
  const [outstandingPurchaseOrder, setOutstandingPurchaseOrder] = useState<IPurchaseOrderItem[]>();
  const [outstandingPurchaseOrderSearchResult, setOutstandingPurchaseOrderSearchResult] = useState<IPurchaseOrderItem[]>([]);
  const [searchText, setSearchText] = useState<string>('');

  /**
   * Initialise table data
   */
  useEffect(() => {
    (async () => {
      try {
        const outstandingPurchaseOrderResponse: AxiosResponse<IPurchaseOrderItem[]> = await getOutstandingPurchaseOrder();
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
      } catch (error) {
        popNotification('No response from server!! Please check is server live and running 📡📡📡', NotificationType.error);
      }
    })();
  }, []);

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

  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <div className="col">
            <Title level={4}>Outstanding Purchase Order by Vendor</Title>
          </div>
          <div className="col d-flex flex-column align-items-end">
            <div className="d-flex">
              <Input.Search placeholder="Search" onSearch={onSearch} allowClear></Input.Search>
              <Button onClick={() => setTableSettingVisible(true)} style={{ width: '50px' }} icon={<SettingOutlined />}></Button>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col">
            <OutstandingPurchaseOrderTable
              outstandingPurchaseOrderTableColumnSettingVisible={tableSettingVisible}
              setOutstandingPurchaseOrderTableColumnSettingVisible={setTableSettingVisible}
              outstandingPurchaseOrderSearchResult={outstandingPurchaseOrderSearchResult}
            />
          </div>
        </div>
        <div className="row">
          <div className="col p-2">
            <Button type="primary">Create Purchase Order Receipt</Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default OutstandingPurchaseOrderByVendorPage;
