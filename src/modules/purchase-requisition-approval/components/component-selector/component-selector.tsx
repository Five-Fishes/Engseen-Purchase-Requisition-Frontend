import { getItemBySearch } from '@api/component.api';
import { ApiResponseStatus } from '@constant/api-status.enum';
import { Button, DatePicker, InputNumber, Select } from 'antd';
import { useEffect, useState } from 'react';

const ComponentSelector: React.FC = () => {

  const [components, setComponents] = useState<any[]>();

  useEffect(() => {
    const getItemsWrapper = async () => {
      const res = await getItemBySearch();

      if (res && res.status === ApiResponseStatus.SUCCESS) {
        setComponents(res.data);
      }
    }

    getItemsWrapper();

  }, [])

  return (
    <>
      <div className="row">
        <div className="row col-10">
          <div className="col">
            <Select style={{ width: '100%' }} placeholder="Please select a component">
              {components &&
                components.map((component, index) => (
                  <Select.Option key={index} value={component.componentCode}>
                    <div>{component.componentCode} - {component.vendorName}</div>
                  </Select.Option>
                ))}
            </Select>
          </div>
          <div className="w-100 my-1"></div>
          <div className="col">
            <InputNumber type="number" className="w-100" placeholder="No of Pack to Order" />
          </div>
          <div className="col">
            <DatePicker inputReadOnly className="w-100"></DatePicker>
          </div>
        </div>
        <div className="col-2">
          <Button type="primary">Add Component</Button>
        </div>
      </div>
    </>
  );
};

export default ComponentSelector;
