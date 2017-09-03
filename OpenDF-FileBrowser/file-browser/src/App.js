import React, { Component } from 'react';
import RaisedButton from 'material-ui/RaisedButton';// eslint-disable-next-line
import Dialog from 'material-ui/Dialog';// eslint-disable-next-line
import {deepOrange500} from 'material-ui/styles/colors';
import FlatButton from 'material-ui/FlatButton';// eslint-disable-next-line
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import MenuItem from 'material-ui/MenuItem';// eslint-disable-next-line
import {Card, CardHeader} from 'material-ui/Card';// eslint-disable-next-line
import IconButton from 'material-ui/IconButton';// eslint-disable-next-line
import DataTables from './DataTables.js';


const styles = {
  container: {
    textAlign: 'center',
  },
  component: {
    margin: '60px 20px',
  },
  titleStyle: {
    fontSize: 16,
    color: deepOrange500,
  },
  footerToolbarStyle: {
    padding: '0 100px',
  },
  tableStyle: {
    tableLayout: 'auto',
  },
  tableBodyStyle: {
    overflowX: 'auto',
  },
  tableWrapperStyle: {
    padding: 5,
  },
};

const muiTheme = getMuiTheme({
  palette: {
    accent1Color: deepOrange500,
  },
});


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

class App extends Component {
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
      <MuiThemeProvider muiTheme={muiTheme}>
        <div style={styles.container}>
          <div style={styles.component}>
            
            <Card style={{margin: 12, textAlign: 'left'}}>
              <DataTables
                title={'Disk image 01'}
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
          </div>
        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
