import { connect } from 'react-redux';

import PlanningComponent from './sections-component';

const getSectionsWithReplacedIds = (sections, prevPayloadId, payloadId) => {
  if (!payloadId || payloadId === prevPayloadId) return sections;
  return sections.slice().map(s => {
    const updatedS = s;
    updatedS.path = !prevPayloadId
      ? s.path.replace(':id', payloadId)
      : updatedS.path = s.path.replace(prevPayloadId, payloadId);
    return updatedS;
  });
};

const mapStateToProps = ({ location }) => {
  const route = location.routesMap[location.type];
  const { section: currentSectionSlug } = location.payload;
  let section = null;
  if (route.sections) {
    const defaultSection = route.sections.find(s => s.default);
    section = route.sections.find(s => s.slug === currentSectionSlug) ||
      defaultSection;
    route.sections = getSectionsWithReplacedIds(
      route.sections,
      location.prev.payload.id,
      location.payload.id
    );
  }
  return { route, section, payload: location.payload };
};

export default connect(mapStateToProps, null)(PlanningComponent);
