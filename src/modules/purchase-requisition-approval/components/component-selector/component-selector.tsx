import { Button, DatePicker, InputNumber, Select } from 'antd'

const DUMMY_COMPONENT = ['abc', 'abcd', 'def', 'ghi']

const ComponentSelector: React.FC = () => {
  return (
    <>
      <div className="row">
        <div className="col-8">
          <div className="col w-100">
            <Select style={{ width: '100%' }} placeholder="Please select a component">
              {DUMMY_COMPONENT &&
                DUMMY_COMPONENT.map((component, index) => (
                  <Select.Option key={index} value={component}>
                    {component}
                  </Select.Option>
                ))}
            </Select>
          </div>
          <div className="row mt-1">
            <div className="col">
              <InputNumber className="w-100" placeholder="No of Pack to Order"></InputNumber>
            </div>
            <div className="col">
              <DatePicker className="w-100"></DatePicker>
            </div>
          </div>
        </div>
        <div className="col-4">
          <Button type="primary">Add Component</Button>
        </div>
      </div>
    </>
  )
}

export default ComponentSelector
