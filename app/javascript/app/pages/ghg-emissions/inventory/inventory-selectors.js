import { createSelector, createStructuredSelector } from 'reselect';
import isEmpty from 'lodash/isEmpty';

const getInventoryData = ({ GHGInventory = {} }) =>
  isEmpty(GHGInventory.data) ? null : GHGInventory.data;
const getActiveValueParam = ({ location = {} }) =>
  location.query ? location.query.tab : null;

const getInventory = createSelector(getInventoryData, inventory => inventory);
const getActiveTabValue = createSelector(
  getActiveValueParam,
  tabActive => tabActive
);

const defaultColumns = [ 'name', 'definition', 'unit', 'composite_name' ];
const ellipsisColumns = [ 'composite_name' ];
const getTableData = createSelector(getInventory, data => ({
  data,
  defaultColumns,
  ellipsisColumns
}));

export const getGHGInventory = createStructuredSelector({
  tableData: getTableData,
  activeTabValue: getActiveTabValue
});
