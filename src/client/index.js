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
import UploadImageContainer from './components/imageUpload/imageUploadContainer.component';
import UploadUrlontainer from './components/urlUpload/urlUploadContainer.component';

const topbarContainer = document.getElementById('topbar');
const rootContainer = document.getElementById('content');

ReactDOM.render(<div><UploadImageContainer /><UploadUrlontainer/></div>, rootContainer);
ReactDOM.render(<div><TopbarContainer /></div>, topbarContainer);
