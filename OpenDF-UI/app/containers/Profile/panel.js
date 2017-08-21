/*
 * Profile Messages
 *
 * This contains all the text for the Profile component.
 */
// import { defineMessages } from 'react-intl';
import React from 'react';
import {Avatar} from './avatar';


export class MainPanel extends React.Component {
  render() {
    var info = this.props.info;
    if (!info) return null;

    return (
     <div>
        <div className="top">
            <Avatar
               image={info.photo}
               width={100}
               height={100}
            />
            <h2>{info.name}</h2>
            <h3>{info.location}</h3>

          <hr />
            <p>{info.gender} | {info.birthday}</p>
        </div>

        <div className="bottom">
          <h4>Biography</h4>
          <p>{info.bio}</p>
        </div>
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
