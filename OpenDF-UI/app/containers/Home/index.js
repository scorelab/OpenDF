/*
 *
 * Home
 *
 */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import messages from './messages';

export class Home extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <div>
        <Helmet
          title="Home"
          meta={[
            { name: 'description', content: 'Description of Home' },
          ]}
        />
        <FormattedMessage {...messages.header} />
      </div>
    );
  }
}

Home.propTypes = {
  dispatch: PropTypes.func.isRequired,
};


function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

export default connect(null, mapDispatchToProps)(Home);
