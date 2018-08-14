import React from 'react';
import PropTypes from 'prop-types';
import ButtonElement from './ButtonElement';

const styles = {
  media: {
    width: '100%',
    height: '250px',
    // paddingTop: '56.25%', // 16:9
  },
  card: {
    width: '500px',
  },
};

export default class CardBody extends React.Component {

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
      <div className="card-body" style={styles.card} >

        <img style={styles.media} alt="Project icon" src={this.props.details.image} />

        <h2>{this.props.details.title}</h2>

        <p className="body-content">{this.props.details.text}</p>

        <ButtonElement label={'More'} backgroundColor={'#4FC3F7'} labelColor={'#fff'} labelPosition={'after'} click={`/project/${this.props.details.id}`} data={'hello'} />
      </div>
    );
  }
}
