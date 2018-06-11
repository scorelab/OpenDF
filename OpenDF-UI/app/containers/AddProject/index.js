/*
 *
 * AddProject
 *
 */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { Grid, Row, Col } from 'react-flexbox-grid';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import Divider from 'material-ui/Divider';
import Subheader from 'material-ui/Subheader';
import 'whatwg-fetch';
import ButtonElement from '../../components/ButtonElement';
import FormButtonElement from '../../components/FormButtonElement';
import projectData from '../../data.json';

const styles = {
  Papers: {
    margin: 10,
    padding: 10,
  },
  TextFields: {
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
  },
  ButtonMargin: {
    marginRight: '5px',
  },
};

export class AddProject extends React.Component {
  state = { investigator: '' };

  handleChangeInvestigator = (event, index, value) => {
    this.setState({ investigator: value });
  }

  handleChangeFormItems = (event) => {
    const field = event.target.name;
    const value = event.target.value;
    this.setState({ [field]: value });
  }

  handleAPIErrors(response) {
    if (!response.ok) {
      throw Error(response.statusText);
    }
    return response;
  }

  saveProject = (event) => {
    event.preventDefault();
    const project = {
      title: this.state.projectName,
      text: this.state.projectDesc,
      investigator: this.state.investigator,
      company: this.state.companyName,
    };
    fetch('http://localhost:8080/projects', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(project)
    })
    .then(this.handleAPIErrors)
    .then(response => alert('Project Added Successfully'))
    .catch(error => alert('Error while saving the data'));
  }


  render() {
    return (
      <div>
        <Helmet
          title="AddProject"
          meta={[
            { name: 'description', content: 'Description of AddProject' },
          ]}
        />

        <Grid fluid>
          <Row>
            <Paper style={styles.Papers}>
              <Col xs>
                <Subheader style={styles.Subheader}>Add Project</Subheader>
                <Divider style={styles.Divider} />
                <form onSubmit={this.saveProject}>
                  <TextField
                    name="projectName"
                    hintText="Project Name"
                    floatingLabelText="Project Name"
                    fullWidth={true}
                    style={styles.TextFields}
                    value={this.state.projectName}
                    onChange={this.handleChangeFormItems}
                  /> <br />
                  <TextField
                    name="companyName"
                    hintText="Company Name"
                    floatingLabelText="Company Name"
                    fullWidth={true}
                    style={styles.TextFields}
                    value={this.state.companyName}
                    onChange={this.handleChangeFormItems}
                  /> <br />
                  <TextField
                    name="projectDesc"
                    hintText="Project Description"
                    floatingLabelText="Project Description"
                    fullWidth={true}
                    style={styles.TextFields}
                    value={this.state.projectDesc}
                    onChange={this.handleChangeFormItems}
                  /> <br />
                  <SelectField
                    floatingLabelText="Investigator"
                    value={this.state.investigator}
                    onChange={this.handleChangeInvestigator}
                  >
                    <MenuItem value={'Investigator01'} primaryText="Investigator01" />
                    <MenuItem value={'Investigator02'} primaryText="Investigator02" />
                    <MenuItem value={'Investigator03'} primaryText="Investigator03" />
                    <MenuItem value={'Investigator04'} primaryText="Investigator04" />
                    <MenuItem value={'Investigator05'} primaryText="Investigator05" />
                  </SelectField> <br />

                  <div style={styles.Button}>
                    <FormButtonElement label={'Save Project'} style={styles.ButtonMargin} backgroundColor={'#4CAF50'} labelColor={'#fff'} labelPosition={'after'} click={this.saveProject} />
                    {/* <ButtonElement type={'submit'} label={'Save'} backgroundColor={'#4CAF50'} labelColor={'#fff'} labelPosition={'after'} /> */}
                    <ButtonElement label={'Reset'} backgroundColor={'#FF5252'} labelColor={'#fff'} labelPosition={'after'} />
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

AddProject.propTypes = {
  dispatch: PropTypes.func.isRequired,
};


function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

export default connect(null, mapDispatchToProps)(AddProject);
