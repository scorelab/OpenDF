import React from 'react';
import CardBody from './CardBody';

export class Card extends React.Component {
  render() {
    return (
      <article className="card">
        <CardBody details={this.props.details} />
      </article>
    )
  }
}
