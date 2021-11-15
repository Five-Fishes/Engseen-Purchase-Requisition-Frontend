import { useState } from "react";
import { Input, Button, Select } from "antd";
import Title from "antd/lib/typography/Title";
import { IPurchaseRequisitionRequest } from "@dto/i-purchase-requisition-request.dto";
import { ArrowRightOutlined, ReloadOutlined } from "@ant-design/icons";
import PurchaseRequisitionSubmissionTable from "../components/submission-table";
import PurchaseRequisitionSubmissionBrowser from "../components/submission-record-browser";
import { SearchEngine } from "@utils/search/native-search";
import { genereateIndex } from "../components/submission-indexer";
import { IPurchaseRequisitionRequestItem } from "@dto/i-purchase-requisition-request-item.dto";
import { convertToLocalString } from "@utils/date-time/date-time-format";
import { Sort } from "@constant/sort.enum";

const PurchaseRequisitionSubmissionPage: React.FC = () => {
  const [selectedSubmissionRequest, setSelectedSubmissionRequest] = useState<IPurchaseRequisitionRequest>({} as IPurchaseRequisitionRequest);
  const [filteredSubmissionItems, setFilteredSubmissionItems] = useState<IPurchaseRequisitionRequestItem[]>();
  const [searchText, setSearchText] = useState<string>("");
  const searchEngine: SearchEngine<IPurchaseRequisitionRequestItem> = new SearchEngine([], genereateIndex);

  const search = () => {
    const filteredData = searchEngine.updateEngine(selectedSubmissionRequest.purchaseRequisitionRequestItems).search(searchText);
    setFilteredSubmissionItems(filteredData);
  };

  return (
    <>
      <div className="container-fluid h-100">
        <div>
          <div>
            <Title className="d-inline-block" level={4}>Purchase Requisition Submission Record</Title>
            <Button className="d-inline-flex align-items-center float-end back-button">
              <span>Purchase Requisition</span>
              <ArrowRightOutlined />
            </Button>
          </div>
          <div className="d-inline-flex flex-row align-items-center">
            <label>Advance Sorting/Filtering</label>
            <Input type="date" />
            <Input type="date" />
            <Select defaultValue={Sort.DES}>
              <Select.Option value={Sort.DES}>
                Created Date Desc
              </Select.Option>
              <Select.Option value={Sort.ASC}>
                Created Date Asc
              </Select.Option>
            </Select>
            <Button className="d-inline-flex align-items-center">
              <ReloadOutlined />
              Reset
            </Button>
          </div>
          <div className="mx-2 d-inline-flex border-top mt-4">
            <div>
              <PurchaseRequisitionSubmissionBrowser setSelectedSubmissionRecord={setSelectedSubmissionRequest} />
            </div>
            <div className="my-2 mx-4 position-relative">
              <span hidden={selectedSubmissionRequest === undefined}>
                Submission Date: <b color="primary">{convertToLocalString(selectedSubmissionRequest?.createdDate)}</b>
              </span>
              <div className="d-flex flex-column justify-content-center">
                <Input.Search
                  allowClear
                  placeholder="Search"
                  bordered={false}
                  value={searchText}
                  onChange={(e: any) => setSearchText(e.target.value)}
                  onSearch={search}
                  style={{ width: "40%", borderBottom: "1px solid #d9d9d9", position: "absolute", right: "5px" }}
                />
              </div>
              <PurchaseRequisitionSubmissionTable
              currentSubmissionRecord={selectedSubmissionRequest}
              filteredItems={filteredSubmissionItems} />
            </div>
            
          </div>
        </div>
      </div>
    </>
  );
};

export default PurchaseRequisitionSubmissionPage;
