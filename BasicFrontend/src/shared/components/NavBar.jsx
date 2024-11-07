import { Link } from "react-router-dom";
import logo from "../../assets/lale.png";
import { AuthContext } from "../state/context";
import { useContext } from "react";
import { useTranslation } from "react-i18next";
export function NavBar() {
  const authState = useContext(AuthContext);
  const onClickLogout = () => {
    authState.onLogoutSuccess();
  };
  function decodeToken(token) {
    // JWT üç bölümden oluşur: header, payload, signature
    const payloadBase64 = token.split(".")[1];

    // Base64 URL formatında olan token'ı çözme
    const payload = atob(payloadBase64.replace(/-/g, "+").replace(/_/g, "/"));

    // JSON formatındaki payload'u objeye çevirme
    return JSON.parse(payload);
  }

  function isTokenExpired(token) {
    try {
      const { exp } = decodeToken(token);
      // exp, saniye cinsindendir, bu yüzden milisaniyeye çevirmemiz gerekir
      return Date.now() >= exp * 1000;
    } catch (e) {
      return true;
    }
  }
  const { t, i18n } = useTranslation();
  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    localStorage.setItem("lng", lng);
  };
  return (
    <>
      <nav className="navbar navbar-expand bg-body-tertiary shadow-sm">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            <img src={logo} width={40}></img>
            Admin Panel
          </Link>
          <ul className="navbar-nav">
            {(!authState.token || isTokenExpired(authState.token)) && (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/signup">
                    {t("signUp")}
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/login">
                    {t("login")}
                  </Link>
                </li>
              </>
            )}
            {authState?.user?.id > 0 && !isTokenExpired(authState?.token) && (
              <>
                <li className="nav-item">
                  <Link
                    className="nav-link"
                    to={`/user/${authState?.user?.id}`}
                  >
                    My profile
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/home" onClick={onClickLogout}>
                    Logout
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/userlist">
                    User List
                  </Link>
                </li>
              </>
            )}
            <img
              role="button"
              src="https://flagcdn.com/24x18/tr.png"
              width="24"
              height="18"
              alt="Turkce"
              onClick={() => changeLanguage("tr")}
            ></img>
            <img
              role="button"
              src="https://flagcdn.com/24x18/us.png"
              width="24"
              height="18"
              alt="English"
              onClick={() => changeLanguage("en")}
            ></img>
          </ul>
        </div>
      </nav>
    </>
  );
}
