/**
 * @file
 * Client side index file.
 */

import ReactDOM from 'react-dom';
import React from 'react';

// Components
import UploadImageContainer from './components/imageUpload/imageUploadContainer.component';
import UploadUrlontainer from './components/urlUpload/urlUploadContainer.component';

const rootContainer = document.getElementById('content');

ReactDOM.render(<div><UploadImageContainer /><UploadUrlontainer/></div>, rootContainer);
