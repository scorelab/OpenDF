import React, { Component , PropTypes} from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import Drawer from 'material-ui/Drawer'
import Subheader from 'material-ui/Subheader'
import RaisedButton from 'material-ui/RaisedButton'
import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'
import {Card, CardTitle, CardText} from 'material-ui/Card'
import {MuiTreeList} from 'react-treeview-mui'
import {TreeList} from 'react-treeview-mui'
import listItems from './assets/listItems'
import injectTapEventPlugin from 'react-tap-event-plugin'
import './FileBrowser.css';

injectTapEventPlugin()

const files = listItems
  .map((listItem, i) => {
    if (!listItem.children) {
      return i
    } else {
      return null
    }
  })
  .filter((listItemIndex) => !!listItemIndex)

class FileBrowser extends Component {
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

  let treeListJSX
    treeListJSX = (
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
              <Subheader>OpenDF - File Browser</Subheader>
            </MuiTreeList>      
    ) 
    return (
      <MuiThemeProvider>
        <div>
          <Drawer
            open={true}
            width={400}>
            {treeListJSX}
          </Drawer>
          <div style={{paddingLeft: 400}}>
            <div style={{width: 600, height: 400, margin: '20px auto'}}>
              <div style={{marginTop: 20}}>
                <RaisedButton 
                  label="Collapse All"
                  primary={true}
                  style={{marginRight: 10}}
                  onClick={this.collapseAll} />
                <RaisedButton 
                  label="Previous"
                  secondary={true}
                  style={{marginRight: 10}}
                  onClick={this.moveToPrev} />
                <RaisedButton 
                  label="Next"
                  secondary={true}
                  onClick={this.moveToNext} />
              </div>
              <Card
                style={{marginTop: 20}}>
                <CardTitle title={listItems[activeListItem].fileName} />
                <CardText>
                  {listItems[activeListItem].content}
                </CardText>
              </Card>
            </div>
          </div>
        </div>
      </MuiThemeProvider>
    );
  }

}

export default FileBrowser;

function getAllParents(listItem, listItems, parents=[]) {
  if (listItem.parentIndex) {
    return getAllParents(listItems[listItem.parentIndex], listItems, parents.concat([listItem.parentIndex]))
  } else {
    return parents
  }
}
