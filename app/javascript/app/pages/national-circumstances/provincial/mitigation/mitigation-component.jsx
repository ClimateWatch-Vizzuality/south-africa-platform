import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Map from 'components/map';

import styles from './mitigation-styles.scss';

class MitigationSection extends PureComponent {
  constructor(props) {
    super(props);
    this.state = { title: props.title };

    this.mapEvents = { onMouseEnter: this.handleMouseEnter };
  }

  handleMouseEnter = geo => {
    const title = geo && geo.properties && geo.properties.name;
    if (title) {
      this.setState({ title });
    }
  };

  render() {
    const { title } = this.state;
    const { mitigationList } = this.props;
    return (
      <div className={styles.columns}>
        <Map events={this.mapEvents} />
        <div>
          <h3 className={styles.title}>{title}</h3>
          {
            mitigationList && mitigationList.length > 0 && (
            <ul className={styles.list}>
              {mitigationList.map(mitigation => (
                <li key={mitigation}>{mitigation}</li>
                  ))}
            </ul>
              )
          }
        </div>
      </div>
    );
  }
}

MitigationSection.propTypes = {
  title: PropTypes.string,
  mitigationList: PropTypes.array
};

MitigationSection.defaultProps = { title: '', mitigationList: [] };

export default MitigationSection;
