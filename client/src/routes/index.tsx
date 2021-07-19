import { Switch, Route } from "react-router-dom";

import { Main } from "../pages";
import { CreateCustomer } from "../pages/CreateCustomer";
import { ViewCustomer } from "../pages/ViewCustomer";

function Routes() {
  return (
    <Switch>
        <Route path="/" exact component={Main} />
        <Route path="/create" exact component={CreateCustomer} />
        <Route path="/view/:id" exact component={ViewCustomer} />
    </Switch>
  );
}

export { Routes };
