/*
 *
 * Investigators
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
    margin: 10,
    padding: 10,
  },
  TextFields:{
    width: 500,
  },
  Button: {
    float: 'right',
  },
  Divider: {
    backgroundColor: '#000a12',
  },
  Subheader: {
    color: '#007ac1',
  }
};

export class Investigators extends React.Component { // eslint-disable-line react/prefer-stateless-function
  state = {
    value: 0,
  };

  handleChange = (event, index, value) => this.setState({ value });


  render() {
    return (
      <div>
        <Helmet
          title="Investigators"
          meta={[
            { name: 'description', content: 'Description of Investigators' },
          ]}
        />
        <Grid fluid>
          <Row><Col xs> <h1>Investigators</h1> </Col></Row>
          <Row>
          {/*Show all investigators */}

          <Paper style={styles.Papers}>
            <Col xs>
              <Subheader style={styles.Subheader}>All Investigators</Subheader>
              <Divider style={styles.Divider}/>

              <List>
                <ListItem
                  primaryText="Brendan Lim"
                  leftAvatar={<Avatar>BL</Avatar>}
                />
                <ListItem
                  primaryText="Eric Hoffman"
                  leftAvatar={<Avatar>EH</Avatar>}
                />
                <ListItem
                  primaryText="Grace Ng"
                  leftAvatar={<Avatar>GN</Avatar>}
                />
                <ListItem
                  primaryText="Kerem Suer"
                  leftAvatar={<Avatar>KS</Avatar>}
                />
                <ListItem
                  primaryText="Raquel Parrado"
                  leftAvatar={<Avatar>RP</Avatar>}
                />
              </List>

            </Col>
          </Paper>

          {/*Investigators adding form */}

            <Paper style={styles.Papers}>
              <Col xs>
              <Subheader style={styles.Subheader}>Add Investigator</Subheader>
              <Divider style={styles.Divider}/>
                <form>
                <TextField
                     hintText="Name"
                     floatingLabelText="Name"
                     fullWidth={true}
                     style={styles.TextFields}
                /> <br />
                <TextField
                     hintText="Company Name"
                     floatingLabelText="Company Name"
                     fullWidth={true}
                     style={styles.TextFields}
                /> <br />
                <TextField
                     hintText="Project Name"
                     floatingLabelText="Project Name"
                     fullWidth={true}
                     style={styles.TextFields}
                /> <br/>
                <SelectField
                  floatingLabelText="Investigator"
                  value={this.state.value}
                  onChange={this.handleChange}
                >
                  <MenuItem value={1} primaryText="Investigator01" />
                  <MenuItem value={2} primaryText="Investigator02" />
                  <MenuItem value={3} primaryText="Investigator03" />
                  <MenuItem value={4} primaryText="Investigator04" />
                  <MenuItem value={5} primaryText="Investigator05" />
                </SelectField> <br/>

                <div style={styles.Button}>
                  <ButtonElement label={"Save"} backgroundColor={'#4CAF50'} labelColor={'#fff'} labelPosition={'after'} />
                  <ButtonElement label={"Reset"} backgroundColor={'#FF5252'} labelColor={'#fff'} labelPosition={'after'}/>
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

Investigators.propTypes = {
  dispatch: PropTypes.func.isRequired,
};


function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

export default connect(null, mapDispatchToProps)(Investigators);
