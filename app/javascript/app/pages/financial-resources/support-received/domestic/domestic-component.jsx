import React, { PureComponent } from 'react';
import { PropTypes } from 'prop-types';
import BubbleChart from 'components/bubble-chart';
import FinancialResourcesProvider from 'providers/financial-resources-provider';

class Domestic extends PureComponent {
  handleNodeClick = (e, id) => {
    e.preventDefault();
    const { onFilterChange } = this.props;
    onFilterChange('domesticId', id);
  };

  render() {
    const { data } = this.props;
    return (
      <div>
        {
          data &&
            (
              <BubbleChart
                width={400}
                height={400}
                data={data}
                handleNodeClick={this.handleNodeClick}
                tooltipClassName="global_SATooltip"
              />
            )
        }
        <FinancialResourcesProvider />
      </div>
    );
  }
}

Domestic.propTypes = {
  data: PropTypes.array,
  onFilterChange: PropTypes.func.isRequired
};

Domestic.defaultProps = { data: null };

export default Domestic;
