import { ChangeEvent, useEffect, useState } from 'react';
import { Input, Divider, Button } from 'antd';
import Title from 'antd/lib/typography/Title';

import { IPurchaseRequisitionTemplate } from '@dto/i-purchase-requisition-template.dto';

import PurchaseRequisitionTemplateBrowser from '../components/template-browser/template-browser';
import PurchaseRequisitionRequestConstructor from '../components/request-constructor/request-constructor';
import PurchaseRequisitionColumnFilter from '../components/column-filter/column-filter';
import { getSearchText, SearchEngine } from '@utils/search/native-search';
import { IPurchaseRequisitionTemplateItem } from '@dto/i-purchase-requisition-template-item.dto';
import generateIndex from '../components/request-constructor/request-constructor-indexer';
import CLONING_LIB from '@utils/cloning/cloning-lib-wrapper';

const PurchaseRequisitionRequestPage: React.FC = () => {
  const [selectedTemplate, setSelectedTemplate] = useState<IPurchaseRequisitionTemplate>();
  const [columnFilter, setColumnFilter] = useState<Map<string, boolean>>(new Map());
  const [searchResult, setSearchResult] = useState<IPurchaseRequisitionTemplateItem[]>();
  const searchEngine: SearchEngine<IPurchaseRequisitionTemplateItem> = new SearchEngine([], generateIndex);

  useEffect(() => {
    if (selectedTemplate) {
      const initSearchResult = CLONING_LIB.deepClone(selectedTemplate.templateItems);
      setSearchResult(initSearchResult);
    }
  }, [selectedTemplate]);

  const updateRemarks: (event: ChangeEvent<HTMLTextAreaElement> | undefined) => void = (event) => {
    if(selectedTemplate && event) {
      const updatedTemplate = CLONING_LIB.deepClone(selectedTemplate)
      updatedTemplate.remarks = event.target.value
      setSelectedTemplate(updatedTemplate);
    }
  }
  
  const handleSearch = (value: string, event: React.ChangeEvent<HTMLInputElement> | React.MouseEvent<HTMLElement, MouseEvent> | React.KeyboardEvent<HTMLInputElement> | undefined) => {
    console.group('Search [PurchaseRequititionApprovalTable]');
    console.log('value >>: ', value);
    console.log('event >>: ', event);
    if (selectedTemplate) {
      console.log('selectedPurchaseRequisitionApproval >>: ', selectedTemplate);
      const sanitisedSearchText: string = getSearchText(value);
      const searchOutput = searchEngine.updateEngine(selectedTemplate.templateItems).search(sanitisedSearchText);
      setSearchResult(searchOutput);
    }
    console.groupEnd();
  };

  return (
    <>
      <div className=" d-flex flex-row">
        <div className="container-fluid h-100 pb-2 mb-remark-fixed">
          <div className="row">
            <div className="col d-flex flex-column justify-content-center">
              <Title level={4}>Purchase Requisition</Title>
            </div>
            <div className="col-7">
              <PurchaseRequisitionTemplateBrowser setSelectedTemplate={setSelectedTemplate} />
            </div>
            <div className="col d-flex flex-column justify-content-center">
              <Input.Search
                placeholder="Search"
                onSearch={handleSearch}
                allowClear
              ></Input.Search>
            </div>
          </div>
          <div className="row">
            <div className="col">
              <PurchaseRequisitionRequestConstructor searchResult={searchResult} currentTemplate={selectedTemplate} columnFilter={columnFilter} updateTemplate={setSelectedTemplate} />
            </div>
          </div>

          <Divider />

          <div className="row fixed-bottom mx-3 pb-1 remark-wrapper bg-white">
            <div className="col my-auto">
              <Button type="primary" size="large">
                Submit Request
              </Button>
            </div>
            <div className="col row ml-auto  remark-box">
              <span className="w-25">Remarks</span>
              <Input.TextArea className="col h-100" value={selectedTemplate?.remarks} onChange={updateRemarks} rows={3} placeholder="Remarks here"></Input.TextArea>
            </div>
          </div>
        </div>

        <Divider type="vertical" style={{ height: '100vh' }} />

        <div className="mx-2">
          <PurchaseRequisitionColumnFilter setColumnFilter={setColumnFilter} />
        </div>
      </div>
    </>
  );
};

export default PurchaseRequisitionRequestPage;
