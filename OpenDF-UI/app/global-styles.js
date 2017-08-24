import { injectGlobal } from 'styled-components';

/* eslint no-unused-expressions: 0 */
injectGlobal`
  html,
  body {
    height: 100%;
    width: 100%;
  }

  body {
    font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
  }

  body.fontLoaded {
    font-family: 'Open Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif;
  }

  #app {
    background-color: #fafafa;
    min-height: 100%;
    min-width: 100%;
  }

  p,
  label {
    font-family: Georgia, Times, 'Times New Roman', serif;
    line-height: 1.5em;
  }

  #user-profile {
    width: 100%;
    max-width: 450px;
    margin: 70px auto;
    border-radius: 5px;
    text-align: center;
    overflow: hidden;
    box-shadow: 2px 2px 5px #000;
    border: 1px solid #000;
    @include dotBg(darken($green, 5%), $green, 30px);

    hr {
        margin: 20px auto;
        width: 50px;
        border: 1px solid $magenta;
        background-color: transparent;
      }

    h1, h2, h3, h4, h5, h6, p {
        margin: 0;
      }

      h2 {
        font-size: 30px;
      }

      h3 {
        font-size: 18px;
      }

      h4 {
        font-size: 16px;

      }

      p {
        font-size: 14px;
      }

      .top, .bottom {
        padding: 30px;

      }

      .bottom {

        background-color: rgba(white, 0.3);
        text-align: left;
      }

      .avatar {
        border-radius: 50%;
        overflow: hidden;
        display: inline-flex;
        margin-bottom: 15px;
        border: 1px solid #000;
        img {
          width: 100%;
        }
      }
  }

.app-card-list {
     display:inline-block;
     width:100%;
     float:right;
     margin:0;
     min-height: 75vh;
     white-space:normal;
     overflow-x: scroll;
     margin-top:-70px;

     &::-webkit-scrollbar {
       display: none;
     }

     @media(min-width:768px) {
         margin-top: 0;
     }

     .card {
       margin: 60px 30px;
       display: inline-block;
       box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);

       .card-body {
           white-space: normal;
           padding: 5%;
       }
     }
   }

   .designer-link {
     display:inline-block;
     padding-top:40px;
   }
`;
