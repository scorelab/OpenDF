import React from 'react';
import ReactDOM from 'react-dom';
import FileBrowser from './FileBrowser';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<FileBrowser />, div);
});
