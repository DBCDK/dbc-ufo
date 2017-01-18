/**
 * @file
 * Client side index file.
 */

import ReactDOM from 'react-dom';
import React from 'react';

// import styling
import './scss/index.scss';

// Components
import TopbarContainer from './components/topbar/topbarContainer.component';
import UploadContainer from './components/upload/uploadContainer.component';

const topbarContainer = document.getElementById('topbar');
const rootContainer = document.getElementById('content');

ReactDOM.render(<div><TopbarContainer /></div>, topbarContainer);
ReactDOM.render(<div><UploadContainer /></div>, rootContainer);
