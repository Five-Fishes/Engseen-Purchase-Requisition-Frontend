import { ChangeEvent, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Input, Button, Drawer } from 'antd';
import Title from 'antd/lib/typography/Title';

import CLONING_LIB from '@utils/cloning/cloning-lib-wrapper';
import { ITableColumnDisplaySettings } from '@dto/i-table-columns';
import { getSearchText, SearchEngine } from '@utils/search/native-search';
import { IPurchaseRequisitionTemplate } from '@dto/i-purchase-requisition-template.dto';
import { IPurchaseRequisitionTemplateItem } from '@dto/i-purchase-requisition-template-item.dto';

import PurchaseRequisitionTemplateBrowser from '../components/template-browser/template-browser';
import PurchaseRequisitionRequestConstructor from '../components/request-constructor/request-constructor';
import PurchaseRequisitionRequestTableDisplaySettings from '../components/table-column-display-settings/table-column-display-settings';
import generateIndex from '../components/request-constructor/request-constructor-indexer';
import { setLoading } from '@module/shared/reducers/app-reducers';
import { SettingOutlined } from '@ant-design/icons';
import { IWindowSize, useWindowResized } from '@hook/window-resized.hook';
import { APP_HEADER_HEIGHT } from '@constant/display/header.constant';
import DEFAULT_PURCHASE_REQUISITION_REQUEST_TABLE_DISPLAY_SETTINGS from '@constant/purchase-requisition-request/purchase-requisition-request-table-display-settings';
import { APP_CONTENT_MARGIN } from '@constant/display/content.constant';
import { PURCHASE_REQUISITION_BOTTOM_TOOLS_HEIGHT, PURCHASE_REQUISITION_TITLE_HEIGHT, PURCHASE_REQUISITION_TOP_TOOLS_HEIGHT } from '@constant/display/purchase-requisition-request.constant';

interface IPurchaseRequisitionRequestPageProps extends StateProps, DispatchProps {}

