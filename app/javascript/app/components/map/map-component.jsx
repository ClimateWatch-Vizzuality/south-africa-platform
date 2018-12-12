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

  overwriteDefaultStyle = geographyName => {
    const { defaultStyle, selectedTitle } = this.props;
    const isSelected = selectedTitle === geographyName;
    const { default: defaultOld } = defaultStyle;
    const defaultNew = {
      ...defaultOld,
      fill: isSelected ? '#f5b335' : '#ecf0f1'
    };
    return { ...defaultStyle, default: defaultNew };
  };

  render() {
    const {
      style,
      theme,
      paths,
      events,
      defaultStyle,
      data,
      selectedTitle,
      disableOptimization
    } = this.props;
    const getValue = (name, slug) =>
      data && data[name] && data[name].find(d => d.slug === slug).value;
    return (
      <div className={cx(styles.wrapper, theme.wrapper)}>
        <ComposableMap projection="robinson" style={style}>
          <ZoomableGroup
            zoom={11}
            center={[ 27.66, -28.52 ]}
            onMoveEnd={this.handleMoveEnd}
          >
            <Geographies
              geography={paths}
              disableOptimization={disableOptimization}
            >
              {(geographies, projection) =>
                geographies.map(
                  (geography, i) =>
                    geography &&
                      (
                        <Geography
                          key={geography.properties.name}
                          cacheId={`geography-${i}`}
                          data-for="mapTooltip"
                          data-tip={geography.properties.name}
                          data-html
                          geography={geography}
                          projection={projection}
                          style={
                            geography.style || selectedTitle
                              ? this.overwriteDefaultStyle(
                                geography.properties.name
                              )
                              : defaultStyle
                          }
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
          getContent={name => {
            const regionPercentage = getValue(name, 'regionPercentage');
            const regionTotal = getValue(name, 'regionTotal');
            return `<div>
              <div class="${styles.regionName}">
                ${name}
              </div>
              <div>
                ${regionTotal
              ? `( ${regionTotal} millions)`
              : ''} ${regionPercentage ? `( ${regionPercentage} )` : ''}
              </div>
            </div >`;
          }}
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
  events: PropTypes.object,
  data: PropTypes.object,
  selectedTitle: PropTypes.string,
  disableOptimization: PropTypes.bool
};

Map.defaultProps = {
  style: { width: '100%', height: 'auto' },
  theme: {},
  events: {},
  paths: southAfricaPaths,
  data: {},
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
  },
  selectedTitle: null,
  disableOptimization: false
};

export default Map;
