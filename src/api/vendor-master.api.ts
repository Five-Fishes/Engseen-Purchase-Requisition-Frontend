import { VENDOR_MASTER } from "@constant/api-endpoints";
import { IVendorMaster } from "@dto/i-vendor-master.dto";
import { QueryParamsBuilder } from "@utils/api/query-params-builder";
import axios from "axios";

export async function getVendor(vendorId?: string) {
    const url = QueryParamsBuilder.withUrl(VENDOR_MASTER).addParams({ vendorId }).build();
    return await axios.get<IVendorMaster[]>(url);
}