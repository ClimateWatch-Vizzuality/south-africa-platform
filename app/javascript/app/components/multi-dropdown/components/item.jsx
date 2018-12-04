import React from 'react';
import PropTypes from 'prop-types';

import { Icon } from 'cw-components';
import cx from 'classnames';

import arrowDownIcon from 'assets/icons/arrow-down.svg';
import styles from '../multi-dropdown-styles.scss';

const Item = props => {
  const {
    index,
    item,
    showGroup,
    highlightedIndex,
    getItemProps,
    toggleOpenGroup,
    activeValue,
    activeLabel,
    noParentSelection
  } = props;
  const { group, groupParent, label } = item;

  const isActive = !showGroup && !group ||
    (group === showGroup || groupParent === showGroup);
  const isGroupParentActive = groupParent && showGroup === groupParent;
  const isHighlighted = highlightedIndex === index ||
    activeLabel === label ||
    groupParent && groupParent === showGroup ||
    groupParent && activeValue && groupParent === activeValue.group;
  const showArrowIcon = groupParent && showGroup !== groupParent && isActive;
  const parentClickProp = noParentSelection &&
    (!showGroup || isGroupParentActive)
    ? { onClick: () => toggleOpenGroup(item) }
    : {};
  return (
    <div
      className={cx(styles.itemWrapper, {
        [styles.show]: isActive,
        [styles.base]: !group,
        [styles.selected]: isGroupParentActive,
        [styles.groupParent]: groupParent
      })}
    >
      {
        isGroupParentActive &&
          (
            <Icon
              icon={arrowDownIcon}
              className={cx(styles.groupIcon, styles.selected)}
              onClick={() => toggleOpenGroup(item)}
            />
          )
      }
      <div
        {...getItemProps({
          item,
          index,
          className: cx(styles.item, { [styles.highlight]: isHighlighted })
        })}
        {...parentClickProp}
      >
        {label}
      </div>
      {
        showArrowIcon &&
          (
            <Icon
              icon={arrowDownIcon}
              className={cx(styles.groupIcon, {
                [styles.selected]: showGroup === groupParent
              })}
              onClick={() => toggleOpenGroup(item)}
            />
          )
      }
    </div>
  );
};

Item.propTypes = {
  index: PropTypes.number,
  item: PropTypes.object,
  showGroup: PropTypes.string,
  highlightedIndex: PropTypes.number,
  getItemProps: PropTypes.func.isRequired,
  toggleOpenGroup: PropTypes.func.isRequired,
  optionsAction: PropTypes.func.isRequired,
  optionsActionKey: PropTypes.string,
  activeValue: PropTypes.object,
  activeLabel: PropTypes.oneOfType([ PropTypes.string, PropTypes.number ]),
  noParentSelection: PropTypes.bool
};

Item.defaultProps = {
  index: undefined,
  item: undefined,
  showGroup: undefined,
  highlightedIndex: undefined,
  optionsActionKey: undefined,
  activeValue: undefined,
  activeLabel: undefined,
  noParentSelection: false
};

export default Item;
