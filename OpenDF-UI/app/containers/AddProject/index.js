/*
 *
 * AddProject
 *
 */

import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { Grid, Row, Col } from 'react-flexbox-grid';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import Divider from 'material-ui/Divider';
import Subheader from 'material-ui/Subheader';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import 'whatwg-fetch';
import ButtonElement from '../../components/ButtonElement';
import FormButtonElement from '../../components/FormButtonElement';
import UploadButton from '../../components/UploadButton';
// import projectData from '../../data.json';

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
    backgroundColor: 'red',
  },
};

export class AddProject extends React.Component {
  state = { investigator: '', selectedFile: null };

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
    } else {
      return response;
    }
  }

  fileChangerHandler = (event) => {
    this.setState({ selectedFile: event.target.files[0] });
  }

  saveProject = (event) => {
    event.preventDefault();
    // ToDo
    // Add image upload POST request
    const project = {
      title: this.state.projectName,
      text: this.state.projectDesc,
      investigator: this.state.investigator,
      company: this.state.companyName,
      image: this.state.selectedFile.name,
    };
    fetch('http://localhost:8080/projects', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(project),
    })
    .then((response) => {
      if (response.ok) {
        toast('Project added successfully !', {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
        });
      } else {
        toast.error('Error while saving the project! ', {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
        });
      }
    })
    .catch((error) => {
      if (error.message === 'Failed to fetch') {
        toast.error(`Error while saving the project! ${error.message}`, {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
        });
      } else {
        toast('Error while saving the project! ', {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
        });
      }
    });
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
            <ToastContainer />
            <Paper style={styles.Papers}>
              <Col xs>
                <Subheader style={styles.Subheader}>Add Project</Subheader>
                <Divider style={styles.Divider} />
                <form>
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

                  {/* Creating native file input element to call by Material-ui FormButtonElement */}
                  <input
                    type="file"
                    onChange={this.fileChangerHandler}
                    style={{ display: 'none' }}
                    ref={(fileinput) => this.fileinput = fileinput}
                  />

                  {/* This FormButtonElement clicks the input file button which is defined above by ref */}
                  <UploadButton
                    label={'Upload Image'}
                    style={styles.ButtonMargin}
                    backgroundColor={'#FAFAFA'}
                    labelColor={'#272727'}
                    labelPosition={'after'}
                    click={() => this.fileinput.click()}
                  />
                  <br />

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
