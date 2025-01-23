//import React from 'react';
import Sidebar from "../Sidebar/sidebar";
import Header from "../Header/header";
import Title from "./Title";
import RFIDAuthentication from "./RFIDAuthentication";

function AuthenticationPage() {
  return (
    <>
      <Sidebar />
      <Header />
      <Title />
      <RFIDAuthentication />

    </>
  )
}

export default AuthenticationPage
