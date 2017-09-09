import React, { Component } from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import Dialog from 'material-ui/Dialog';
import {deepOrange500} from 'material-ui/styles/colors';
import FlatButton from 'material-ui/FlatButton';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import MenuItem from 'material-ui/MenuItem';
import {Card, CardHeader} from 'material-ui/Card';
import IconButton from 'material-ui/IconButton';
import DataTables from 'material-ui-datatables';

// @TODO These are dummy data. The actual data should be pulled from the API.

const TABLE_COLUMNS_TOOLTIP = [
  {
    key: 'Name',
    label: 'Name',
    tooltip: 'File/Folder Name',
  }, {
    key: 'Size',
    label: 'Size',
    tooltip: 'File/Folder Size',
  }, {
    key: 'Last_modified',
    label: 'Last-modified',
    tooltip: 'Last-modified Date',
  }, {
    key: 'Type',
    label: 'Type',
    tooltip: 'File/Folder type',
  },
];


// @TODO These are dummy data. The actual data should be pulled from the API.
const TABLE_DATA = [
  {
    Name: 'Downloads',
    Size: '10 GB',
    Last_modified: '12-04-17',
    Type: 'Directory',
  }, {
    Name: 'Intel',
    Size: '10 GB',
    Last_modified: '12-04-17',
    Type: 'Directory',
  }, {
    Name: 'Program Files',
    Size: '10 GB',
    Last_modified: '12-04-17',
    Type: 'Directory',
  }, {
    Name: 'Recycle Bin',
    Size: '10 GB',
    Last_modified: '12-04-17',
    Type: 'Directory',
  }, {
    Name: 'temp',
    Size: '10 GB',
    Last_modified: '12-04-17',
    Type: 'Directory',
  }, {
    Name: 'Update',
    Size: '10 GB',
    Last_modified: '12-04-17',
    Type: 'Directory',
  }, {
    Name: 'Users',
    Size: '10 GB',
    Last_modified: '12-04-17',
    Type: 'Directory',
  }, {
    Name: 'Windows',
    Size: '10 GB',
    Last_modified: '12-04-17',
    Type: 'Directory',
  }, {
    Name: 'test',
    Size: '24 KB',
    Last_modified: '12-04-17',
    Type: 'text',
  }, {
    Name: 'image',
    Size: '12 MB',
    Last_modified: '12-04-17',
    Type: 'image-png',
  },
];

// @TODO These are dummy data. The actual data should be pulled from the API.
const TABLE_DATA_NEXT = [
  {
    Name: 'my video',
    Size: '34 MB',
    Last_modified: '12-04-17',
    Type: 'video',
  },
  {
    Name: 'my audio',
    Size: '12 MB',
    Last_modified: '12-04-17',
    Type: 'audio-mp3',
  },
];

 export default class DetailView extends React.Component  {
  constructor(props, context) {
    super(props, context);
    this.handleFilterValueChange = this.handleFilterValueChange.bind(this);
    this.handleCellClick = this.handleCellClick.bind(this);
    this.handleRowSelection = this.handleRowSelection.bind(this);
    this.handlePreviousPageClick = this.handlePreviousPageClick.bind(this);
    this.handleNextPageClick = this.handleNextPageClick.bind(this);

    this.state = {
      data: TABLE_DATA,
      page: 1,
    };
  }

  handleFilterValueChange(value) {
    console.log('filter value: ' + value);
  }

  handleCellClick(rowIndex, columnIndex, row, column) {
    console.log('rowIndex: ' + rowIndex + ' columnIndex: ' + columnIndex);
  }

  handleCellDoubleClick(rowIndex, columnIndex, row, column) {
    console.log('rowIndex: ' + rowIndex + ' columnIndex: ' + columnIndex);
  }

  handleRowSelection(selectedRows) {
    console.log('selectedRows: ' + selectedRows);
  }

  handlePreviousPageClick() {
    console.log('handlePreviousPageClick');
    this.setState({
      data: TABLE_DATA,
      page: 1,
    });
  }

  handleNextPageClick() {
    console.log('handleNextPageClick');
    this.setState({
      data: TABLE_DATA_NEXT,
      page: 2,
    });
  }

  render() {
    return (
              <Card style={{marginTop: 20, marginRight:10}}>
                <DataTables
                  title={'Downloads'}
                  height={'auto'}
                  selectable={true}
                  showRowHover={true}
                  columns={TABLE_COLUMNS_TOOLTIP}
                  data={this.state.data}
                  page={this.state.page}
                  multiSelectable={true}
                  onCellClick={this.handleCellClick}
                  onNextPageClick={this.handleNextPageClick}
                  onPreviousPageClick={this.handlePreviousPageClick}
                  onRowSelection={this.handleRowSelection}
                  onFilterValueChange={this.handleFilterValueChange}
                  showHeaderToolbar={true}
                  showCheckboxes={true}
                  enableSelectAll={true}
                  showFooterToolbar={true}
                  count={12}                
                />
              </Card>
    );
  }
}