/**
 * @file
 * Client side login file.
 */

import ReactDOM from 'react-dom';
import React from 'react';

// Components
import TopbarContainer from './components/topbar/topbarContainer.component';
import LoginContainer from './components/login/loginContainer.component';

const topbarContainer = document.getElementById('topbar');
const rootContainer = document.getElementById('content');

ReactDOM.render(<div><TopbarContainer /></div>, topbarContainer);
ReactDOM.render(<div><LoginContainer /></div>, rootContainer);
