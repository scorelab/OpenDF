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
import { Grid, Row, Col } from 'react-flexbox-grid';
import messages from './messages';


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