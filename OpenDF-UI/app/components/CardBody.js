import React from 'react';
import Button from './Button';

export default class CardBody extends React.Component {

  render() {
    return (
      <div className="card-body">

        <h2>{this.props.title}</h2>

        <p className="body-content">{this.props.text}</p>

        <Button />
      </div>
    )
  }
}
