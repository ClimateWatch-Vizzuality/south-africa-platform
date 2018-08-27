import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import SectionTitle from 'components/section-title';
import TabSwitcher from 'components/tab-switcher';
import { NoContent } from 'cw-components';

import Mitigation from './mitigation';
import styles from './provincial-styles.scss';

const MITIGATION_KEY = 'mitigation';
const ADAPTATION_KEY = 'adaptation';

class Provincial extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      tabs: [
        {
          name: 'Mitigation',
          value: MITIGATION_KEY,
          component: (
            <Mitigation
              title="Western Cape"
              mitigationList={props.mitigationList}
            />
          )
        },
        {
          name: 'Adaptation',
          value: ADAPTATION_KEY,
          disabled: true,
          component: <NoContent message="Section not ready yet" />
        }
      ]
    };
  }

  handleTabChange = ({ value }) => {
    const { updateQueryParam, query } = this.props;
    updateQueryParam({ query: { ...query, tab: value } });
  };

  render() {
    return (
      <div className={styles.row}>
        <SectionTitle title="Provincial Development Priorities" />
        <TabSwitcher
          tabs={this.state.tabs}
          actionsActive={false}
          searchActive={false}
          onTabChange={this.handleTabChange}
          onFilterChange={this.handleFilterChange}
          activeTabValue={this.props.activeTabValue}
        />
      </div>
    );
  }
}

Provincial.propTypes = {
  query: PropTypes.object,
  mitigationList: PropTypes.array,
  activeTabValue: PropTypes.string,
  updateQueryParam: PropTypes.func.isRequired
};

Provincial.defaultProps = {
  query: null,
  activeTabValue: null,
  mitigationList: []
};

export default Provincial;
