import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import FlagshipProgrammesInfo from './flagship-programmes-info';
import PrioritisedFlagshipProgrammes from './prioritised-flagship-programmes';

class FlagshipProgrammes extends PureComponent {
  render() {
    const { title } = this.props;
    return (
      <div>
        <FlagshipProgrammesInfo title={title} />
        <PrioritisedFlagshipProgrammes />
      </div>
    );
  }
}

FlagshipProgrammes.propTypes = { title: PropTypes.string.isRequired };

export default FlagshipProgrammes;
