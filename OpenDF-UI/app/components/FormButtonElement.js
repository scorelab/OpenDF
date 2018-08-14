// A button to use in forms to call some functions or any other defined at (click) event

import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import FontIcon from 'material-ui/FontIcon';

export default class FormButtonElement extends RaisedButton {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <RaisedButton
        label={this.props.label}
        labelPosition={this.props.labelPosition}
        icon={<FontIcon className="muidocs-icon-action-home" />}
        style={this.props.style}
        backgroundColor={this.props.backgroundColor}
        labelColor={this.props.labelColor}
        onClick={this.props.click}
      />
    );
  }
}
