import { connect } from 'react-redux';
import Component from './flagship-programmes-component';

const mapStateToProps = ({ SectionsContent }) => {
  const { data } = SectionsContent;
  return {
    title: data && data.flagship_programmes && data.flagship_programmes.title,
    description: data &&
      data.flagship_programmes &&
      data.flagship_programmes.description
  };
};

export default connect(mapStateToProps, null)(Component);
