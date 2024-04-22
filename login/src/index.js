import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { BrowserRouter,Routes,Route} from "react-router-dom";
import {App} from './App';
import {Dashboard} from './Dashboard';
import { Calculator } from './Calculator';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
  <Routes>
    <Route path ="/" element={<App />} />
    <Route path ="sub" element={<Dashboard />}/>
    <Route path ="Calculator" element={<Calculator/>}/>
  </Routes>
</BrowserRouter>
);


