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

export class Investigators extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <div>
        <Helmet
          title="Investigators"
          meta={[
            { name: 'description', content: 'Description of Investigators' },
          ]}
        />
        <FormattedMessage {...messages.header} />
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
