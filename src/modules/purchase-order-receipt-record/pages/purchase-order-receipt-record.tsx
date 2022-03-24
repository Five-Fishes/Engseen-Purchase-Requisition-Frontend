import { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Input, Button, DatePicker } from 'antd';
import Title from 'antd/lib/typography/Title';
import { ReloadOutlined } from '@ant-design/icons';
import moment from 'moment';

import { getSearchText, SearchEngine } from '@utils/search/native-search';
import { IPurchaseOrderReceiptHeader } from '@dto/i-purchase-order-receipt-header.dto';
import { Sort } from '@constant/sort.enum';
import { getPurchaseOrderReceiptHeaders } from '@api/purchase-order-receipt.api';
import { ApiResponseStatus } from '@constant/api-status.enum';
import generateIndex from '../components/purchase-order-receipt-table/purchase-order-receipt-table-indexer';
import PurchaseOrderReceiptTable from '../components/purchase-order-receipt-table/purchase-order-receipt-table';
import { popNotification } from '@module/shared/components/notification';
import { NotificationType } from '@constant/notification.enum';
import CLONING_LIB from '@utils/cloning/cloning-lib-wrapper';
import { setLoading } from '@module/shared/reducers/app-reducers';

interface IPurchaseOrderReceiptRecordProps extends StateProps, DispatchProps {}

