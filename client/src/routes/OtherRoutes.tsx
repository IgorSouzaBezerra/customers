import { Switch, Route } from 'react-router-dom';
import { LoginPage } from '../pages/Login';


export function OtherRoutes() {
 return (
   <Switch>
     <Route path="/" component={LoginPage} />
   </Switch>
 );
};
