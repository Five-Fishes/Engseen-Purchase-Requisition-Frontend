import { useState } from 'react';

import moment from 'moment';
import { Button, DatePicker, InputNumber } from 'antd';

import { getItemBySearch } from '@api/component.api';
import { ApiResponseStatus } from '@constant/api-status.enum';
import { IPurchaseRequisitionApprovalItem, mapTemplateItemToApprovalItem } from '@dto/i-purchase-requisition-approval-item.dto';
import { IPurchaseRequisitionTemplateItem } from '@dto/i-purchase-requisition-template-item.dto';
import DebounceSelect from '@module/shared/components/debounce-select/debounce-select';

interface IComponentSelectorProps {
  onAddComponent: (componentToAdd?: IPurchaseRequisitionApprovalItem) => void;
}

const ComponentSelector: React.FC<IComponentSelectorProps> = (props) => {
  const getItemsWrapper = async () => {
    const res = await getItemBySearch();

    if (res && res.status === ApiResponseStatus.SUCCESS) {
      setComponents(res.data);
      return res.data.map((component) => {
        return {
          label: `${component.componentName} - ${component.vendorName} [${component.packagingSize}]`,
          value: component.id,
        };
      });
    } else {
      return [];
    }
  };

  const [components, setComponents] = useState<IPurchaseRequisitionTemplateItem[]>([]);
  const [componentToAdd, setComponentToAdd] = useState<IPurchaseRequisitionApprovalItem>();
  const [noOfPacks, setNoOfPacks] = useState<number>();
  const [deliveryDate, setDeliveryDate] = useState<Date>();

  const onDeliveryDateChanged = (value: moment.Moment | null, dateString: string) => {
    setDeliveryDate(value?.toDate());
  };

  const onNoOfPacksChanged = (value: number) => {
    setNoOfPacks(value);
  }

  return (
    <>
      <div className="row">
        <div className="row col-10">
          <div className="col">
            <DebounceSelect
              showSearch
              value={componentToAdd && { value: `${componentToAdd.componentName} - ${componentToAdd.vendorName} [${componentToAdd.packagingSize}]` }}
              placeholder="Select Components"
              fetchOptions={getItemsWrapper}
              onChange={(e) => {
                const selectedComponent = components.find((component) => component.id === e.value);
                let approvalItem: IPurchaseRequisitionApprovalItem | undefined;
                if (selectedComponent) {
                  approvalItem = mapTemplateItemToApprovalItem(selectedComponent);
                  approvalItem.noOfPacks = noOfPacks || 0;
                  approvalItem.deliveryDate = deliveryDate || new Date();
                }
                setComponentToAdd(approvalItem);
              }}
              style={{ width: '100%' }}
              debounceTimeout={1000}
            />
          </div>
          <div className="w-100 my-1"></div>
          <div className="col">
            <InputNumber type="number" value={noOfPacks} min={0} onChange={onNoOfPacksChanged} className="w-100" placeholder="No of Pack to Order" />
          </div>
          <div className="col">
            <DatePicker inputReadOnly value={deliveryDate && moment(deliveryDate)} onChange={onDeliveryDateChanged} className="w-100"></DatePicker>
          </div>
        </div>
        <div className="col-2">
          <Button
            type="primary"
            onClick={() => {
              props.onAddComponent(componentToAdd);
            }}
          >
            Add Component
          </Button>
        </div>
      </div>
    </>
  );
};

export default ComponentSelector;
