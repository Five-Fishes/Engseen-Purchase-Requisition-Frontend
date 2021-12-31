import { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Input, Button, Select, DatePicker } from 'antd';
import Title from 'antd/lib/typography/Title';
import { ArrowRightOutlined, ReloadOutlined } from '@ant-design/icons';
import moment from 'moment';

import { IPurchaseRequisitionRequest } from '@dto/i-purchase-requisition-request.dto';
import PurchaseRequisitionSubmissionTable from '../components/submission-table';
import PurchaseRequisitionSubmissionBrowser from '../components/submission-record-browser';
import { getSearchText, SearchEngine } from '@utils/search/native-search';
import { genereateIndex } from '../components/submission-indexer';
import { IPurchaseRequisitionRequestItem } from '@dto/i-purchase-requisition-request-item.dto';
import { convertToLocalString } from '@utils/date-time/date-time-format';
import { Sort } from '@constant/sort.enum';
import { getPurchaseRequisitionRequest } from '@api/purchase-requisition-request.api';
import { ApiResponseStatus } from '@constant/api-status.enum';
import CLONING_LIB from '@utils/cloning/cloning-lib-wrapper';
import { setLoading } from '@module/shared/reducers/app-reducers';

interface IPurchaseRequisitionSubmissionProps extends StateProps, DispatchProps {}

