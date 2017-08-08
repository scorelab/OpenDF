import React from 'react';
import { ListItem } from 'material-ui/List';
import navigateToRoute from '../utils/navigateToRoute';


export default class DrawerListItem extends ListItem {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <ListItem
        onTouchTap={ () => navigateToRoute(this.props.to) }
        primaryText={this.props.primaryText}
        leftIcon={this.props.leftIcon}
      />
    );
  }
}
