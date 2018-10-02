import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import kebabCase from 'lodash/kebabCase';
// import styles from './flagship-buttons-styles.scss';
import flagship1 from 'assets/flagship-programmes/1.png';
import flagship2 from 'assets/flagship-programmes/2.png';
import flagship3 from 'assets/flagship-programmes/3.png';
import flagship4 from 'assets/flagship-programmes/4.png';
import flagship5 from 'assets/flagship-programmes/5.png';
import flagship6 from 'assets/flagship-programmes/6.png';
import flagship7 from 'assets/flagship-programmes/7.png';
import flagship8 from 'assets/flagship-programmes/8.png';
import FlagshipButton from './flagship-button/flagship-button';

class FlagshipButtons extends PureComponent {
  renderButton(s) {
    const { selectedId, handleFilterChange } = this.props;
    const flagshipImages = {
      flagship1,
      flagship2,
      flagship3,
      flagship4,
      flagship5,
      flagship6,
      flagship7,
      flagship8
    };
    const slug = kebabCase(s.name);
    return (
      <FlagshipButton
        key={s.name}
        flagshipImages={flagshipImages}
        section={s}
        onClick={() => handleFilterChange(slug)}
        active={selectedId === slug}
      />
    );
  }

  render() {
    const { sections, from, to, className } = this.props;
    return sections && sections.length && (
    <div className={className}>
      {sections.slice(from, to).map(s => this.renderButton(s))}
    </div>
      );
  }
}

FlagshipButtons.propTypes = {
  sections: PropTypes.array,
  // first Flagship button to render 0 to 8
  from: PropTypes.number,
  // last Flagship button to render 0 to 8
  to: PropTypes.number,
  handleFilterChange: PropTypes.func.isRequired,
  selectedId: PropTypes.string,
  className: PropTypes.string
};

FlagshipButtons.defaultProps = {
  sections: null,
  from: 0,
  to: 8,
  selectedId: null,
  className: null
};

export default FlagshipButtons;
