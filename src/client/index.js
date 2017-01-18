/**
 * @file
 * Client side index file.
 */

import ReactDOM from 'react-dom';
import React from 'react';

// import styling
import './scss/index.scss';

// Components
import UploadContainer from './components/upload/uploadContainer.component';

const rootContainer = document.getElementById('content');

ReactDOM.render(<div><UploadContainer /></div>, rootContainer);
