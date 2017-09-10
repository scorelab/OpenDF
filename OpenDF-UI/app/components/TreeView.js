import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Drawer from 'material-ui/Drawer';
import Subheader from 'material-ui/Subheader';
import RaisedButton from 'material-ui/RaisedButton';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import {Card, CardTitle, CardText} from 'material-ui/Card';
import {MuiTreeList} from 'react-treeview-mui';
import {TreeList} from 'react-treeview-mui';
import listItems from '../fileData.js';
import injectTapEventPlugin from 'react-tap-event-plugin'
import DetailView from './DetailView';

const styles = {
  Button:{
    float: 'left',
    marginTop:10
  }
};

const files = listItems
  .map((listItem, i) => {
    if (!listItem.children) {
      return i
    } else {
      return null
    }
  })
  .filter((listItemIndex) => !!listItemIndex)


 export default class TreeView extends React.Component {
  constructor(props) {
    super(props)

    const firstFile = files[0]

    this.state = {
      expandedListItems: [],
      activeListItem: firstFile,
      listItems,
      searchTerm: '',
      isUsingMuiTheme: true
    }
    this.collapseAll = this.collapseAll.bind(this)
    this.handleSearch = this.handleSearch.bind(this)
    this.handleTouchTap = this.handleTouchTap.bind(this)
    this.handleTouchTapInSearchMode = this.handleTouchTapInSearchMode.bind(this)
    this.moveToPrev = this.moveToPrev.bind(this)
    this.moveToNext = this.moveToNext.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  collapseAll() {
    this.setState({expandedListItems: []})
  }

  handleSearch(searchTerm) {
    this.setState({searchTerm})
  }

  handleTouchTap(listItem, index) {
    if (listItem.children) {
      const indexOfListItemInArray = this.state.expandedListItems.indexOf(index)
      if  (indexOfListItemInArray === -1) {
        this.setState({
          expandedListItems: this.state.expandedListItems.concat([index])
        })
      } else {
        let newArray = [].concat(this.state.expandedListItems)
        newArray.splice(indexOfListItemInArray, 1)
        this.setState({
          expandedListItems: newArray
        })
      }
    } else {
      this.setState({
        activeListItem: index
      })
    } 
  }

  handleTouchTapInSearchMode(listItem, index) {
    if (!listItem.children) {
      const expandedListItems = getAllParents(listItem, listItems)

      this.setState({
        activeListItem: index,
        expandedListItems,
        searchTerm: ''
      })
    }
  }

  moveToPrev() {
    const index = files.indexOf(this.state.activeListItem)
    const nextActiveListItem = files[files.indexOf(this.state.activeListItem) - 1]
    if (index !== 0 && !this.state.listItems[nextActiveListItem].disabled) {
      this.setState({
        activeListItem: nextActiveListItem
      })
    }
  }

  moveToNext() {
    const index = files.indexOf(this.state.activeListItem)
    const nextActiveListItem = files[files.indexOf(this.state.activeListItem) + 1]
    if (index !== files.length - 1 && !this.state.listItems[nextActiveListItem].disabled) {
      this.setState({
        activeListItem: nextActiveListItem
      })
    }
  }

  handleChange(e, i, value) {
    this.setState({
      isUsingMuiTheme: value
    })
  }

  componentDidUpdate(prevProps, prevState) {
    const {activeListItem, listItems} = this.state
    if (activeListItem !== prevState.activeListItem) {
      const expandedListItems = getAllParents(listItems[activeListItem], listItems)
      this.setState({
        expandedListItems: expandedListItems
      })
    }
  }

  render() {
    const {listItems, expandedListItems, activeListItem, searchTerm} = this.state

    const icons = {
      leftIconCollapsed: <i style={{height: 16, width: 16, color: '#CCCCCC'}} className="fa fa-caret-right" />,
      leftIconExpanded: <i style={{height: 16, width: 16, color: '#CCCCCC'}} className="fa fa-caret-down" />
    }

    return (
        <div>
           <div style={{marginTop: 20}}>
              <div>
                <Card style={{marginTop: 20}}>
                    <div style={styles.Button}>
                            <RaisedButton 
                              label="Previous"
                              style={{marginLeft: 12, marginBottom: 2}}
                              secondary={true}
                              onClick={this.moveToPrev} />
                            <RaisedButton 
                              label="Next"
                              style={{marginLeft: 5}}
                              secondary={true}
                              onClick={this.moveToNext} />
                            <RaisedButton 
                              label="Roll Up"
                              style={{marginLeft: 5,marginBottom: 2}}
                              primary={true}
                              onClick={this.collapseAll} />  
                    </div> 
                    <MuiTreeList 
                      listItems={listItems}
                      contentKey={'fileName'}
                      useFolderIcons={true}
                      haveSearchbar={true}
                      expandedListItems={expandedListItems}
                      activeListItem={activeListItem}
                      handleTouchTap={this.handleTouchTap}
                      handleTouchTapInSearchMode={this.handleTouchTapInSearchMode}
                      handleSearch={this.handleSearch}
                      searchTerm={searchTerm}
                      >
                    </MuiTreeList>  
                    <Card
                      style={{marginTop: 20}}>
                      <CardTitle title={listItems[activeListItem].fileName} />
                      <CardText>
                        {listItems[activeListItem].content}
                    </CardText>
                   </Card>
                </Card>      
              </div>
            </div>       
        </div>
    );
  }
  
}

function getAllParents(listItem, listItems, parents=[]) {
  if (listItem.parentIndex) {
    return getAllParents(listItems[listItem.parentIndex], listItems, parents.concat([listItem.parentIndex]))
  } else {
    return parents
  }
}
