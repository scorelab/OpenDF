import React from 'react';
import ButtonElement from './ButtonElement';

export default class CardBody extends React.Component {

  render() {
    return (
      <div className="card-body">

        <h2>{this.props.title}</h2>

        <p className="body-content">{this.props.text}</p>

        <ButtonElement label={"More"} backgroundColor={'#4FC3F7'} labelColor={'#fff'} labelPosition={'after'} />
      </div>
    )
  }
}
