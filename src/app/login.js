import React, { useEffect } from "react"
import { navigate } from "gatsby"

import { useIdentityContext, IdentityModal, } from "react-netlify-identity-widget"
import "react-netlify-identity-widget/styles.css" // delete if you want to bring your own CSS

function Login() {
  const [dialog, setDialog] = React.useState(false)
  const { isLoggedIn } = useIdentityContext();

  useEffect(() => {
    console.log('isLoggedIN', isLoggedIn);

    if (isLoggedIn) {
      navigate(`/app/dashboard`)
    }
  }, []);

  return (
    <>
      <h1>Log in</h1>
      <button onClick={() => setDialog(true)}>log in</button>

      <IdentityModal
        showDialog={dialog}
        onCloseDialog={() => setDialog(false)}
        onLogin={user => navigate("/app/dashboard")}
        onSignup={user => navigate("/app/dashboard")}
      />
    </>
  )
}

export default Login