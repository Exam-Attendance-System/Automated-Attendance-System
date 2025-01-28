//import React from 'react';
import Sidebar from "../Sidebar/sidebar";
import Header from "../Header/header";
import QRAuthentication from "./QRAuthentication";
import StyloxSignature from "../Stylox/stylox";

function AuthenticationPage() {
  return (
    <>
      <Sidebar />
      <Header />
      <QRAuthentication />
      <StyloxSignature/>

    </>
  )
}

export default AuthenticationPage
