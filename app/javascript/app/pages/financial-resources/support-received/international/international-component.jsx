import React, { PureComponent } from 'react';
import { PropTypes } from 'prop-types';
import SankeyChart from 'components/sankey';

class International extends PureComponent {
  render() {
    const { data, tooltipConfig } = this.props;
    return (
      <div>
        {data && <SankeyChart data={data} tooltipConfig={tooltipConfig} />}
      </div>
    );
  }
}

International.propTypes = {
  data: PropTypes.object,
  tooltipConfig: PropTypes.object
};

International.defaultProps = { data: null, tooltipConfig: null };

export default International;
