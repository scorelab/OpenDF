/*
 * Profile Messages
 *
 * This contains all the text for the Profile component.
 */
// import { defineMessages } from 'react-intl';
import React from 'react';

export class Avatar extends React.Component {
  render() {
    var image = this.props.image,
        style = {
          width: this.props.width || 50,
          height: this.props.height || 50
        };

    if (!image) return null;

    return (
     <div className="avatar" style={style}>
           <img src={this.props.image} />
      </div>
    );
  }
}

// export default defineMessages({
//   header: {
//     id: 'app.containers.Profile.header',
//     defaultMessage: 'This is Profile Your File !',
//   },
// });
