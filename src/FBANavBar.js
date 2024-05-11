import { NavLink } from "react-router-dom";
import React, { useEffect, useState, useContext, useRef } from "react";
import { AuthContext } from "./Context/AuthContext";
import {GoogleButton} from "react-google-button"


function NavBar() {
  const [showMenu, setShowMenu] = useState({
    show: false,
    section: ""
  })

  const [showMobileMenu, setShowMobileMenu] = useState(false)
  const [showForgot, setShowForgot] = useState(false)
  const [forgotEmail, setForgotEmail] = useState("")

  const {
    signup,
    login,
    logout,
    getUser,
    signUpCred,
    setSignUpCred,
    resetSignUpCred,
    loginCred,
    setLoginCred,
    resetLoginCred,
    signUpError,
    setSignUpError,
    loginError,
    setLoginError,
    passwordCon,
    setPasswordCon,
    showSignUpModal,
    setShowSignUpModal,
    showLoginModal,
    setShowLoginModal,
    viewPass,
    setViewPass,
    account,
    googleSignIn,
    googleSignInMobile,
    forgotPassword
  } = useContext(AuthContext)

  const navbar = useRef(null)
  useOutsideAlerter(navbar);

  const handleShowMenu = (show, section) => {
    console.log("dog")
    console.log(showMenu)
    setShowMenu({
      show: show,
      section: section
    })
    console.log("cat")
  }

  useEffect(() => {
    getUser()
    console.log(account)
  },[]);

  const handleShowLoginModal = (event) => {
    if (!showLoginModal){
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    setShowLoginModal(!showLoginModal)
    if (showLoginModal === false) {
      resetLoginCred()
    }
    setShowSignUpModal(false)
    setSignUpError("")
    setLoginError("")
    setViewPass(false)
    resetSignUpCred()
    setShowMobileMenu(false)
  }

  const handleShowSignUpModal = async (event) => {
    if (!showSignUpModal){
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    setShowSignUpModal(!showSignUpModal)
    if (showSignUpModal === false) {
      resetSignUpCred()
    }
    setShowLoginModal(false)
    setSignUpError("")
    setLoginError("")
    setViewPass(false)
    resetLoginCred()
    setShowMobileMenu(false)
  }

  const handleSignUpCredChange = (event) => {
      setSignUpCred({ ...signUpCred, [event.target.name]: event.target.value });
      // setLoginCred({...loginCred, [event.target.name]: event.target.value})
  };

  const handlePasswordConChange = (event) => {
      setPasswordCon(event.target.value);
  };

  const handleLoginCredChange = (event) => {
    setLoginCred({ ...loginCred, [event.target.name]: event.target.value });
  };

  const handleForgotEmail = (event) => {
    setForgotEmail(event.target.value);
  };

  const handleViewPass = (event) => {
    const pass = document.getElementById("pass");
    const passConf = document.getElementById("passConf");
    if (pass.type === "password") {
      pass.type = "text";
      setViewPass(true)
    } else {
      pass.type = "password";
      setViewPass(false)
    }
    if (passConf.type === "password") {
      passConf.type = "text";
      setViewPass(true)
    } else {
      passConf.type = "password";
      setViewPass(false)
    }
  };

  const handleGoogleSignIn = async () => {
    handleShowLoginModal()
    try {
      await googleSignIn()
    } catch (error) {
      console.log(error)
    }
  }

  const handleGoogleSignInMobile = async () => {
    try {
      await googleSignInMobile()
    } catch (error) {
      console.log(error)
    }
  }

  const handleSendPasswordReset = (event, email) => {
    event.preventDefault()
    forgotPassword(email)
    handleShowLoginModal()
  }

  function useOutsideAlerter(ref) {
    useEffect(() => {
      // Function for click event
      function handleOutsideClick(event) {
        if (ref.current && !ref.current.contains(event.target)) {
          handleShowMenu(false, "none");
        }
      }
      // Adding click event listener
      document.addEventListener("click", handleOutsideClick);
      return () => document.removeEventListener("click", handleOutsideClick);
    }, [ref]);
  }

  const followLink = () => {
    handleShowMenu(false, "none")
  }

  const handleShowMobileMenu = () => {
    setShowMobileMenu(!showMobileMenu)
    handleShowMenu(false, "none")
  }

  const handleShowForgot = () => {
    if (showForgot) {
      setShowForgot(false)
      setForgotEmail("")
      setLoginError([])
    } else {
      setShowForgot(true)
      setLoginError([])
    }
  }

  const handleClickBrand = () => {
    setShowMobileMenu(false)
    handleShowMenu(false, "none")
  }

  return (
    <nav className="navbar topbar" ref={navbar}>
      <div className="nav-main">
        <span className="flex">

          <NavLink className="navbar-brand2 navbar-select" to="/"
              onClick={() => handleClickBrand()}>
              Cyber Sleuth Partner
          </NavLink>

          <div className="nav-main">
            <ul className="media-navbar-menu none">
              <li className="nav-item">
                <div className={ showMenu.show && showMenu.section === "partners"?
                  "navbar-selected pointer": "navbar-select pointer"}
                  onClick={() => handleShowMenu(true, "partners")}>
                  <h5 className="navbar-menu-item">
                    Partners
                  </h5>
                </div>
                { showMenu.show && showMenu.section === "partners"?
                <div className="nav-dropdown-content">
                  <NavLink className="dropdown-select" to="/partners" onClick={() => followLink()}>
                    <div className="nav-dropdown-item">
                      Partner Search
                    </div>
                  </NavLink>
                  <NavLink className="dropdown-select" to="/partnercreate" onClick={() => followLink()}>
                    <div className="nav-dropdown-item">
                      Partner Create
                    </div>
                  </NavLink>
                </div>: null
                }
              </li>
              <li className="nav-item">
                <div className={ showMenu.show && showMenu.section === "digimon"?
                  "navbar-selected pointer": "navbar-select pointer"}
                  onClick={() => handleShowMenu(true, "digimon")}>
                  <h5 className="navbar-menu-item">
                    Digimon
                  </h5>
                </div>
                { showMenu.show && showMenu.section === "digimon"?
                  <div className="nav-dropdown-content">
                    <NavLink className="dropdown-select username2" to="/digilist" onClick={() => followLink()}>
                      <div className="nav-dropdown-item">
                        Digimon Search
                      </div>
                    </NavLink>
                  </div>:null
                  }
              </li>
            </ul>

          </div>

        </span>
        <div className="none media-flex">
          { !account?
            <div className="accountbuttons">
              <div className="navbar-select pointer"
                onClick={() => handleShowLoginModal()}>
                <h5 className="navbar-menu-item">
                  Login
                </h5>
              </div>
              <div className="navbar-select pointer"
                onClick={() => handleShowSignUpModal()}>
                <h5 className="navbar-menu-item">
                  Signup
                </h5>
              </div>
            </div>
              :
            <div className="accountbuttons">
              <NavLink className="username2" to="/account">
                <div className="navbar-select pointer">
                  <h5 className="navbar-menu-item">
                    {account.username}
                  </h5>
                </div>
              </NavLink>
              <div className="navbar-select pointer" onClick={() => logout()}>
                <h5 className="navbar-menu-item">
                  Logout
                </h5>
              </div>
            </div>
          }
        </div>
        <img className="threebars media-none"
            onClick={() => handleShowMobileMenu()}
            src="https://i.imgur.com/Q1Y2vV9.png"
            alt="menu"/>
      </div>
      <ul className={showMobileMenu? "navbar-menu media-none maximize": "navbar-menu media-none minimize"}>
        <li className="nav-item">
          <div className={ showMenu.show && showMenu.section === "partners"?
            "navbar-selected pointer": "navbar-select pointer"}
            onClick={() => handleShowMenu(true, "partners")}
            >
            <h5 className="navbar-menu-item">
              Partners
            </h5>
          </div>
          { showMenu.show && showMenu.section === "partners"?
          <div className="nav-dropdown-content">
            <NavLink className="nav-dropdown-item" to="/partners" onClick={() => handleShowMobileMenu()}>
              <div className="dropdown-select">
                  Partner Search
              </div>
            </NavLink>
            <NavLink className="nav-dropdown-item" to="/partnercreate" onClick={() => handleShowMobileMenu()}>
              <div className="dropdown-select">
                Partner Create
              </div>
            </NavLink>
          </div>: null
          }
        </li>
        <li className="nav-item">
          <div className={ showMenu.show && showMenu.section === "digimon"?
            "navbar-selected pointer": "navbar-select pointer"}
            onClick={() => handleShowMenu(true, "digimon")}
            >
            <h5 className="navbar-menu-item">
              Digimon
            </h5>
          </div>
          { showMenu.show && showMenu.section === "digimon"?
            <div className="nav-dropdown-content">
              <NavLink className="nav-dropdown-item" to="/digilist" onClick={() => handleShowMobileMenu()}>
                <div className="dropdown-select">
                  Digimon Search
                </div>
              </NavLink>
            </div>:null
          }
        </li>
        { !account?
          <li className="flex media-none">
            <div className="navbar-select2 pointer"
              onClick={() => handleShowLoginModal()}>
              <h5 className="navbar-menu-item">
                Login
              </h5>
            </div>
            <div className="navbar-select2 pointer"
              onClick={() => handleShowSignUpModal()}>
              <h5 className="navbar-menu-item">
                Signup
              </h5>
            </div>
          </li>
          :
          <li className="flex">
            <NavLink className="username2" to="/account" onClick={() => handleShowMobileMenu()}>
              <div className="navbar-select2 pointer">
                <h5 className="navbar-menu-item ellipsis2">
                  {account.username}
                </h5>
              </div>
            </NavLink>
            <div className="navbar-select2 pointer"
              onClick={() => logout()}
              >
              <h5 className="navbar-menu-item">
                Logout
              </h5>
            </div>
          </li>
        }
      </ul>
      { showSignUpModal?
        <>
          <form onSubmit={(event) => signup(event, handleShowSignUpModal)}
            className="medium-modal">
            <h2 className="login-label-center">Create Account </h2>
            <span className="flex-content">
              <div className="login" style={{ margin: "20px 20px 20px 20px"}}>

                <h5 className="login-label">Email </h5>
                <input
                    className="login-input"
                    type="text"
                    placeholder=" Email"
                    onChange={handleSignUpCredChange}
                    name="email"
                    value={signUpCred.email}>
                </input>

                <h5 className="login-label">Username </h5>
                <input
                    className="login-input"
                    type="text"
                    placeholder=" Username"
                    onChange={handleSignUpCredChange}
                    name="username"
                    value={signUpCred.username}>
                </input>

                <h5 className="login-label">Password </h5>
                <input
                    className="login-input"
                    id="pass"
                    type="password"
                    placeholder=" Password"
                    onChange={handleSignUpCredChange}
                    name="password"
                    value={signUpCred.password}>
                </input>

                { !viewPass?
                  <img
                    className="pass-eye pointer"
                    src="https://i.imgur.com/z4CRxAm.png"
                    onClick={handleViewPass}
                    title="view password"
                  />:
                  <img
                    className="pass-eye pointer"
                    src="https://i.imgur.com/NE539ZZ.png"
                    onClick={handleViewPass}
                    title="hide password"
                  />
                }

                <h5 className="login-label">Confirm Password </h5>
                <input
                    className="login-input"
                    id="passConf"
                    type="password"
                    placeholder=" Confirm Password"
                    onChange={handlePasswordConChange}
                    value={passwordCon}>
                </input>

                { !viewPass?
                  <img
                    className="pass-eye pointer"
                    src="https://i.imgur.com/z4CRxAm.png"
                    onClick={handleViewPass}
                    title="view password"
                  />:
                  <img
                    className="pass-eye pointer"
                    src="https://i.imgur.com/NE539ZZ.png"
                    onClick={handleViewPass}
                    title="hide password"
                  />
                }
              </div>
            </span>
            <div style={{margin: "20px 0px 20px 0px"}}>
              { signUpError? (
                signUpError.map((error) =>
                  (
                    <>
                      <p className="error">{error}</p>
                    </>
                  ))): null
                }
            </div>

            <div className="aligned">
              <button className="front-button" type="submit">Signup</button>
              <button className="end-button" onClick={handleShowSignUpModal}>Close</button>
              <p onClick={handleShowLoginModal}
                className="pointer login-label-center2">
                  Already have an account? Log in!
              </p>
            </div>
          </form>
          <div className="blackSpace"></div>
        </>:
        null
      }
      { showLoginModal?
        <>
          {!showForgot?
            <>
              <form onSubmit={(event) => login(event, handleShowLoginModal)}
                className="medium-modal">
                <h2 className="login-label-center">User Login </h2>
                <span className="flex-content">
                  <div className="login">
                    <h5 className="login-label">Email </h5>
                    <input
                        className="login-input"
                        type="text"
                        placeholder=" Email"
                        onChange={handleLoginCredChange}
                        name="email"
                        value={loginCred.email}>
                    </input>

                    <h5 className="login-label">Password </h5>
                    <input
                        className="login-input"
                        id="pass"
                        type="password"
                        placeholder=" Password"
                        onChange={handleLoginCredChange}
                        name="password"
                        value={loginCred.password}>
                    </input>

                    { !viewPass?
                      <img
                        className="pass-eye pointer"
                        src="https://i.imgur.com/z4CRxAm.png"
                        onClick={handleViewPass}
                        title="view password"
                      />:
                      <img
                        className="pass-eye pointer"
                        src="https://i.imgur.com/NE539ZZ.png"
                        onClick={handleViewPass}
                        title="hide password"
                      />
                    }

                    { loginError?
                      <p className="error">{loginError}</p>:
                      null
                    }

                  </div>
                </span>
                <div className="aligned">
                  <button className="front-button" type="submit">Login</button>
                  <button className="end-button" onClick={handleShowLoginModal}>Close</button>
                  <div className="google-button flex-full none media-flex">
                    <GoogleButton onClick={() => handleGoogleSignIn(handleShowLoginModal)}/>
                  </div>
                  <div className="google-button flex-full media-none">
                    <GoogleButton onClick={() => handleGoogleSignInMobile(handleShowLoginModal)}/>
                  </div>
                  <p onClick={handleShowSignUpModal}
                    className="pointer login-label-center2">
                      New here? Sign Up!
                  </p>
                  <p onClick={handleShowForgot}
                    className="pointer login-label-center2">
                      Forgot Password?
                  </p>
                </div>
              </form>
              <div className="blackSpace"></div>
            </>:
            <>
              <form onSubmit={(event) => handleSendPasswordReset(event, forgotEmail)}
                className="medium-modal">
                <h2 className="login-label-center">Password Reset </h2>
                <span className="flex-content">
                  <div className="login">
                    <h5 className="login-label">Account Email </h5>
                    <input
                        className="login-input"
                        type="text"
                        placeholder=" Account Email"
                        onChange={handleForgotEmail}
                        name="email"
                        value={forgotEmail}>
                    </input>
                  </div>
                </span>
                <div className="aligned margin-bottom-20">
                  <button className="front-button" type="submit">Send An Email</button>
                  <button className="end-button" onClick={handleShowForgot}>Cancel</button>
                </div>
              </form>
              <div className="blackSpace"></div>
            </>
          }
        </>:null
      }
    </nav>
  );
}

export default NavBar;
