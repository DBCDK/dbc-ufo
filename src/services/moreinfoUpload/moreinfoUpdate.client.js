/**
 * @file
 * Client for moreinfo update webservice
 */

import {promiseRequest} from '../../utils/request.util';
import {CONFIG} from '../../utils/config.util';
import {log} from 'dbc-node-logger';

export default async function makeRequest(libraryCode, localId, binaryData) {
  const params = {
    url: CONFIG.forsrights.uri,
    body: `
<SOAP-ENV:Envelope xmlns:ns0="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ns1="http://oss.dbc.dk/ns/moreinfoupdate">
   <SOAP-ENV:Header/>
   <ns0:Body>
      <ns1:moreinfoUpdate>
         <ns1:moreinfoData>
            <ns1:moreinfo>
               <ns1:informationBinary>${binaryData}</ns1:informationBinary>
            </ns1:moreinfo>
            <ns1:moreinfoCategory>coverImage</ns1:moreinfoCategory>
            <ns1:danbibRecordId>
               <ns1:localIdentifier>${localId}</ns1:localIdentifier>
               <ns1:libraryCode>${libraryCode}</ns1:libraryCode>
            </ns1:danbibRecordId>
         </ns1:moreinfoData>
         <ns1:source>100200</ns1:source>
        <ns1:outputType>json</ns1:outputType>
      </ns1:moreinfoUpdate>
   </ns0:Body>
</SOAP-ENV:Envelope>
`
  };

  try {
    const {body} = await promiseRequest('post', params);
    const response = JSON.parse(body).moreinfoUpdateResponse;
    if (response.error || response.record.rejected) {
      throw new Error('image upload faild', response.error || response.recordRejected);
    }
    return true;
  }
  catch (e) {
    log.error('Request to moreinfo update failed', e);
    throw new Error(e);
  }
}
