/**
 * @file
 * Client side login file.
 */

import ReactDOM from 'react-dom';
import React from 'react';

// Components
import LoginContainer from './components/login/loginContainer.component';

const rootContainer = document.getElementById('content');

ReactDOM.render(<div><LoginContainer /></div>, rootContainer);
