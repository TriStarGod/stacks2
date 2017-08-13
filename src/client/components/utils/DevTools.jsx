import React from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import LogMonitor from 'redux-devtools-log-monitor'; // state monitoring functionality
// eslint-disable-next-line import/no-extraneous-dependencies
import DockMonitor from 'redux-devtools-dock-monitor'; // handy data display
// eslint-disable-next-line import/no-extraneous-dependencies
import { createDevTools } from 'redux-devtools';

const DevTools = createDevTools(
  <DockMonitor
    toggleVisibilityKey="ctrl-h"
    changePositionKey="ctrl-q"
    defaultIsVisible
  >
    <LogMonitor theme="tomorrow" />
  </DockMonitor>,
);

export default DevTools;
