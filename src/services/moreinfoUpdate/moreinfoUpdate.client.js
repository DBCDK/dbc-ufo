/**
 * @file
 * Client for moreinfo update webservice
 */
import fs from 'fs';
import {promiseRequest} from '../../utils/request.util';
import {CONFIG} from '../../utils/config.util';
import escapeHtml from '../../utils/escapeHtml.util';
import {log} from 'dbc-node-logger';

/**
 * add image to post
 *
 * @param libraryCode
 * @param localId
 * @param imagePath
 * @returns {boolean}
 */
export async function uploadImage(owner, libraryCode, localId, imagePath) {
  const binaryData = await getBufferFromFile(imagePath);
  const infoData = `<ns1:informationBinary>${binaryData}</ns1:informationBinary>`;
  return makeRequest(owner, libraryCode, localId, infoData);
}

/**
 * Add url to post.
 *
 * @param libraryCode
 * @param localId
 * @param url
 * @returns {boolean}
 */
export async function uploadUrl(owner, libraryCode, localId, url) {
  const infoData = `<ns1:informationUrl>${escapeHtml(url)}</ns1:informationUrl>`;
  return makeRequest(owner, libraryCode, localId, infoData);
}

/**
 * Make request to moreinfo update webservice.
 *
 * @param libraryCode
 * @param localId
 * @param moreInfoData
 * @returns {boolean}
 */
async function makeRequest(owner, libraryCode, localId, moreInfoData) {
  if (CONFIG.mock_externals.moreinfo_update) {
    return mockRequest(libraryCode, localId);
  }

  const params = {
    url: CONFIG.moreinfo_update.uri,
    body: `
<SOAP-ENV:Envelope xmlns:ns0="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ns1="http://oss.dbc.dk/ns/moreinfoupdate" xmlns:SOAP-ENV="http://schemas.xmlsoap.org/soap/envelope/">
   <SOAP-ENV:Header/>
   <ns0:Body>
      <ns1:moreinfoUpdate>
         <ns1:moreinfoData>
            <ns1:moreinfo>
               ${moreInfoData}
            </ns1:moreinfo>
            <ns1:moreinfoCategory>coverImage</ns1:moreinfoCategory>
            <ns1:danbibRecordId>
               <ns1:localIdentifier>${localId}</ns1:localIdentifier>
               <ns1:libraryCode>${libraryCode}</ns1:libraryCode>
            </ns1:danbibRecordId>
         </ns1:moreinfoData>
         <ns1:source>${owner}</ns1:source>
        <ns1:outputType>json</ns1:outputType>
      </ns1:moreinfoUpdate>
   </ns0:Body>
</SOAP-ENV:Envelope>
`
  };

  try {
    const {body, statusCode} = await promiseRequest('post', params);
    if (statusCode !== 200) {
      throw new Error('MoreinfoUpdate not responding');
    }
    const response = JSON.parse(body).moreinfoUpdateResponse;
    if (response.error || response.requestAccepted.recordRejected) {
      throw new Error(JSON.stringify(response));
    }
    return true;
  }
  catch (e) {
    log.error('Request to moreinfo update failed', {error: e.message, stack: e.stack, url: params.url});
    throw new Error(e);
  }
}

/**
 * Converts a file to base64 buffer.
 *
 * @param path
 * @returns {Promise}
 */
function getBufferFromFile(path) {
  return new Promise((resolve, reject) => {
    fs.readFile(path, (err, data) => {
      if (err) {
        reject(err);
      }
      else {
        const encodedImage = new Buffer(data, 'binary').toString('base64');
        resolve(encodedImage);
        fs.unlink(path, (error) => {
          log.warn('Could not delete file from /tmp', error);
        });
      }
    });
  });
}

/**
 * Mock calls to Moreinfo Update webservice
 * @param libraryCode
 * @param localId
 * @returns {boolean}
 */
function mockRequest(libraryCode, localId) {
  if (localId === '11111111') {
    throw new Error('Mock request throws error');
  }
  return true;
}
