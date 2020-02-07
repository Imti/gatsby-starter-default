import React from "react"
import { Router } from "@reach/router"
import Layout from "../components/layout"
import Implementations from "./implementations"
import PrivateRoute from "./components/privateroute.js"
import Login from "./login"

const App = () => {
  return (
    <Layout>
      <Router>
        <PrivateRoute path="/app/implementations" component={Implementations} />
        <PublicRoute path="/app">
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