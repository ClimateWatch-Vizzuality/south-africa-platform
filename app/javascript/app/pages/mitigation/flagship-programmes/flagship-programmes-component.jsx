import React, { PureComponent } from 'react';
import FlagshipProgrammesInfo from './flagship-programmes-info';
import PrioritisedFlagshipProgrammes from './prioritised-flagship-programmes';

class FlagshipProgrammes extends PureComponent {
  render() {
    return (
      <div>
        <FlagshipProgrammesInfo />
        <PrioritisedFlagshipProgrammes />
      </div>
    );
  }
}

export default FlagshipProgrammes;
