import { Switch, Route } from "react-router-dom";

import { Dashboard } from "../pages/Dashboard";
import { ViewCustomer } from "../pages/Customers/View";
import { EditCustomer } from "../pages/Customers/Edit";
import { CreateCustomer } from "../pages/Customers/Create";

function SignRoutes() {
  return (
    <Switch>
        <Route path="/" exact component={Dashboard} />
        <Route path="/view/:id" exact component={ViewCustomer} />
        <Route path="/edit/:id" exact component={EditCustomer} />
        <Route path="/create" exact component={CreateCustomer} />
    </Switch>
  );
}

export { SignRoutes };
