/**
 * @file
 * Client side login file.
 */

import ReactDOM from 'react-dom';
import React from 'react';

// Components
import LoginContainer from './components/login/loginContainer.component';
import TopbarContainer from './components/topbar/topbarContainer.component';

const topbarContainer = document.getElementById('topbar');
const rootContainer = document.getElementById('content');

ReactDOM.render(<div><LoginContainer /></div>, rootContainer);
ReactDOM.render(<div><TopbarContainer /></div>, topbarContainer);
