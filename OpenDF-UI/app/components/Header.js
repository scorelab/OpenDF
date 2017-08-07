import React from 'react';
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import {List, ListItem} from 'material-ui/List';
import ContentInbox from 'material-ui/svg-icons/content/inbox';
import ActionGrade from 'material-ui/svg-icons/action/grade';
import ContentSend from 'material-ui/svg-icons/content/send';
import ContentDrafts from 'material-ui/svg-icons/content/drafts';
import Divider from 'material-ui/Divider';
import ActionInfo from 'material-ui/svg-icons/action/info';



export default class Header extends React.Component {

  constructor(props) {
    super(props);
    this.state = {open: false};
  }

  handleToggle = () => this.setState({open: !this.state.open});

  render() {
    return (
        <div>
          <AppBar
            title="OpenDF"
            iconClassNameRight="muidocs-icon-navigation-expand-more"
            onLeftIconButtonTouchTap={this.handleToggle}
          />
          <Drawer open={this.state.open} docked={false} onRequestChange={(open) => this.setState({open})}>
            <List>
              <ListItem onlclick="/profile" primaryText="Profile" leftIcon={<ContentInbox />} />
              <ListItem onlclick="/investigators" primaryText="Investigators" leftIcon={<ActionInfo />} />
            </List>
          </Drawer>
        </div>
    );
  }
}
