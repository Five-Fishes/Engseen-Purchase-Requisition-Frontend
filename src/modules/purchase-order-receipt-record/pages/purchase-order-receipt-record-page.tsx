import { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import Title from 'antd/lib/typography/Title';

import { IPurchaseOrderReceiptHeader } from '@dto/i-purchase-order-receipt-header.dto';
import { IPurchaseOrderReceiptSearchCriteria } from '@dto/i-purchase-order-receipt-search-criteria.dto';
import { Sort } from '@constant/sort.enum';
import { getPurchaseOrderReceiptHeaders, searchPurchaseOrderReceiptHeaders } from '@api/purchase-order-receipt.api';
import { ApiResponseStatus } from '@constant/api-status.enum';
import PurchaseOrderReceiptTable from '../components/purchase-order-receipt-table/purchase-order-receipt-table';
import PurchaseOrderReceiptSearchForm from '../components/purchase-order-receipt-search-form/purchase-order-receipt-search-form';
import { popNotification } from '@module/shared/components/notification';
import { NotificationType } from '@constant/notification.enum';
import { setLoading } from '@module/shared/reducers/app-reducers';
import CLONING_LIB from '@utils/cloning/cloning-lib-wrapper';

interface IPurchaseOrderReceiptRecordProps extends StateProps, DispatchProps {}

const PurchaseOrderReceiptRecordPage: React.FC<IPurchaseOrderReceiptRecordProps> = (props: IPurchaseOrderReceiptRecordProps) => {
  const [purchaseOrderReceiptHeaders, setPurchaseOrderReceiptHeaders] = useState<IPurchaseOrderReceiptHeader[]>();

  useEffect(() => {
    const getPurchaseOrderReceiptHeaderList = async () => {
      const apiResponse = await getPurchaseOrderReceiptHeaders(new Date(), new Date(), Sort.DES);

      if (apiResponse && apiResponse.status === ApiResponseStatus.SUCCESS) {
        const deepCopy: IPurchaseOrderReceiptHeader[] = CLONING_LIB.deepClone(apiResponse.data);
        setPurchaseOrderReceiptHeaders(deepCopy);
      }
    };

    getPurchaseOrderReceiptHeaderList();
  }, []);

  const performSearch = async (searchCriteria: IPurchaseOrderReceiptSearchCriteria) => {
    const apiResponse = await searchPurchaseOrderReceiptHeaders(Sort.DES, searchCriteria);
    if (apiResponse && apiResponse.status === ApiResponseStatus.SUCCESS) {
      const deepCopy: IPurchaseOrderReceiptHeader[] = CLONING_LIB.deepClone(apiResponse.data);
      setPurchaseOrderReceiptHeaders(deepCopy);
      popNotification('Success Search PO Receipt Records', NotificationType.success);
    } else {
      popNotification('Failed to Search PO Receipt Records', NotificationType.error);
    }
  };

  return (
    <>
      <div className="container-fluid h-100">
        <div>
          <div className="mb-2 w-100">
            <Title className="d-inline-block" level={4}>
              Purchase Order Receipt Record
            </Title>
          </div>
          <div>
            <PurchaseOrderReceiptSearchForm performSearch={performSearch} />
          </div>
          <div className="mx-2 d-inline-flex border-top mt-4 w-100">
            <PurchaseOrderReceiptTable filteredItems={purchaseOrderReceiptHeaders} />
          </div>
        </div>
      </div>
    </>
  );
};

const mapStateToProps = () => ({});

const mapDispatchToProps = {
  setLoading,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(PurchaseOrderReceiptRecordPage);
