import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import FontIcon from 'material-ui/FontIcon';

export default class UploadButton extends RaisedButton {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <RaisedButton
        label={this.props.label}
        labelPosition={this.props.labelPosition}
        icon={<FontIcon className="muidocs-icon-add_a_photo" />}
        style={this.props.style}
        backgroundColor={this.props.backgroundColor}
        labelColor={this.props.labelColor}
        onClick={this.props.click}
      />
    );
  }

} 