/*
 *
 * File Browser
 *
 */
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import TreeView from '../../components/TreeView';
import DetailView from '../../components/DetailView';
import Paper from 'material-ui/Paper';
import { Grid, Row, Col } from 'react-flexbox-grid';
import {Card, CardHeader} from 'material-ui/Card';// eslint-disable-next-line
import messages from './messages';

const styles = {
  Papers: {
    margin:10,
    padding:10,
  },
  TextFields:{
    width: 500,
  },
  Button:{
    float: 'right'
  },
  Divider:{
    backgroundColor:'#000a12',
  },
  Subheader:{
    color:'#007ac1',
  }
};

export class FileBrowser extends React.Component { // eslint-disable-line react/prefer-stateless-function

	render() {
      return (
          <div>
            <Helmet
              title="FileBrowser"
              meta={[
                { name: 'description', content: 'Description of FileBrowser' },]}/>  
              <Grid fluid> 
                <Row>  
                  <Col xs={3} md={3}>        
                    <TreeView />                
                  </Col> 
                  <Col xs={9} md={9}>                                      
                      <DetailView/>                     
                    </Col> 
                </Row>
              </Grid>             
          </div> 
      );
  }   

}	

FileBrowser.propTypes = {
  dispatch: PropTypes.func.isRequired,
};


function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

export default connect(null, mapDispatchToProps)(FileBrowser);