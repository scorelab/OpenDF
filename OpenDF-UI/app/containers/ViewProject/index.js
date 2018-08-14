/*
 *
 * ViewProject
 *
 */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { Grid, Row, Col } from 'react-flexbox-grid';
import { Card } from '../../components/Card';
import projectData from '../../data.json';

let id;

const styles = {
  mainDiv: {
    padding: '20px',
    width: '100%',
    textAlign: 'center',
  },
  image: {
    height: '200px',
    borderRadius: '5px',
  },
  center: {
    textAlign: 'center',
  },
  hr: {
    width: '80%',
    height: '3px',
    backgroundColor: 'black',
  },
};

export class ViewProject extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function

  constructor(props) {
    super(props);
    this.props = props;

    this.state = {
      project: {},
    };
  }

  componentWillMount() {
    id = this.props.params.id;
    this.setState({
      project: projectData.projects[id - 1],
    });
  }

  render() {
    return (
      <div>
        <Grid fluid>
          <Row>
            <Col lg={12}>
              <header className="app-header"></header>
              <div style={styles.mainDiv}>
                <div>
                  <img src={this.state.project.image} style={styles.image} alt="project logo" />
                </div>
                <h1> {this.state.project.text} </h1>
                <hr style={styles.hr} />
                <h2>Author : {this.state.project.title} </h2>
                <p>
                  {this.state.project.text}
                </p>
              </div>
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

export default connect(null, mapDispatchToProps)(ViewProject);