const PurchaseRequisitionRequestPage: React.FC<IPurchaseRequisitionRequestPageProps> = (props: IPurchaseRequisitionRequestPageProps) => {
  const [selectedTemplate, setSelectedTemplate] = useState<IPurchaseRequisitionTemplate>();
  const [tableColumnDisplaySettings, setTableColumnDisplaySettings] = useState<ITableColumnDisplaySettings[]>();
  const [tableColumnDisplaySettingsUpdateTime, setTableColumnDisplaySettingsUpdateTime] = useState<Date>(new Date());
  const [searchResult, setSearchResult] = useState<IPurchaseRequisitionTemplateItem[]>();
  const [showTableDisplaySettings, setShowTableDisplaySettings] = useState<boolean>(false);
  const searchEngine: SearchEngine<IPurchaseRequisitionTemplateItem> = new SearchEngine([], generateIndex);
  const windowSize: IWindowSize = useWindowResized();
  const PURCHASE_REQUISITION_CONSTRUCTOR_WRAPPER_HEIGHT_CONSTRAINT: number =
    APP_HEADER_HEIGHT + APP_CONTENT_MARGIN + PURCHASE_REQUISITION_TITLE_HEIGHT + PURCHASE_REQUISITION_TOP_TOOLS_HEIGHT + PURCHASE_REQUISITION_BOTTOM_TOOLS_HEIGHT;

  useEffect(() => {
    const savedPurchaseRequisitionRequestTableDisplaySettings = localStorage.getItem('purchaseRequisitionRequestTableDisplaySettings');
    if (savedPurchaseRequisitionRequestTableDisplaySettings) {
      const parsedSavedPurchaseRequisitionRequestTableDisplaySettings: ITableColumnDisplaySettings[] = JSON.parse(savedPurchaseRequisitionRequestTableDisplaySettings);
      setTableColumnDisplaySettings(parsedSavedPurchaseRequisitionRequestTableDisplaySettings);
    } else {
      setTableColumnDisplaySettings(DEFAULT_PURCHASE_REQUISITION_REQUEST_TABLE_DISPLAY_SETTINGS);
    }
  }, []);

  /**
   * Update the tableColumnDisplaySettingsUpdateTime to latest date if it is being modified
   */
  useEffect(() => {
    setTableColumnDisplaySettingsUpdateTime(new Date());
  }, [tableColumnDisplaySettings]);

  useEffect(() => {
    if (selectedTemplate) {
      const initSearchResult = CLONING_LIB.deepClone(selectedTemplate.purchaseRequisitionTemplateItemList);
      setSearchResult(initSearchResult);
    }
  }, [selectedTemplate]);

  const updateRemarks: (event: ChangeEvent<HTMLTextAreaElement> | undefined) => void = (event) => {
    if (selectedTemplate && event) {
      const updatedTemplate = CLONING_LIB.deepClone(selectedTemplate);
      updatedTemplate.remarks = event.target.value;
      setSelectedTemplate(updatedTemplate);
    }
  };

  const handleSearch = (value: string, event: React.ChangeEvent<HTMLInputElement> | React.MouseEvent<HTMLElement, MouseEvent> | React.KeyboardEvent<HTMLInputElement> | undefined) => {
    props.setLoading(true);
    console.group('Search [PurchaseRequititionApprovalTable]');
    console.log('value >>: ', value);
    console.log('event >>: ', event);
    if (selectedTemplate) {
      console.log('selectedPurchaseRequisitionApproval >>: ', selectedTemplate);
      const sanitisedSearchText: string = getSearchText(value);
      const searchOutput = searchEngine.updateEngine(selectedTemplate.purchaseRequisitionTemplateItemList).search(sanitisedSearchText);
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

  return (
    <>
      <div className="container-fluid">
        <div className="row" style={{ height: `${PURCHASE_REQUISITION_TITLE_HEIGHT}px` }}>
          <div className="col d-flex flex-column justify-content-center">
            <Title level={4}>Purchase Requisition</Title>
          </div>
        </div>
        <div className="row" style={{ height: `${PURCHASE_REQUISITION_TOP_TOOLS_HEIGHT}px` }}>
          <div className="col-8">
            <PurchaseRequisitionTemplateBrowser setSelectedTemplate={setSelectedTemplate} setLoading={props.setLoading} />
          </div>
          <div className="col-4 d-flex">
            <Input.Search placeholder="Search" onSearch={handleSearch} allowClear></Input.Search>
            <Button onClick={openTableDisplaySettings} style={{ width: '50px' }} icon={<SettingOutlined />}></Button>
          </div>
        </div>

        <div
          className="row"
          style={{
            height: `${windowSize.height - PURCHASE_REQUISITION_CONSTRUCTOR_WRAPPER_HEIGHT_CONSTRAINT}px`,
          }}
        >
          <div className="col">
            <PurchaseRequisitionRequestConstructor
              searchResult={searchResult}
              currentTemplate={selectedTemplate}
              tableColumnDisplaySettings={tableColumnDisplaySettings}
              tableColumnDisplaySettingsUpdateTime={tableColumnDisplaySettingsUpdateTime}
              updateTemplate={setSelectedTemplate}
            />
          </div>
        </div>

        <div className="row" style={{ height: `${PURCHASE_REQUISITION_BOTTOM_TOOLS_HEIGHT}px` }}>
          <div className="col">
            <Input.TextArea className="remarks-textbox" value={selectedTemplate?.remarks} onChange={updateRemarks} rows={3} placeholder="Remarks here"></Input.TextArea>
          </div>
          <div className="col d-flex flex-column align-items-end">
            <Button type="primary" size="large">
              Submit Request
            </Button>
          </div>
        </div>
      </div>

      <Drawer title="Column Settings" placement="right" onClose={openTableDisplaySettings} visible={showTableDisplaySettings}>
        <PurchaseRequisitionRequestTableDisplaySettings tableColumnDisplaySettings={tableColumnDisplaySettings} setTableColumnDisplaySettings={setTableColumnDisplaySettings} />
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

export default connect(mapStateToProps, mapDispatchToProps)(PurchaseRequisitionRequestPage);
