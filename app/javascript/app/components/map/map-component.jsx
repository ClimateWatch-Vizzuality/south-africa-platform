import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import {
  ComposableMap,
  ZoomableGroup,
  Geographies,
  Geography
} from 'react-simple-maps';
import ReactTooltip from 'react-tooltip';
import { southAfricaPaths } from 'utils/maps';

import styles from './map-styles';

class Map extends Component {
  componentDidMount() {
    setTimeout(
      () => {
        ReactTooltip.rebuild();
      },
      100
    );
  }

  render() {
    const { style, theme, paths, events, defaultStyle } = this.props;
    return (
      <div className={cx(styles.wrapper, theme.wrapper)}>
        <ComposableMap projection="robinson" style={style}>
          <ZoomableGroup
            zoom={11}
            center={[ 27.66, -28.52 ]}
            onMoveEnd={this.handleMoveEnd}
          >
            <Geographies geography={paths}>
              {(geographies, projection) =>
                geographies.map(
                  geography =>
                    geography &&
                      (
                        <Geography
                          key={geography.properties.name}
                          data-for="mapTooltip"
                          data-tip={geography.properties.name}
                          geography={geography}
                          projection={projection}
                          style={geography.style || defaultStyle}
                          {...events}
                        />
                      )
                )}
            </Geographies>
          </ZoomableGroup>
        </ComposableMap>
        <ReactTooltip
          place="right"
          id="mapTooltip"
          className="global_SATooltip"
        />
      </div>
    );
  }
}

Map.propTypes = {
  style: PropTypes.object,
  theme: PropTypes.object,
  paths: PropTypes.array,
  defaultStyle: PropTypes.object,
  events: PropTypes.object
};

Map.defaultProps = {
  style: { width: '100%', height: 'auto' },
  theme: {},
  events: {},
  paths: southAfricaPaths,
  defaultStyle: {
    default: {
      fill: '#ecf0f1',
      stroke: '#d4d8d9',
      strokeWidth: 0.1,
      outline: 'none'
    },
    hover: {
      fill: '#f5b335',
      stroke: '#d4d8d9',
      strokeWidth: 0.1,
      outline: 'none'
    },
    pressed: {
      fill: '#ecf0f1',
      stroke: '#d4d8d9',
      strokeWidth: 0.1,
      outline: 'none'
    }
  }
};

export default Map;
