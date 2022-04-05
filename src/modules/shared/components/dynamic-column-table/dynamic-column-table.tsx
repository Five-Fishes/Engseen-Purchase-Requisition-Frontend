import { DownOutlined, SettingOutlined, UndoOutlined, UpOutlined } from '@ant-design/icons';
import { NotificationType } from '@constant/notification.enum';
import { ITableColumnDisplaySettings } from '@dto/i-table-columns';
import CLONING_LIB from '@utils/cloning/cloning-lib-wrapper';
import { Button, Checkbox, Drawer, List, Table, TableProps } from 'antd';
import { CheckboxChangeEvent } from 'antd/lib/checkbox';
import { ColumnProps } from 'antd/lib/table';
import { Dispatch, ReactElement, SetStateAction, useEffect, useState } from 'react';
import { popNotification } from '../notification';

interface IDynamicColumnTableProps<RecordType> extends TableProps<RecordType> {
  tableKey: string /** Please ensure this is unique */;
  visible?: boolean;
  setVisible?: Dispatch<SetStateAction<boolean>>;
  settingClassName?: string;
  drawerWidth?: number;
}
interface IDynamicColumn extends ColumnProps<any> {
  columnKey: string;
  settingDisplayName?: string;
  visible?: boolean;
  visibilityEditable?: boolean;
}
export const DynamicColumn: React.FC<IDynamicColumn> = (props) => {
  return <Table.Column {...props} />;
};

const DynamicColumnTable: React.FC<IDynamicColumnTableProps<any>> = (props) => {
  const { setVisible, visible } = props;
  const displaySettingKey = `${props.tableKey}ColumnsDisplaySettings`;
  const childNode = props.children as typeof Table.Column[];
  const defaultTableColumnDisplaySettings: ITableColumnDisplaySettings[] = childNode.map((column) => {
    const mapped = {
      ...(column as unknown as ReactElement).props,
    } as IDynamicColumn;
    if (typeof mapped.settingDisplayName === 'undefined') {
      mapped.settingDisplayName = mapped.title as string;
    }
    if (typeof mapped.visible === 'undefined') {
      mapped.visible = true;
    }
    if (typeof mapped.visibilityEditable === 'undefined') {
      mapped.visibilityEditable = true;
    }
    return mapped as unknown as ITableColumnDisplaySettings;
  });

  const [drawerVisible, setDrawerVisible] = useState<boolean>(false);
  const [tableColumnDisplaySettings, setTableColumnDisplaySettings] = useState<ITableColumnDisplaySettings[]>();

  const resetTableDisplaySettings = () => {
    (async () => {
      await localStorage.removeItem(displaySettingKey);
      await localStorage.setItem(displaySettingKey, JSON.stringify(defaultTableColumnDisplaySettings));
      setTableColumnDisplaySettings(defaultTableColumnDisplaySettings);
    })();
  };

  /**
   * Load setting from local storage
   * - use default if undefined
   * - use stored if found
   */
  useEffect(() => {
    (async () => {
      const stored = await localStorage.getItem(displaySettingKey);
      if (stored) {
        console.log('stored :>> ', JSON.parse(stored));
        setTableColumnDisplaySettings(JSON.parse(stored));
      } else {
        setTableColumnDisplaySettings(defaultTableColumnDisplaySettings);
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (tableColumnDisplaySettings) {
      localStorage.setItem(displaySettingKey, JSON.stringify(tableColumnDisplaySettings));
    }
  }, [displaySettingKey, tableColumnDisplaySettings]);

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
      } else {
        popNotification('Cannot move outside of sequence range', NotificationType.warning);
      }
    }
  };

  const closeDrawer = () => {
    if (setVisible) {
      setVisible(false);
    }
    setDrawerVisible(false);
  };

  const openDrawer = () => {
    if (setVisible) {
      setVisible(true);
    }
    setDrawerVisible(true);
  };

  return (
    <>
      {/** Optionally show setting button if no external props (visible & setVisible) provided */}
      {typeof visible === 'undefined' && (
        <div className={props.settingClassName || 'col d-flex flex-column align-items-end'}>
          <Button onClick={openDrawer} style={{ width: '50px' }} icon={<SettingOutlined />}></Button>
        </div>
      )}

      <Table dataSource={props.dataSource} rowKey={(ds) => ds.id} {...props}>
        {tableColumnDisplaySettings &&
          tableColumnDisplaySettings
            .filter((setting) => setting.visible)
            .map((setting) => {
              const node = childNode.find((node) => (node as any).props.columnKey === setting.columnKey);
              return node;
            })}
      </Table>

      <Drawer placement="right" visible={visible ?? drawerVisible} title="Table Column Settings" onClose={closeDrawer} width={props.drawerWidth}>
        <div className="d-flex flex-column justify-content-between h-100">
          <List
            dataSource={tableColumnDisplaySettings}
            itemLayout="vertical"
            style={{ width: (props.drawerWidth ?? 200) - 24 }}
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
          <Button onClick={resetTableDisplaySettings} icon={<UndoOutlined style={{ transform: 'translateY(-3px)' }} />}>
            Reset
          </Button>
        </div>
      </Drawer>
    </>
  );
};
export default DynamicColumnTable;
