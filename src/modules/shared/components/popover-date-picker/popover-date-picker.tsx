import { Button, DatePicker, Popover } from "antd";

interface IPopOverDatePickerProps {
  icon?: React.ReactNode;
}

const PopOverDatePicker: React.FC<IPopOverDatePickerProps> = (props) => {
  return (
    <Popover content={<DatePicker />} trigger="click">
      <Button icon={props.icon} />
    </Popover>
  );
};

export default PopOverDatePicker;
