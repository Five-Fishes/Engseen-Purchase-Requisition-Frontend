import { getVendor } from "@api/vendor-master.api";
import { ApiResponseStatus } from "@constant/api-status.enum";
import { IVendorMaster } from "@dto/i-vendor-master.dto";
import DebounceSelect from "@module/shared/components/debounce-select/debounce-select";
import { AxiosResponse } from "axios";
import { ReactNode, useState } from "react";

interface IVendorDebounceSelectProps {
    selectedVendor: string | undefined,
    setSelectedVendor: (vendorId: string) => void;
}

const VendorDebounceSelect: React.FC<IVendorDebounceSelectProps> = (props) => {

    const { selectedVendor, setSelectedVendor } = props;
    const [vendors, setVendors] = useState<IVendorMaster[]>([]);

    const getVendorsWrapper = async (vendorInput: string) => {
        const res: AxiosResponse<IVendorMaster[]> = await getVendor(vendorInput || '');
        if (res) {
            if (res.status === ApiResponseStatus.SUCCESS) {
                setVendors(res.data);
                return res.data.map(vendorMaster => ({ label: <>{vendorMaster.vendorID}</>, value: vendorMaster.vendorID }))
            }
        }
        return [];
    }

    return <>
        <DebounceSelect
            key="component-input"
            showSearch
            value={selectedVendor && { value: selectedVendor }}
            placeholder="Select Vendor"
            fetchOptions={getVendorsWrapper}
            onChange={(e: {label: ReactNode, value: string}) => {
                const selectedComponent = vendors.find(vendor => vendor.vendorID === e.value);
                setSelectedVendor(selectedComponent?.vendorID || '');
            }}
            style={{ width: '100%' }}
            debounceTimeout={1000}
        /></>
}


export default VendorDebounceSelect;