import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Map from 'components/map';

import styles from './provincial-development-priorities-content-styles.scss';

class ProvincialDevelopmentPrioritiesContent extends PureComponent {
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
    const { selectedData } = this.props;
    return (
      <div className={styles.columns}>
        <Map
          events={this.mapEvents}
          selectedTitle={title}
          disableOptimization
        />
        <div>
          <h3 className={styles.title}>{title}</h3>
          {
            selectedData &&
              selectedData[title] &&
              /* eslint-disable-next-line react/no-danger */
              (
                <ul
                  className={styles.list}
                  dangerouslySetInnerHTML={{ __html: selectedData[title] }}
                />
              )
          }
        </div>
      </div>
    );
  }
}

ProvincialDevelopmentPrioritiesContent.propTypes = {
  title: PropTypes.string,
  selectedData: PropTypes.object
};

ProvincialDevelopmentPrioritiesContent.defaultProps = {
  title: '',
  selectedData: {}
};

export default ProvincialDevelopmentPrioritiesContent;
