import { ITEM_MASTER } from "@constant/api-endpoints";
import { IItemMaster } from "@dto/i-item-master.dto";
import { QueryParamsBuilder } from "@utils/api/query-params-builder";
import axios from "axios";

export async function getItemBySearch(item?: string) {
    const url = QueryParamsBuilder.withUrl(ITEM_MASTER).addParams({ item }).build();
    return await axios.get<IItemMaster[]>(url);
}