const PurchaseOrderReceiptRecordPage: React.FC<IPurchaseOrderReceiptRecordProps> = (props: IPurchaseOrderReceiptRecordProps) => {
  const [purchaseOrderReceiptHeaders, setPurchaseOrderReceiptHeaders] = useState<IPurchaseOrderReceiptHeader[]>();
  const [filteredPurchaseOrderReceiptHeaders, setFilteredPurchaseOrderReceiptHeaders] = useState<IPurchaseOrderReceiptHeader[]>();
  
  const [searchText, setSearchText] = useState<string>('');
  const searchEngine: SearchEngine<IPurchaseOrderReceiptHeader> = new SearchEngine([], generateIndex);

  const [startDateFilterCriteria, setStartDateFilterCriteria] = useState<Date>();
  const [endDateFilterCriteria, setEndDateFilterCriteria] = useState<Date>();
  // const [sortCriteria, setSortCriteria] = useState<Sort>(Sort.DES);

  useEffect(() => {
    const getPurchaseOrderReceiptHeaderList = async () => {
      const apiResponse = await getPurchaseOrderReceiptHeaders(new Date(), new Date(), Sort.DES);

      if (apiResponse && apiResponse.status === ApiResponseStatus.SUCCESS) {
        const deepCopy: IPurchaseOrderReceiptHeader[] = CLONING_LIB.deepClone(apiResponse.data);
        setPurchaseOrderReceiptHeaders(deepCopy);
        setFilteredPurchaseOrderReceiptHeaders(deepCopy);
      }
    };

    getPurchaseOrderReceiptHeaderList();
  }, []);

  useEffect(() => {
    console.group(PurchaseOrderReceiptRecordPage.name);
    console.log('Filtering list after filters are set >>: ', {
      startDateFilterCriteria,
      endDateFilterCriteria,
    });
    filterPurchaseOrderReceiptHeaders();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [startDateFilterCriteria, endDateFilterCriteria]);

  /* useEffect(() => {
    console.group(PurchaseOrderReceiptRecordPage.name);
    console.log('Sorting list after sort is set >>: ', {
      sortCriteria,
    });
    sortPurchaseOrderReceiptHeaderByDate(sortCriteria);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sortCriteria]); */

  const search = () => {
    props.setLoading(true);
    const sanitisedSearchText: string = getSearchText(searchText);
    const filteredData = searchEngine.updateEngine(purchaseOrderReceiptHeaders ?? []).search(sanitisedSearchText);
    setFilteredPurchaseOrderReceiptHeaders(filteredData);
    setTimeout(function () {
    props.setLoading(false);
    }, 500);
  };

  const filterByDateRange = (startDate?: string, endDate?: string) => {
    const startDateValue = startDate === undefined ? startDate : new Date(new Date(startDate).setHours(0, 0, 0, 0));
    setStartDateFilterCriteria(startDateValue);
    const endDateValue = endDate === undefined ? endDate : new Date(new Date(endDate).setHours(23, 59, 59, 59));
    setEndDateFilterCriteria(endDateValue);
    filterPurchaseOrderReceiptHeaders();
  };

  const filterPurchaseOrderReceiptHeaders = () => {
    const filteredResult: IPurchaseOrderReceiptHeader[] = [];
    props.setLoading(true);
    purchaseOrderReceiptHeaders?.forEach((purchaseOrderReceiptHeader) => {
      const purchaseOrderReceiptHeaderGrnDate = new Date(purchaseOrderReceiptHeader.grnDate);
      if (startDateFilterCriteria !== undefined && purchaseOrderReceiptHeaderGrnDate < startDateFilterCriteria) {
      } else if (endDateFilterCriteria !== undefined && purchaseOrderReceiptHeaderGrnDate > endDateFilterCriteria) {
      } else {
        filteredResult.push(purchaseOrderReceiptHeader);
      }
    });
    console.log('Filtered result >>:', filteredResult);
    console.groupEnd();
    setFilteredPurchaseOrderReceiptHeaders(filteredResult);
    setTimeout(function () {
      props.setLoading(false);
    }, 500);
  };

  /* const sortPurchaseOrderReceiptHeaderByDate = (sort: Sort) => {
    props.setLoading(true);
    setSortCriteria(sort);
    filteredPurchaseOrderReceiptHeaders?.sort((purchaseOrderReceiptHeader1, purchaseOrderReceiptHeader2) => {
      if (sort === Sort.ASC) {
        return purchaseOrderReceiptHeader1.grnDate < purchaseOrderReceiptHeader2.grnDate ? -1 : 1;
      } else if (sort === Sort.DES) {
        return purchaseOrderReceiptHeader1.grnDate > purchaseOrderReceiptHeader2.grnDate ? -1 : 1;
      }
      return 0;
    });
    setTimeout(function () {
      props.setLoading(false);
    }, 500);
  }; */

  const resetSortingAndFilter = () => {
    setFilteredPurchaseOrderReceiptHeaders(purchaseOrderReceiptHeaders);

    setStartDateFilterCriteria(undefined);
    setEndDateFilterCriteria(undefined);
    // setSortCriteria(Sort.DES);
    // sortPurchaseOrderReceiptHeaderByDate(Sort.DES);

    filterPurchaseOrderReceiptHeaders();
    popNotification('Success Reset Sorting & Filtering', NotificationType.success);
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
          <div className="d-inline-flex flex-row align-items-center" style={{ gap: '15px', width: 'max-content' }}>
            <label>Advance Sorting / Filtering</label>
            <DatePicker.RangePicker
              inputReadOnly
              format="DD/MM/YYYY"
              allowEmpty={[true, true]}
              value={[startDateFilterCriteria === undefined ? null : moment(startDateFilterCriteria), endDateFilterCriteria === undefined ? null : moment(endDateFilterCriteria)]}
              onChange={(dateValues) => filterByDateRange(dateValues != null ? dateValues[0]?.toString() : undefined, dateValues != null ? dateValues[1]?.toString() : undefined)}
            />
            {/* <Select key="sort-submission-request-select" value={sortCriteria} onChange={(value) => sortPurchaseApprovalOrderByDate(value)}>
              <Select.Option value={Sort.DES}>Created Date Desc</Select.Option>
              <Select.Option value={Sort.ASC}>Created Date Asc</Select.Option>
            </Select> */}
            <Button className="d-inline-flex align-items-center" onClick={resetSortingAndFilter}>
              <ReloadOutlined />
              Reset
            </Button>
          </div>
          <div className="mx-2 d-inline-flex border-top mt-4 w-100">
            <div className="my-2 mx-4 position-relative w-100">
              <div className="d-flex flex-column justify-content-center">
                <Input.Search
                  allowClear
                  placeholder="Search"
                  bordered={false}
                  value={searchText}
                  onChange={(e: any) => setSearchText(e.target.value)}
                  onSearch={search}
                  style={{
                    width: '40%',
                    borderBottom: '1px solid #d9d9d9',
                    position: 'absolute',
                    right: '5px',
                  }}
                />
              </div>
              <PurchaseOrderReceiptTable filteredItems={filteredPurchaseOrderReceiptHeaders} />
            </div>
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
