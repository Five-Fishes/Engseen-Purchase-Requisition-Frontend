import { createPurchaseOrderReceiptHeaderByVendorId } from '@api/purchase-order-receipt-header.api';
import { getPurchaseOrderReceiptHeaderByGrnNo } from '@api/purchase-order-receipt.api';
import { ApiResponseStatus } from '@constant/api-status.enum';
import { IPurchaseOrderReceiptHeader } from '@dto/i-purchase-order-receipt-header.dto';
import CLONING_LIB from '@utils/cloning/cloning-lib-wrapper';
import { convertToLocalString } from '@utils/date-time/date-time-format';
import { Form, Input } from 'antd';
import { useEffect, useState } from 'react';

interface IPurchaseOrderReceiptHeaderInfoProps {
  doNumber: string;
  setDONumber: (value: string) => void;
  grnNo: string | null;
  setGrnNo: (grnNo: string) => void;
  grnDate?: Date;
  vendorId: string;
  vendorName?: string;
}

const PurchaseOrderReceiptHeaderInfo: React.FC<IPurchaseOrderReceiptHeaderInfoProps> = (props) => {
  const [poReceiptHeader, setPOReceiptHeader] = useState<IPurchaseOrderReceiptHeader>();
  const { doNumber, setDONumber, grnNo, setGrnNo, vendorId } = props;

  useEffect(() => {
    const getNewPOReceiptHeader = async (vendorId: string) => {
      const apiResponse = await createPurchaseOrderReceiptHeaderByVendorId(vendorId);

      if (apiResponse && apiResponse.status === ApiResponseStatus.SUCCESS) {
        const deepCopy: IPurchaseOrderReceiptHeader = CLONING_LIB.deepClone(apiResponse.data);
        console.log('createPurchaseOrderReceiptHeaderByVendorId >>: ', deepCopy);
        setPOReceiptHeader(deepCopy);
        setGrnNo(deepCopy.grnNo);
      }
    };

    const getPOReceiptHeaderByGrnNo = async (grnNo: string) => {
      const apiResponse = await getPurchaseOrderReceiptHeaderByGrnNo(grnNo);

      if (apiResponse && apiResponse.status === ApiResponseStatus.SUCCESS) {
        const deepCopy: IPurchaseOrderReceiptHeader = CLONING_LIB.deepClone(apiResponse.data);
        setPOReceiptHeader(deepCopy);
      }
    };

    if (grnNo != null && grnNo.trim() !== '') {
      getPOReceiptHeaderByGrnNo(grnNo);
    } else {
      getNewPOReceiptHeader(vendorId);
    }
  }, [grnNo, setGrnNo, vendorId]);

  return (
    <>
      <div className="d-flex justify-content-between align-items-center mx-2 mb-2">
        <div>
          <Form.Item label="DO">
            <Input value={doNumber} onChange={(e) => setDONumber(e.target.value)} placeholder="DO Number"></Input>
          </Form.Item>
        </div>
        <div>
          <strong>PO Receipt Created</strong>: {grnNo ?? poReceiptHeader?.grnNo}
          <br />
          <strong>Date</strong>: {poReceiptHeader ? convertToLocalString(poReceiptHeader.grnDate) : ''}
          <br />
          <strong>Vendor</strong>: {vendorId} {poReceiptHeader?.vendorName}
          <br />
        </div>
      </div>
    </>
  );
};

export default PurchaseOrderReceiptHeaderInfo;
