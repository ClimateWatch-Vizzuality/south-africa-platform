import { connect } from 'react-redux';
import Component from './ndc-pledge-component';

const mapStateToProps = ({ SectionsContent }) => {
  const { data } = SectionsContent;
  return {
    title: data && data.ndc_submission && data.ndc_submission.title,
    description: data && data.ndc_submission && data.ndc_submission.description
  };
};

export default connect(mapStateToProps, null)(Component);
