import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom';
import {Provider} from 'react-redux';
import store from './store';
import "bootstrap"; // Bootstrap JS závislosti

// Styles
import 'font-awesome/css/font-awesome.min.css';
import './scss/main.scss'
import Layout from "./pages/Layout";


ReactDOM.render((
    <Provider store={store}>
        <BrowserRouter basename={serverContextPath}>
            <Layout />
        </BrowserRouter>
    </Provider>
), document.getElementById('root'));