const PurchaseRequisitionSubmissionPage: React.FC<IPurchaseRequisitionSubmissionProps> = (props: IPurchaseRequisitionSubmissionProps) => {
  const [purchaseRequisitionSubmissios, setPurchaseRequisitionSubmissions] = useState<IPurchaseRequisitionRequest[]>();
  const [filteredPurchaseRequisitionSubmissios, setFilteredPurchaseRequisitionSubmissions] = useState<IPurchaseRequisitionRequest[]>();
  const [selectedSubmissionRequest, setSelectedSubmissionRequest] = useState<IPurchaseRequisitionRequest>();
  const [filteredSubmissionItems, setFilteredSubmissionItems] = useState<IPurchaseRequisitionRequestItem[]>();
  const [searchText, setSearchText] = useState<string>('');
  const searchEngine: SearchEngine<IPurchaseRequisitionRequestItem> = new SearchEngine([], genereateIndex);
  const [startDateFilterCriteria, setStartDateFilterCriteria] = useState<Date>();
  const [endDateFilterCriteria, setEndDateFilterCriteria] = useState<Date>();
  const [sortCriteria, setSortCriteria] = useState<Sort>(Sort.DES);

  useEffect(() => {
    const getSubmissions = async () => {
      const apiResponse = await getPurchaseRequisitionRequest(new Date(), new Date(), Sort.ASC);

      if (apiResponse && apiResponse.status === ApiResponseStatus.SUCCESS) {
        setPurchaseRequisitionSubmissions(apiResponse.data);
        setFilteredPurchaseRequisitionSubmissions(apiResponse.data);
      }
    };

    getSubmissions();
  }, []);

  useEffect(() => {
    console.group(PurchaseRequisitionSubmissionPage.name);
    console.log('Filtering list after filters are set >>: ', {
      startDateFilterCriteria,
      endDateFilterCriteria,
    });
    filterSubmissionRequest();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [startDateFilterCriteria, endDateFilterCriteria]);

  useEffect(() => {
    console.group(PurchaseRequisitionSubmissionPage.name);
    console.log('Sorting list after sort is set >>: ', {
      sortCriteria,
    });
    sortSubmissionRequestByDate(sortCriteria);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sortCriteria]);

  const search = () => {
    if (selectedSubmissionRequest) {
      props.setLoading(true);
      const sanitisedSearchText: string = getSearchText(searchText);
      const filteredData = searchEngine.updateEngine(selectedSubmissionRequest.purchaseRequisitionRequestItems).search(sanitisedSearchText);
      setFilteredSubmissionItems(filteredData);
      setTimeout(function () {
        props.setLoading(false);
      }, 500);
    }
  };

  const filterByDateRange = (startDate?: string, endDate?: string) => {
    const startDateValue = startDate === undefined ? startDate : new Date(new Date(startDate).setHours(0, 0, 0, 0));
    setStartDateFilterCriteria(startDateValue);
    const endDateValue = endDate === undefined ? endDate : new Date(new Date(endDate).setHours(23, 59, 59, 59));
    setEndDateFilterCriteria(endDateValue);
    filterSubmissionRequest();
  };

  const filterSubmissionRequest = () => {
    props.setLoading(true);
    const filteredResult: IPurchaseRequisitionRequest[] = [];
    purchaseRequisitionSubmissios?.forEach((submission) => {
      const submissionCreatedDate = new Date(submission.createdDate);
      if (startDateFilterCriteria !== undefined && submissionCreatedDate < startDateFilterCriteria) {
      } else if (endDateFilterCriteria !== undefined && submissionCreatedDate > endDateFilterCriteria) {
      } else {
        filteredResult.push(submission);
      }
    });
    console.log('Filtered result >>:', filteredResult);
    console.groupEnd();
    setFilteredPurchaseRequisitionSubmissions(filteredResult);
    setTimeout(function () {
      props.setLoading(false);
    }, 500);
  };

  const sortSubmissionRequestByDate = (sort: Sort) => {
    props.setLoading(true);
    const sortedResult = CLONING_LIB.deepClone(filteredPurchaseRequisitionSubmissios)?.sort((submission1, submission2) => {
      if (sort === Sort.ASC) {
        return submission1.createdDate < submission2.createdDate ? -1 : 1;
      } else if (sort === Sort.DES) {
        return submission1.createdDate > submission2.createdDate ? -1 : 1;
      }
      return 0;
    });
    console.log('Sorted result', sortedResult);
    console.groupEnd();
    setFilteredPurchaseRequisitionSubmissions(sortedResult);
    setTimeout(function () {
      props.setLoading(false);
    }, 500);
  };

  const resetSortingAndFilter = () => {
    setFilteredPurchaseRequisitionSubmissions(purchaseRequisitionSubmissios);
    setStartDateFilterCriteria(undefined);
    setEndDateFilterCriteria(undefined);
    filterSubmissionRequest();

    setSortCriteria(Sort.DES);
    sortSubmissionRequestByDate(Sort.DES);
  };

  return (
    <>
      <div className="container-fluid h-100">
        <div>
          <div className="mb-2 w-100">
            <Title className="d-inline-block" level={4}>
              Purchase Requisition Submission Record
            </Title>
            <Button className="d-inline-flex align-items-center float-end back-button" role="link" href="/purchase-requisition-request">
              <span>Purchase Requisition</span>
              <ArrowRightOutlined />
            </Button>
          </div>
          <div className="d-inline-flex flex-row align-items-center" style={{ gap: '15px', width: 'max-content' }}>
            <label>Advance Sorting / Filtering</label>
            <DatePicker.RangePicker
              format="DD/MM/YYYY"
              inputReadOnly
              allowEmpty={[true, true]}
              value={[startDateFilterCriteria === undefined ? null : moment(startDateFilterCriteria), endDateFilterCriteria === undefined ? null : moment(endDateFilterCriteria)]}
              onChange={(dateValues) => filterByDateRange(dateValues != null ? dateValues[0]?.toString() : undefined, dateValues != null ? dateValues[1]?.toString() : undefined)}
            />
            <Select key="sort-submission-request-select" value={sortCriteria} onChange={(value) => setSortCriteria(value)}>
              <Select.Option value={Sort.DES}>Created Date Desc</Select.Option>
              <Select.Option value={Sort.ASC}>Created Date Asc</Select.Option>
            </Select>
            <Button className="d-inline-flex align-items-center" onClick={resetSortingAndFilter}>
              <ReloadOutlined />
              Reset
            </Button>
          </div>
          <div className="mx-2 d-inline-flex border-top mt-4 w-100">
            <div className="my-1 mb-2" style={{ alignContent: 'start' }}>
              <PurchaseRequisitionSubmissionBrowser
                setSelectedSubmissionRecord={setSelectedSubmissionRequest}
                purchaseRequisitionSubmissios={filteredPurchaseRequisitionSubmissios ?? []}
                setFilteredSubmissionsItems={setFilteredSubmissionItems}
                setLoading={props.setLoading}
              />
            </div>
            <div className="m-2 position-relative">
              <span>
                Submission Date: <b color="primary">{selectedSubmissionRequest ? convertToLocalString(selectedSubmissionRequest.createdDate) : ''}</b>
              </span>
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
              <PurchaseRequisitionSubmissionTable currentSubmissionRecord={selectedSubmissionRequest} filteredItems={filteredSubmissionItems} />
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

export default connect(mapStateToProps, mapDispatchToProps)(PurchaseRequisitionSubmissionPage);
