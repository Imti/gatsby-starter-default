import React from "react"
import { Router } from "@reach/router"
import Layout from "../components/layout"
import NavBar from "./components/navbar"
import Profile from "./profile"
import Main from "./main"
import Implementations from "./implementations"
import PrivateRoute from "./components/privateroute.js"
import Login from "./login"

const App = () => {
  return (
    <Layout>
      <NavBar />
      <Router>
        <PrivateRoute path="/app/profile" component={Profile} />
        <PrivateRoute path="/app/implementations" component={Implementations} />
        <PublicRoute path="/app">
          <PrivateRoute path="/" component={Main} />
          <Login path="/login" />
        </PublicRoute>
      </Router>
    </Layout>
  )
}
function PublicRoute(props) {
  return <div>{props.children}</div>
}

export default App