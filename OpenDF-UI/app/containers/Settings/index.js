/*
 *
 * Settings
 *
 */
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import messages from './messages';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import ButtonElement from '../../components/ButtonElement';
import { Grid, Row, Col } from 'react-flexbox-grid';
import Divider from 'material-ui/Divider';
import Subheader from 'material-ui/Subheader';
import Avatar from 'material-ui/Avatar';
import {List, ListItem} from 'material-ui/List';

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
  },
  floattextcolor:{
    color:'#000a12',
  }
};

export class Settings extends React.Component { // eslint-disable-line react/prefer-stateless-function

  state = {
             value: 0,
           };

 handleChange = (event, index, value) => this.setState({value});

  render() {
    return (
      <div>
        <Helmet
          title="Settings"
          meta={[
            { name: 'description', content: 'Description of Settings' },
          ]}
        />
        <Grid fluid>
          <Row><Col xs> <h1>Settings</h1> </Col></Row>
          <Row>
          {/*Investigators adding form */}

            <Paper style={styles.Papers}>
              <Col xs>
              <Subheader style={styles.Subheader}>Change your settings</Subheader>
              <Divider style={styles.Divider}/>
                <form>
                <TextField
                  disabled={true}
                  hintText="Pasan Ranathunga"
                  defaultValue="Pasan Ranathunga"
                  floatingLabelText="Name"
                  floatingLabelFixed={true}
                  style={styles.TextFields}
                  floatingLabelStyle={styles.floattextcolor}
                /> <br />
                <TextField
                     hintText="Company Name"
                     floatingLabelText="Company Name"
                     disabled={true}
                     fullWidth={true}
                     floatingLabelFixed={true}
                     floatingLabelStyle={styles.floattextcolor}
                     style={styles.TextFields}
                /> <br />
                <TextField
                     hintText="Project Name"
                     floatingLabelText="Project Name"
                     fullWidth={true}
                     disabled={true}
                     fullWidth={true}
                     floatingLabelFixed={true}
                     floatingLabelStyle={styles.floattextcolor}
                     style={styles.TextFields}
                /> <br/>
                <TextField
                     hintText="Investigator Name"
                     floatingLabelText="Investigator Name"
                     fullWidth={true}
                     disabled={true}
                     fullWidth={true}
                     floatingLabelFixed={true}
                     floatingLabelStyle={styles.floattextcolor}
                     style={styles.TextFields}
                /> <br/>

                <div style={styles.Button}>
                  <ButtonElement label={"Edit"} backgroundColor={'#4CAF50'} labelColor={'#fff'} labelPosition={'after'} />
                </div>
                </form>
              </Col>
            </Paper>
          </Row>
        </Grid>
      </div>
    );
  }
}

Settings.propTypes = {
  dispatch: PropTypes.func.isRequired,
};


function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

export default connect(null, mapDispatchToProps)(Settings);
