import { InputNumber } from 'antd'
import { InputNumberProps } from 'antd/lib/input-number'

import { PurchaseRequisitionApprovalStatus } from '@constant/purchase-requisition-approval-status.enum'

import { IStatefulComponentProps } from '../i-stateful-component-props'

interface IStatefulNumberInputProps extends IStatefulComponentProps, InputNumberProps {}
const StatefulNumberInput: React.FC<IStatefulNumberInputProps> = (props) => {
  if (props.state === PurchaseRequisitionApprovalStatus.TO_CONFIRM) {
    return <InputNumber {...props} />
  }
  return <>{props.value}</>
}

export default StatefulNumberInput
