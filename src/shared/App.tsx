import React from 'react';
import { MemoryRouter, HashRouter, Switch, Route, Redirect } from 'react-router-dom';
import HelpCenter from './routes/hc';
import AgentConsole from 'routes/agent';

const MyRouter = ({ children }: { children: any }) => {
  if (__BROWSER__) {
    // return <HashRouter hashType="slash">{children}</HashRouter>;
    // return <BrowserRouter>{children}</BrowserRouter>;
    return <HashRouter>{children}</HashRouter>;
  } else {
    return <MemoryRouter>{children}</MemoryRouter>;
  }
};

function App() {
  return (
    <React.Fragment>
      <MyRouter>
        <Switch>
          <Route path="/agent" component={AgentConsole} />
          <Route path="/hc" component={HelpCenter} />
          <Redirect to="/agent" />
        </Switch>
      </MyRouter>
    </React.Fragment>
  );
}

export default App;
