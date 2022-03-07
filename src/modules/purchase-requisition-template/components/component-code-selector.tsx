import { getItemBySearch } from "@api/component.api";
import { ApiResponseStatus } from "@constant/api-status.enum";
import { IPurchaseRequisitionTemplateItem } from "@dto/i-purchase-requisition-template-item.dto";
import { Select } from "antd";
import { AxiosResponse } from "axios";
import { useEffect, useState } from "react";

interface IComponentCodeSelectorProps {
    selectedVendor: string | undefined,
    selectedComponentCode: string,
    setSelectedComponentCode: (vendorId: string) => void;
}

const ComponentCodeSelector: React.FC<IComponentCodeSelectorProps> = (props) => {

    const { selectedVendor, selectedComponentCode, setSelectedComponentCode } = props;
    const [components, setComponents] = useState<IPurchaseRequisitionTemplateItem[]>([]);

    useEffect(() => {
        setComponents([]); // Clear components
        setSelectedComponentCode('') // CLear Selected Component
        getVendorsWrapper();
        // eslint-disable-next-line
    }, [selectedVendor])

    const getVendorsWrapper = async () => {
        const res: AxiosResponse<IPurchaseRequisitionTemplateItem[]> = await getItemBySearch(null, selectedVendor);
        if (res) {
            if (res.status === ApiResponseStatus.SUCCESS) {
                const uniqueComponentCode = new Set();
                const uniqueComponents: IPurchaseRequisitionTemplateItem[] = res.data.map(component => {

                    if (uniqueComponentCode.has(component.componentCode)) {
                        component.id = -1 // mark as -1 to be eliminated
                        return component;
                    } else {
                        uniqueComponentCode.add(component.componentCode)
                        return component
                    }


                }).filter(component => component.id > 0);

                setComponents(uniqueComponents);

                return uniqueComponents.map(component => ({ label: component.componentCode, value: component.id }))
            }
        }
        return [];
    }

    return <><Select value={selectedComponentCode.trim().length === 0 ? undefined : selectedComponentCode } onChange={setSelectedComponentCode} style={{ width: '100%' }} placeholder="Please Select Component Code">
        {components && components.map(component => {
            return <Select.Option key={component.id} value={component.componentCode}>{component.componentCode}</Select.Option>
        })}
    </Select></>
}


export default ComponentCodeSelector;