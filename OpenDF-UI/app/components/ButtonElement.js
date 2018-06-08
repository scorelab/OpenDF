import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import FontIcon from 'material-ui/FontIcon';
import navigateToRoute from '../utils/navigateToRoute';


export default class ButtonElement extends RaisedButton {

  constructor(props) {
    super(props);
  }
  render() {
    return (
      <RaisedButton
        onTouchTap={() => navigateToRoute(this.props.to)}
        label={this.props.label}
        labelPosition={this.props.labelPosition}
        icon={<FontIcon className="muidocs-icon-action-home" />}
        style={this.props.style}
        backgroundColor={this.props.backgroundColor}
        labelColor={this.props.labelColor}
        onClick={() => navigateToRoute(this.props.click)}
      />
    );
  }
}
