import "./FourOFour.css";
import { HelmetProvider, Helmet } from "react-helmet-async";

export default function FourOFour({ loggedIn }) {
  return (
    <div className="error-page">
      <HelmetProvider>
        <Helmet>
          <title>Worth a Shot | Not Found</title>
        </Helmet>
      </HelmetProvider>
      <div className="error-headings">
        <h1 className="error-title">404: Bar's closed.</h1>
        <h2 className="error-tagline">
          You don't have to go home, but you can't stay here.
        </h2>
      </div>
      <div className="error-grid">
        <div className="error-image">
          <a href="/">
            <img alt="Error" className="closed-bar" src="/images/error.jpg" />
          </a>
        </div>
        <div className="error-text">
          <p>
            The page you are looking for might have been removed, had its named
            changed, or is temporarily unavailable.
          </p>
          {loggedIn ? (
            <p>
              <a href="/myhome">Click here</a> to go back home.
            </p>
          ) : (
            <p>
              <a href="/">Click here</a> to go back home.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
