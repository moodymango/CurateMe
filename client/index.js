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
 import {createRoot} from 'react-dom/client'
 import { render } from 'react-dom';
 import { BrowserRouter} from 'react-router-dom';
//  import { ReactDOM } from 'react';
// import { BrowserRouter } from 'react-router-dom';
 import App from './App.jsx';
 
 //import any styling for the app here
 import './css/app.css';

 const container = document.getElementById('root');
 const root = createRoot(container);

 root.render(
     <App/ >
  );

// render(
//          <App/ >,
//    document.getElementById('root')
//  );

// import ReactDOM from "react-dom/client";
// import {
//   BrowserRouter,
//   Routes,
//   Route,
// } from "react-router-dom";
// import Homepage from './components/homepage.jsx'

// const root = ReactDOM.createRoot(
//       document.getElementById("root")
//     );
//     root.render(
//       <BrowserRouter>
//           <Route path="/" element={<App />} />
//           <Route path="/home" element={<Homepage />} />
//   </BrowserRouter>
// );