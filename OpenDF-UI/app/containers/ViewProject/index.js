/*
 *
 * ViewProject
 *
 */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

let id;

export class ViewProject extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  componentWillMount() {
    id = this.props.params.id;
  }

  render() {
    return (
      <div>
        <h3>Hello { id } </h3>
      </div>
    );
  }
}

ViewProject.propTypes = {
  dispatch: PropTypes.func.isRequired,
};


function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

export default connect(null, mapDispatchToProps)(ViewProject);
