import { Dispatch, SetStateAction } from 'react';

interface IOutstandingPurchaseOrderTableColumnSettingProps {
  visible: boolean;
  setVisible: Dispatch<SetStateAction<boolean>>;
  outstandingPurchaseOrderTableColumnSetting: any;
  setOutstandingPurchaseOrderTableColumnSetting: Dispatch<SetStateAction<[]>>;
}
const OutstandingPurchaseOrderTableColumnSetting: React.FC<IOutstandingPurchaseOrderTableColumnSettingProps> = () => {
  return <></>;
};

export default OutstandingPurchaseOrderTableColumnSetting;
