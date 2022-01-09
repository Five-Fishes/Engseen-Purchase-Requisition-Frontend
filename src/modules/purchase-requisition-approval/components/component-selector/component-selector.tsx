import { Button, DatePicker, InputNumber, Select } from 'antd';

const DUMMY_COMPONENT = ['abc', 'abcd', 'def', 'ghi'];

const ComponentSelector: React.FC = () => {
  return (
    <>
      <div className="row">
        <div className="row col-10">
          <div className="col">
            <Select style={{ width: '100%' }} placeholder="Please select a component">
              {DUMMY_COMPONENT &&
                DUMMY_COMPONENT.map((component, index) => (
                  <Select.Option key={index} value={component}>
                    {component}
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
