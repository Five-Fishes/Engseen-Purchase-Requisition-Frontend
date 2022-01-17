import { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Input, Button, Select, DatePicker, Divider } from 'antd';
import Title from 'antd/lib/typography/Title';
import { ArrowRightOutlined, ReloadOutlined } from '@ant-design/icons';
import moment from 'moment';

import { IPurchaseRequisitionRequest } from '@dto/i-purchase-requisition-request.dto';
import PurchaseRequisitionSubmissionTable from '../components/submission-table';
import PurchaseRequisitionSubmissionBrowser from '../components/submission-record-browser/submission-record-browser';
import { getSearchText, SearchEngine } from '@utils/search/native-search';
import { genereateIndex } from '../components/submission-indexer';
import { IPurchaseRequisitionRequestItem } from '@dto/i-purchase-requisition-request-item.dto';
import { convertToLocalString } from '@utils/date-time/date-time-format';
import { Sort } from '@constant/sort.enum';
import { getPurchaseRequisitionRequest } from '@api/purchase-requisition-request.api';
import { ApiResponseStatus } from '@constant/api-status.enum';
import CLONING_LIB from '@utils/cloning/cloning-lib-wrapper';
import { setLoading } from '@module/shared/reducers/app-reducers';
import { IWindowSize, useWindowResized } from '@hook/window-resized.hook';
import { APP_HEADER_HEIGHT } from '@constant/display/header.constant';
import { APP_CONTENT_MARGIN } from '@constant/display/content.constant';
import { PURCHASE_REQUISITION_SUBMISSION_TOP_TOOLS_HEIGHT } from '@constant/display/purcahse-requisition-submission.constant';

interface IPurchaseRequisitionSubmissionProps extends StateProps, DispatchProps {}

const PurchaseRequisitionSubmissionPage: React.FC<IPurchaseRequisitionSubmissionProps> = (props: IPurchaseRequisitionSubmissionProps) => {
  const [purchaseRequisitionSubmissios, setPurchaseRequisitionSubmissions] = useState<IPurchaseRequisitionRequest[]>();
  const [filteredPurchaseRequisitionSubmissios, setFilteredPurchaseRequisitionSubmissions] = useState<IPurchaseRequisitionRequest[]>();
  const [selectedSubmissionRequest, setSelectedSubmissionRequest] = useState<IPurchaseRequisitionRequest>();
  const [filteredSubmissionItems, setFilteredSubmissionItems] = useState<IPurchaseRequisitionRequestItem[]>();
  const searchEngine: SearchEngine<IPurchaseRequisitionRequestItem> = new SearchEngine([], genereateIndex);
  const [startDateFilterCriteria, setStartDateFilterCriteria] = useState<Date>();
  const [endDateFilterCriteria, setEndDateFilterCriteria] = useState<Date>();
  const [sortCriteria, setSortCriteria] = useState<Sort>(Sort.DES);
  const windowSize: IWindowSize = useWindowResized();
  const PURCHASE_REQUISITION_SUBMISSION_TABLE_WRAPPER_HEIGHT_CONSTRAINT: number = APP_HEADER_HEIGHT + APP_CONTENT_MARGIN + PURCHASE_REQUISITION_SUBMISSION_TOP_TOOLS_HEIGHT;

  useEffect(() => {
    const getSubmissions = async () => {
      const apiResponse = await getPurchaseRequisitionRequest(new Date('2021-12-17T03:24:00'), new Date(), Sort.DES);

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

  const search = (value: string, event: React.ChangeEvent<HTMLInputElement> | React.MouseEvent<HTMLElement, MouseEvent> | React.KeyboardEvent<HTMLInputElement> | undefined) => {
    if (selectedSubmissionRequest) {
      props.setLoading(true);
      console.group('Search [PurchaseRequisitionSubmissionPage]');
      console.log('value >>: ', value);
      console.log('event >>: ', event);
      const sanitisedSearchText: string = getSearchText(value);
      const filteredData = searchEngine.updateEngine(selectedSubmissionRequest.purchaseRequisitionRequestItems).search(sanitisedSearchText);
      setFilteredSubmissionItems(filteredData);
      console.groupEnd();
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
      <div className="container-fluid">
        <div className="row">
          <div className="col-8">
            <Title level={4}>Purchase Requisition Submission Record</Title>
          </div>
          <div className="col-4 d-flex flex-column align-items-end">
            <Button role="link" href="/purchase-requisition-request">
              <span>Purchase Requisition</span>
              <ArrowRightOutlined style={{ transform: 'translateY(-3px)' }} />
            </Button>
          </div>
        </div>

        <div className="row">
          <div className="col">
            <label className="mx-1" style={{ fontSize: '13px' }}>
              Advance Sorting / Filtering
            </label>
            <DatePicker.RangePicker
              className="mx-1"
              format="DD/MM/YYYY"
              inputReadOnly
              allowEmpty={[true, true]}
              value={[startDateFilterCriteria === undefined ? null : moment(startDateFilterCriteria), endDateFilterCriteria === undefined ? null : moment(endDateFilterCriteria)]}
              onChange={(dateValues) => filterByDateRange(dateValues != null ? dateValues[0]?.toString() : undefined, dateValues != null ? dateValues[1]?.toString() : undefined)}
            />
            <Select key="sort-submission-request-select" className="mx-1" value={sortCriteria} onChange={(value) => setSortCriteria(value)}>
              <Select.Option value={Sort.DES}>Created Date Desc</Select.Option>
              <Select.Option value={Sort.ASC}>Created Date Asc</Select.Option>
            </Select>
            <Button className="mx-1" onClick={resetSortingAndFilter}>
              <ReloadOutlined style={{ transform: 'translateY(-3px)' }} />
              Reset
            </Button>
          </div>
        </div>

        <div className="row">
          <div className="col">
            <Divider />
          </div>
        </div>

        <div className="row" style={{ height: `${windowSize.height - PURCHASE_REQUISITION_SUBMISSION_TABLE_WRAPPER_HEIGHT_CONSTRAINT}px` }}>
          <div className="col-3">
            <PurchaseRequisitionSubmissionBrowser
              setSelectedSubmissionRecord={setSelectedSubmissionRequest}
              purchaseRequisitionSubmissios={filteredPurchaseRequisitionSubmissios ?? []}
              setFilteredSubmissionsItems={setFilteredSubmissionItems}
              setLoading={props.setLoading}
            />
            <Input.TextArea className="my-2" readOnly value={selectedSubmissionRequest?.remarks || ''} placeholder="Remarks" />
          </div>
          <div className="col-9">
            <div className="d-flex justify-content-between">
              <span className="my-1">
                Submission Date: <b color="primary">{selectedSubmissionRequest ? convertToLocalString(selectedSubmissionRequest.createdDate) : ''}</b>
              </span>
              <Input.Search style={{ width: '200px' }} allowClear placeholder="Search" onSearch={search} />
            </div>
            <PurchaseRequisitionSubmissionTable currentSubmissionRecord={selectedSubmissionRequest} filteredItems={filteredSubmissionItems} />
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
