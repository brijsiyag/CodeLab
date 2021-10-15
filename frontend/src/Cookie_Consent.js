import React from "react";
import CookieConsent from "react-cookie-consent";

const Cookie_Consent = () => {
  return (
    <CookieConsent
      location="bottom"
      buttonText="Okay"
      cookieName="auth"
      style={{ background: "#2B373B" }}
      buttonStyle={{ color: "#4e503b", fontSize: "13px" }}
      expires={150}
    >
      We use cookies to improve your experience and for analytical purposes.
      Read our <b>Privacy Policy</b> and <b>Terms</b> to know more.{" "}
      <span style={{ fontSize: "10px" }}>
        You consent to our cookies if you continue to use our website.
      </span>
    </CookieConsent>
  );
};

export default Cookie_Consent;
