import React from 'react';
import ReactDOM from 'react-dom/client';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import './index.css';

import HomePage from './landing_page/home/HomePage';
import SignUp from './landing_page/signup/Signup';
import AboutPage from './landing_page/about/AboutPage';
import ProductPage from './landing_page/products/ProductsPage';
import PricingPage from './landing_page/pricing/PricingPage';
import SupportPage from './landing_page/support/SupportPage';
import Navbar from './landing_page/Navbar';
import Footer from './landing_page/Footer';
import NotFound from './landing_page/NotFound';
import Chatbot from './components/Chatbot';
import Login from './landing_page/signup/Login';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
  <Navbar></Navbar>
    <Routes>
      <Route path="/" element={<><HomePage /><Chatbot/></>}></Route>
      <Route path="/signup" element={<SignUp />}></Route>
      {/* <Route path="/about" element={<AboutPage />}></Route> */}
      <Route path="/product" element={<><ProductPage /><Chatbot/></>}></Route>
      <Route path="/pricing" element={<><PricingPage /><Chatbot/></>}></Route>
      <Route path="/support" element={<><SupportPage /><Chatbot/></>}></Route>
      <Route path='/login' element={<><Login /></>}></Route>
      <Route path="*" element={<NotFound />}></Route>
    </Routes>
    <Footer></Footer>
  </BrowserRouter>
);

