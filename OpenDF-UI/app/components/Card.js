import React from 'react';
import CardBody from './CardBody';

export class Card extends React.Component {
  render() {
    return (
      <article className="card">
        <CardBody title={this.props.details.title} text={this.props.details.text}/>
      </article>
    )
  }
}
