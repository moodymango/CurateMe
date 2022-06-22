/**
 * ************************************
 *
 * @module  index.js
 * @author
 * @date
 * @description entry point for application. Hangs React app off of #contents in index.html
 *
 * ************************************
 */

 import React from 'react';
 import { render } from 'react-dom';
 import { ReactDOM } from 'react';
 import App from './App.jsx';
 
 //import any styling for the app here
//  import styles from './scss/application.scss';

 render(
     <App />,
   document.getElementById('root')
 );