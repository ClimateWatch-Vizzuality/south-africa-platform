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
  const { group, groupParent, label, active } = item;
  const isDisplayed = !showGroup && !group ||
    (group === showGroup || groupParent === showGroup);
  const isGroupParentActive = groupParent && showGroup === groupParent;
  const isHighlighted = highlightedIndex === index ||
    activeLabel === label ||
    groupParent && groupParent === showGroup ||
    groupParent && activeValue && groupParent === activeValue.group;
  const showToChildrenArrow = groupParent &&
    showGroup !== groupParent &&
    isDisplayed;
  const parentClickProp = noParentSelection &&
    (!showGroup || isGroupParentActive)
    ? { onClick: () => toggleOpenGroup(item) }
    : {};

  const backArrow = (
    <Icon
      icon={arrowDownIcon}
      theme={{ icon: cx(styles.groupIcon, styles.selected) }}
      onClick={() => toggleOpenGroup(item)}
    />
  );

  const toChildrenArrow = (
    <Icon
      icon={arrowDownIcon}
      theme={{
        icon: cx(styles.groupIcon, {
          [styles.selected]: showGroup === groupParent
        })
      }}
      onClick={() => toggleOpenGroup(item)}
    />
  );

  return (
    <div
      className={cx(styles.itemWrapper, {
        [styles.show]: isDisplayed,
        [styles.base]: !group,
        [styles.selected]: isGroupParentActive,
        [styles.groupParent]: groupParent
      })}
    >
      {isGroupParentActive && backArrow}
      <div
        {...getItemProps({
          item,
          index,
          className: cx(styles.item, { [styles.highlight]: isHighlighted })
        })}
        {...parentClickProp}
      >
        {label}
        {active && <span className={styles.activeMark} />}
      </div>
      {showToChildrenArrow && toChildrenArrow}
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
