import React from "react";
import { createRootNavigator } from "./router";

export default class App extends React.Component {
  constructor(props) {
    super(props);

  }

  render() {

    const Layout = createRootNavigator();
    return <Layout />;
  }
}
