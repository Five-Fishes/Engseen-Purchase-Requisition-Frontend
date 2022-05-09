import { useState } from 'react';
import { Input, Button, DatePicker, Select, Form } from 'antd';
import { ReloadOutlined } from '@ant-design/icons';
import moment from 'moment';

import { popNotification } from '@module/shared/components/notification';
import { NotificationType } from '@constant/notification.enum';
import { IPurchaseOrderReceiptSearchCriteria } from '@dto/i-purchase-order-receipt-search-criteria.dto';

interface IPurchaseOrderReceiptSearchFormProps {
  performSearch: (searchCriteria: IPurchaseOrderReceiptSearchCriteria) => void;
}

const PurchaseOrderReceiptSearchForm: React.FC<IPurchaseOrderReceiptSearchFormProps> = (props: IPurchaseOrderReceiptSearchFormProps) => {
  const { performSearch } = props;
  const [searchByField, setSearchByField] = useState<string>('');
  const [startGrnDateCriteria, setStartGrnDateCriteria] = useState<Date>();
  const [endGrnDateCriteria, setEndGrnDateCriteria] = useState<Date>();
  const [form] = Form.useForm();

  const setGrnDateRange = (startDate?: string, endDate?: string) => {
    let startDateValue = startDate === undefined ? startDate : new Date(startDate);
    if (startDateValue) {
      const startDateUTC = Date.UTC(startDateValue.getFullYear(), startDateValue.getMonth(), startDateValue.getDate(), 0, 0, 0);
      startDateValue = new Date(startDateUTC);
    }
    setStartGrnDateCriteria(startDateValue);
    let endDateValue = endDate === undefined ? endDate : new Date(endDate);
    if (endDateValue) {
      const endDateUTC = Date.UTC(endDateValue.getFullYear(), endDateValue.getMonth(), endDateValue.getDate(), 23, 59, 59);
      endDateValue = new Date(endDateUTC);
    }
    setEndGrnDateCriteria(endDateValue);
  };

  const onFinish = async (values: any) => {
    console.log('Success:', values);
    if (searchByField == null || searchByField === '') {
      popNotification('Please select search by value', NotificationType.warning);
      return;
    }
    let searchCriteria: IPurchaseOrderReceiptSearchCriteria;
    if (searchByField === 'grnDate') {
      if (startGrnDateCriteria == null || endGrnDateCriteria == null) {
        popNotification('Please select receipt date range for search', NotificationType.warning);
        return;
      }
      searchCriteria = {
        startGrnDate: startGrnDateCriteria.toISOString(),
        endGrnDate: endGrnDateCriteria.toISOString(),
      };
    } else {
      const searchValue = values.keyword?.trim();
      if (searchValue == null || searchValue === '') {
        popNotification('Please input search keyword', NotificationType.warning);
        return;
      }
      searchCriteria = {
        [searchByField]: searchValue,
      };
    }
    console.log(searchCriteria);
    performSearch(searchCriteria);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  const onReset = () => {
    form.resetFields();
    setSearchByField('');
    setStartGrnDateCriteria(undefined);
    setEndGrnDateCriteria(undefined);
  };

  return (
    <>
      <Form name="basic" layout="inline" form={form} onFinish={onFinish} onFinishFailed={onFinishFailed} autoComplete="off">
        <Form.Item name="searchBy" initialValue={''}>
          <Select key="search-by-select" value={searchByField} onChange={(value) => setSearchByField(value)} style={{ minWidth: '125px' }}>
            <Select.Option disabled value={''}>
              Search By
            </Select.Option>
            <Select.Option value={'grnNo'}>GRN No</Select.Option>
            <Select.Option value={'grnDate'}>Receipt Date</Select.Option>
            <Select.Option value={'vendorID'}>Vendor</Select.Option>
            <Select.Option value={'doNumber'}>DO No</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item name="keyword">
          <Input placeholder="Enter Keyword" allowClear={true} />
        </Form.Item>

        <Form.Item name="grnDateRange">
          <DatePicker.RangePicker
            inputReadOnly
            format="DD/MM/YYYY"
            allowEmpty={[true, true]}
            value={[startGrnDateCriteria === undefined ? null : moment(startGrnDateCriteria), endGrnDateCriteria === undefined ? null : moment(endGrnDateCriteria)]}
            onChange={(dateValues) => setGrnDateRange(dateValues != null ? dateValues[0]?.toString() : undefined, dateValues != null ? dateValues[1]?.toString() : undefined)}
          />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 2, span: 4 }}>
          <Button type="primary" htmlType="submit">
            Search
          </Button>
        </Form.Item>

        <Form.Item>
          <Button htmlType="button" onClick={onReset} className="d-inline-flex align-items-center">
            <ReloadOutlined />
            Reset
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default PurchaseOrderReceiptSearchForm;
