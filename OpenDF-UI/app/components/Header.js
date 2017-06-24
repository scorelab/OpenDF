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
              <ListItem primaryText="Menu01" leftIcon={<ContentInbox />} />
              <ListItem primaryText="Menu02" leftIcon={<ActionGrade />} />
              <ListItem primaryText="Menu03" leftIcon={<ContentSend />} />
              <ListItem primaryText="Menu04" leftIcon={<ContentDrafts />} />
              <ListItem primaryText="Menu05" leftIcon={<ContentInbox />} />
            </List>
          </Drawer>
        </div>
    );
  }
}
