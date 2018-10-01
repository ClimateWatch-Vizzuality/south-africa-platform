const focusKeys = d =>
  d && Object.keys(d).filter(k => k.startsWith('focusArea'));

export const getFocus = (d, focusNames) => {
  const focus = [];
  const focusKeyNames = focusKeys(d);
  if (focusKeyNames) {
    focusKeyNames.forEach(k => {
      if (d[k]) {
        const focusIndex = parseInt(k.substr(-1), 10) - 1;
        focus.push(focusNames[focusIndex]);
      }
    });
  }
  return focus;
};

export const getFocusNames = meta => {
  const focusNames = [];
  meta.forEach(k => {
    if (k.code.startsWith('focus_area')) focusNames.push(k.indicator);
  });
  return focusNames;
};
