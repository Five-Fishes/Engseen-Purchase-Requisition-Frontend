import { getFavouriteVendor } from '@api/favourite-vendor.api';
import { ApiResponseStatus } from '@constant/api-status.enum';
import { NotificationType } from '@constant/notification.enum';
import { IFavouriteVendor } from '@dto/i-favourite-vendor.dto';
import { popNotification } from '@module/shared/components/notification';
import { generateErrorMessage } from '@utils/api/api-error-handler';
import { Button, Drawer } from 'antd';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';

interface IFavouriteVendorDrawerProps {
  visible: boolean;
  setVisible: Dispatch<SetStateAction<boolean>>;
  setSelectedFavouriteVendorID: Dispatch<SetStateAction<string | undefined>>;
}
const FavouriteVendorDrawer: React.FC<IFavouriteVendorDrawerProps> = (props) => {
  const { visible, setVisible, setSelectedFavouriteVendorID } = props;
  const closeDrawer = () => {
    setVisible(false);
  };
  const onSelectVendor = (favouriteVendor: IFavouriteVendor) => {
    setSelectedFavouriteVendorID(favouriteVendor.vendorId);
    setVisible(false); /** Auto close drawer */
  };

  const [favouriteVendorList, setFavouriteVendorList] = useState<IFavouriteVendor[]>([]);

  useEffect(() => {
    /**
     * Only refetch when drawer opens
     */
    if (visible) {
      (async () => {
        try {
          const getFavouriteVendorRes = await getFavouriteVendor();
          if (getFavouriteVendorRes.status === ApiResponseStatus.SUCCESS) {
            setFavouriteVendorList(getFavouriteVendorRes.data);
          } else {
            popNotification(generateErrorMessage(getFavouriteVendorRes.status), NotificationType.error);
          }
        } catch (error) {
          popNotification(`${error}`, NotificationType.error);
        }
      })();
    }
  }, [visible]);

  return (
    <>
      <Drawer placement="right" visible={visible} title="Favourite Vendor" onClose={closeDrawer} width={400}>
        {favouriteVendorList.map((favouriteVendor) => {
          return (
            <Button className="w-100 m-1" onClick={() => onSelectVendor(favouriteVendor)}>
              {favouriteVendor.vendorId}
            </Button>
          );
        })}
      </Drawer>
    </>
  );
};
export default FavouriteVendorDrawer;
