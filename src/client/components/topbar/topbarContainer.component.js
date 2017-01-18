import React from 'react';
import Topbar from './topbar.component';
import request from 'superagent';

export default class TopbarContainer extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      authenticted: false
    };
  }

  componentDidMount(){
    request
      .get('/isauthenticated')
      .end((err, res) => {
        console.log('err', err);
        console.log('res', res);
        if(err){
          console.error(err); // eslint-disable-line no-console
        } else {
          this.setState({authenticted: res.body})
        }
      });
  }

  render() {
    return <Topbar authenticated={this.state.authenticted}/>;
  }
}
