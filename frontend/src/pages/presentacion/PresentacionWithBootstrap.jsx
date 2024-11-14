import React from 'react';
import { Helmet } from 'react-helmet';
import PresentacionPage from './PresentacionPage';

const PresentacionWithBootstrap = () => (
  <>
    <Helmet>
    <link rel="stylesheet" type="text/css" href="./public/css/bootstrap.css" /> 
    <link rel="stylesheet" type="text/css" href="./public/css/style.css" />
    </Helmet>
    <PresentacionPage />
  </>
);

export default PresentacionWithBootstrap;
