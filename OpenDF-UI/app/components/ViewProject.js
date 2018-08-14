import React from 'react';
import PropTypes from 'prop-types';
import CardBody from './CardBody';

export class Card extends React.Component {

  static get propTypes() {
    return {
      details: PropTypes.object,
    };
  }

  constructor(props) {
    super(props);
    this.props = props;
  }

  render() {
    return (
      <article className="card">
        <CardBody details={this.props.details} />
      </article>
    );
  }
}
