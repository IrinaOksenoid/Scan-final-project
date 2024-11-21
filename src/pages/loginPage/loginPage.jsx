import React from 'react';
import {Header, Footer} from '../../components/common'; 
import {AuthHeader, LoginForm} from '../../components/LoginPage';
import './LoginPage.css';

function LoginPage() {
  return (
    <div className="login-page">
      <Header />
      <div className="login-page__content">
        <AuthHeader />
        <LoginForm />
      </div>
      <Footer />
    </div>
  );
}

export default LoginPage;
