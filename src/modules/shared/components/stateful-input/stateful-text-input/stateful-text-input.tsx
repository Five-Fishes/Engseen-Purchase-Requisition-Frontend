import Input, { InputProps } from 'antd/lib/input/Input';

import { PurchaseRequisitionApprovalStatus } from '@constant/purchase-requisition-approval-status.enum';

import { IStatefulComponentProps } from '../i-stateful-component-props';

interface IStatefulTextInputProps extends IStatefulComponentProps, InputProps {}

const StatefulTextInput: React.FC<IStatefulTextInputProps> = (props) => {
  if (props.state === PurchaseRequisitionApprovalStatus.TO_CONFIRM) {
    return <Input {...props}></Input>;
  }
  return <>{props.value}</>;
};

export default StatefulTextInput;
