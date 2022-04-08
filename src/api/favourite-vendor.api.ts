import { FAVOURITE_VENDOR } from '@constant/api-endpoints';
import { IFavouriteVendor } from '@dto/i-favourite-vendor.dto';
import axios from 'axios';

export async function getFavouriteVendor() {
  return await axios.get<IFavouriteVendor[]>(FAVOURITE_VENDOR);
}
