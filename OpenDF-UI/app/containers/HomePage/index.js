/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 *
 * NOTE: while this component should technically be a stateless functional
 * component (SFC), hot reloading does not currently support SFCs. If hot
 * reloading is not a necessity for you then you can refactor it and remove
 * the linting exception.
 */

import React from 'react';
import { FormattedMessage } from 'react-intl';
import messages from './messages';
import ButtonElement from '../../components/ButtonElement';
import PostsData from '../../data.js';
import { Grid, Row, Col } from 'react-flexbox-grid';


export default class HomePage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function

   constructor() {
     super();

     this.state = {
       posts: {}
     }
   }
   componentWillMount() {
     this.setState({
       posts: PostsData
     });
   }

  render() {
    return (
      <div>
        <Grid fluid>
          <Row>
            <Col xs={6} md={6}>
              <h1>
                <FormattedMessage {...messages.header} />
              </h1>
              <div>
                <ButtonElement label={"Add Project"} backgroundColor={'#4CAF50'} labelColor={'#fff'} labelPosition={'after'} click={'addproject'}/>
              </div>
            </Col>
          </Row>
          <Row>
            <Col>
              <header className="app-header"></header>
              <div className="app-card-list" id="app-card-list">
                {
                  Object
                  .keys(this.state.posts)
                  .map(key => <Card key={key} index={key} details={this.state.posts[key]}/>)
                }
            </div>
            </Col>
          </Row>
        </Grid>
      </div>

    );
  }
}
