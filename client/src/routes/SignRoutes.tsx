import { Switch, Route } from "react-router-dom";

import { Dashboard } from "../pages/Dashboard";
import { ViewCustomer } from "../pages/Customers/View";
import { EditCustomer } from "../pages/Customers/Edit";

function SignRoutes() {
  return (
    <Switch>
        <Route path="/" exact component={Dashboard} />
        <Route path="/view/:id" exact component={ViewCustomer} />
        <Route path="/edit/:id" exact component={EditCustomer} />
    </Switch>
  );
}

export { SignRoutes };
