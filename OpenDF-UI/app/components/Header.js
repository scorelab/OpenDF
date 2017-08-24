import React from 'react';
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import { List } from 'material-ui/List';
import ContentInbox from 'material-ui/svg-icons/content/inbox';
import ActionInfo from 'material-ui/svg-icons/action/info';
import { Link } from 'react-router';
import DrawerListItem from './DrawerListItem';
import navigateToRoute from '../utils/navigateToRoute';


const styles = {
title: {
  cursor: 'pointer',
},
};


export default class Header extends React.Component {

  constructor(props) {
    super(props);
    this.state = { drawer: false };
  }

  toggleDrawer = () => {
    this.setState({ drawer: !this.state.drawer });
  }

  render() {
    return (
      <div>
        <AppBar
          title={<span style={styles.title}>OpenDF</span>}
          iconClassNameRight="muidocs-icon-navigation-expand-more"
          onLeftIconButtonTouchTap={this.toggleDrawer}
          onTitleTouchTap={() => navigateToRoute('/')}
        />
        <Drawer open={this.state.drawer} docked={false} onRequestChange={ (drawer) => this.setState({ drawer })}>
          <List onTouchTap={this.toggleDrawer}>
            <DrawerListItem to={'profile'} primaryText="Profile" leftIcon={<ActionInfo />} />
            <DrawerListItem to={'investigators'} primaryText="Investigators" leftIcon={<ActionInfo />} />
            <DrawerListItem to={'Settings'} primaryText="Settings" leftIcon={<ActionInfo />} />
          </List>
        </Drawer>
      </div>
    );
  }
}
