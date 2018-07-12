import React from 'react';
import ButtonElement from './ButtonElement';

const styles = {
  media: {
    width: '100%',
    // paddingTop: '56.25%', // 16:9
  },
  card : {
    width: '500px',
  }
};

export default class CardBody extends React.Component {

  render() {
    return (
      <div className="card-body" style={styles.card} >

        <img style={styles.media} alt="Project icon" src="https://images.pexels.com/photos/68147/waterfall-thac-dray-nur-buon-me-thuot-daklak-68147.jpeg?auto=compress&cs=tinysrgb&h=350" />

        <h2>{this.props.details.title}</h2>

        <p className="body-content">{this.props.details.text}</p>

        <ButtonElement label={'More'} backgroundColor={'#4FC3F7'} labelColor={'#fff'} labelPosition={'after'} click={'/project/' + this.props.details.id } />
      </div>
    );
  }
}
