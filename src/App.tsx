import React from "react";
import { Switch, Route } from "react-router-dom";
import { Wrapper } from "./layout/Wrapper";
import { Home } from "./pages/Home";
import { NewFlight } from "./pages/NewFlight";
import { About } from "./pages/About";
import { NotFound } from "./pages/NotFound";

function App() {
  return (
    <Wrapper>
      <Switch>
        <Route path="/new-flight">
          <NewFlight />
        </Route>
        <Route path="/about">
          <About />
        </Route>
        <Route path="/" exact>
          <Home />
        </Route>
        <Route path="*">
          <NotFound />
        </Route>
      </Switch>
    </Wrapper>
  );
}

export default App;
