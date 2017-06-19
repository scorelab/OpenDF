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
            title="This is title"
            iconClassNameRight="muidocs-icon-navigation-expand-more"
            onLeftIconButtonTouchTap={this.handleToggle}
          />
          <Drawer open={this.state.open} docked={false} onRequestChange={(open) => this.setState({open})}>
            <List>
              <ListItem primaryText="Inbox" leftIcon={<ContentInbox />} />
              <ListItem primaryText="Starred" leftIcon={<ActionGrade />} />
              <ListItem primaryText="Sent mail" leftIcon={<ContentSend />} />
              <ListItem primaryText="Drafts" leftIcon={<ContentDrafts />} />
              <ListItem primaryText="Inbox" leftIcon={<ContentInbox />} />
            </List>
            <Divider />
            <List>
              <ListItem primaryText="All mail" rightIcon={<ActionInfo />} />
              <ListItem primaryText="Trash" rightIcon={<ActionInfo />} />
              <ListItem primaryText="Spam" rightIcon={<ActionInfo />} />
              <ListItem primaryText="Follow up" rightIcon={<ActionInfo />} />
            </List>
          </Drawer>
        </div>
    );
  }
}
