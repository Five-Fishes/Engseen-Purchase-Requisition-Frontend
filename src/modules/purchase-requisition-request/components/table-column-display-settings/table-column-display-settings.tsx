import { useEffect } from 'react';
import List from 'antd/lib/list';
import { DownOutlined, UpOutlined } from '@ant-design/icons';
import Checkbox, { CheckboxChangeEvent } from 'antd/lib/checkbox/Checkbox';

import CLONING_LIB from '@utils/cloning/cloning-lib-wrapper';
import { ITableColumnDisplaySettings } from '@dto/i-table-columns';
import DEFAULT_PURCHASE_REQUISITION_REQUEST_TABLE_DISPLAY_SETTINGS from '@constant/purchase-requisition-request/purchase-requisition-request-table-display-settings';

interface IPurchaseRequisitionColumnFilterProps {
  tableColumnDisplaySettings?: ITableColumnDisplaySettings[];
  setTableColumnDisplaySettings: (columnFilters: ITableColumnDisplaySettings[]) => void;
}

const PurchaseRequisitionRequestTableDisplaySettings: React.FC<IPurchaseRequisitionColumnFilterProps> = (props) => {
  const setTableColumnDisplaySettings = props.setTableColumnDisplaySettings;
  const tableColumnDisplaySettings = props.tableColumnDisplaySettings;

  useEffect(() => {
    const savedPurchaseRequisitionRequestTableDisplaySettings = localStorage.getItem('purchaseRequisitionRequestTableDisplaySettings');

    if (savedPurchaseRequisitionRequestTableDisplaySettings) {
      const parsedSavedPurchaseRequisitionRequestTableDisplaySettings: ITableColumnDisplaySettings[] = JSON.parse(savedPurchaseRequisitionRequestTableDisplaySettings);
      setTableColumnDisplaySettings(parsedSavedPurchaseRequisitionRequestTableDisplaySettings);
    } else {
      setTableColumnDisplaySettings(DEFAULT_PURCHASE_REQUISITION_REQUEST_TABLE_DISPLAY_SETTINGS);
    }

    /**
     * Only save it in non local environment
     */
    if (process.env.NODE_ENV !== 'development') {
      localStorage.setItem('purchaseRequisitionRequestTableDisplaySettings', JSON.stringify(DEFAULT_PURCHASE_REQUISITION_REQUEST_TABLE_DISPLAY_SETTINGS));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const updateVisibility = (e: CheckboxChangeEvent, item: ITableColumnDisplaySettings) => {
    if (tableColumnDisplaySettings) {
      const updatedTableColumnDisplaySettings = CLONING_LIB.deepClone(tableColumnDisplaySettings).map((setting) => {
        if (setting.columnKey === item.columnKey) {
          setting.visible = e.target.checked;
        }
        return setting;
      });
      setTableColumnDisplaySettings(updatedTableColumnDisplaySettings);
    }
  };

  const moveColumn = (item: ITableColumnDisplaySettings, moveIndex: number) => {
    if (tableColumnDisplaySettings) {
      /**
       * - Find index of item
       * - Check validity of moving range
       * - Move
       */
      const currentIndex = tableColumnDisplaySettings.findIndex((setting) => setting.columnKey === item.columnKey);
      const indexInBound = currentIndex + moveIndex >= 0 && currentIndex + moveIndex <= tableColumnDisplaySettings.length - 1;

      if (indexInBound) {
        let updatedTableColumnDisplaySettings = CLONING_LIB.deepClone(tableColumnDisplaySettings);

        /**
         * - Backup destination item
         * - Replace destination item with current item
         * - Replace current item with backed destination item
         */
        const destinationItem = updatedTableColumnDisplaySettings[currentIndex + moveIndex];
        updatedTableColumnDisplaySettings[currentIndex + moveIndex] = item;
        updatedTableColumnDisplaySettings[currentIndex] = destinationItem;
        setTableColumnDisplaySettings([...updatedTableColumnDisplaySettings]);
      }
    }
  };

  return (
    <List
      dataSource={tableColumnDisplaySettings}
      itemLayout="vertical"
      style={{ width: 200 }}
      renderItem={(item, index) => {
        return (
          <List.Item key={item.columnKey}>
            <div className="d-flex justify-content-between">
              <Checkbox className="align-self-center" checked={item.visible} onChange={(e) => updateVisibility(e, item)} disabled={!item.visibilityEditable} />
              <span className="align-self-center">{item.settingDisplayName}</span>
              <div className="d-flex flex-column align-self-center mx-3">
                <UpOutlined onClick={() => moveColumn(item, -1)} />
                <DownOutlined onClick={() => moveColumn(item, 1)} />
              </div>
            </div>
          </List.Item>
        );
      }}
    />
  );
};

export default PurchaseRequisitionRequestTableDisplaySettings;
