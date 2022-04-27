import { getItemBySearch } from "@api/component.api";
import { ApiResponseStatus } from "@constant/api-status.enum";
import { IPurchaseRequisitionTemplateItem } from "@dto/i-purchase-requisition-template-item.dto";
import DebounceSelect from '@module/shared/components/debounce-select/debounce-select';
import { AxiosResponse } from "axios";
import { ReactNode, useEffect, useState } from "react";

interface IComponentCodeSelectorProps {
    selectedVendor: string | undefined,
    selectedComponentCode: string,
    setSelectedComponentCode: (vendorId: string) => void;
}

const ComponentCodeSelector: React.FC<IComponentCodeSelectorProps> = (props) => {

    const { selectedVendor, selectedComponentCode, setSelectedComponentCode } = props;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [components, setComponents] = useState<IPurchaseRequisitionTemplateItem[]>([]);

    useEffect(() => {
        setComponents([]); // Clear components
        setSelectedComponentCode('') // CLear Selected Component
        getVendorsWrapper();
        // eslint-disable-next-line
    }, [selectedVendor])

    const getVendorsWrapper = async (componentInput?: string) => {
        const res: AxiosResponse<IPurchaseRequisitionTemplateItem[]> = await getItemBySearch(componentInput, selectedVendor);
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

                return uniqueComponents.map(component => ({ label: component.componentName, value: component.id }))
            }
        }
        return [];
    }

    return (
        <>
            <DebounceSelect
                key="component-key"
                value={selectedComponentCode.length === 0 ? undefined : {value: selectedComponentCode}}
                showSearch
                placeholder="Select Component"
                fetchOptions={getVendorsWrapper}
                onChange={(e: { label: ReactNode; value: string }) => {
                    console.log(e.value);
                    setSelectedComponentCode(e.value);
                }}
                style={{ width: '100%' }}
                debounceTimeout={1000}
            ></DebounceSelect>
        </>
    );
}


export default ComponentCodeSelector;