import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import Export from './Export'
import DriveAuth from './DriveAuth'
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from "react-router-dom";
import { Provider } from 'react-redux';
import { applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'
import rootReducer from "./redux/reducer/rootReducer";
import { BrowserRouter as Router, Routes, Route }
  from 'react-router-dom';

import { legacy_createStore as createStore } from 'redux';
const middlewares = [thunk]
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
// const Store = createStore(rootReducer)

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(...middlewares)))


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <Provider store={store}>
    <Router>
      <Routes>
        <Route path='/' element={<App />} />
        <Route path='/export' element={<Export />} />
        <Route path='/auth' element={<DriveAuth />} />
      </Routes>
    </Router>
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
