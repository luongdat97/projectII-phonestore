import React from "react";
import MainLayout from "./containers/MainLayout";
import Home from "./pages/Home";
import Login from "./pages/Login";
import PhoneDetail from "./pages/PhoneDetail";
import appRoute from "./pages/routes";
import Cart from './pages/Cart';
import ReceiveMethod from './pages/ReceiveMethod';
import ShoppingResult from './pages/ShoppingResult';
import RegisterForm from './pages/RegisterForm';
import InvoiceManagement from './pages/EmployeePage/InvoiceManage';
import OrderManagement from './pages/EmployeePage/OrderManage';
import AccountManagement from './pages/AdminPage/accountManage';
import ProductManagement from './pages/ManagerPage/ProductManage';
import ProductImport from './pages/ManagerPage/ProductImport';
import Statistical from './pages/ManagerPage/Statistical';
import HistoryOrder from './pages/HistoryOrder';
import AccountInfo from './pages/AccountInfo';
import AccountChangePass from './pages/AccountChangePass';
import { CookiesProvider } from 'react-cookie';
import {ProvideAuth, PrivateRoute} from './services/authenticate'
import {ConfigProvider} from 'antd'
import moment from 'moment';
import 'moment/locale/vi';
import locale from 'antd/lib/locale/vi_VN';
import {
  BrowserRouter,
  Switch,
  Route,
  Link,
  Redirect,
  useHistory,
  useLocation
} from "react-router-dom";

const App = () => {
  return (
    <CookiesProvider>
      <ProvideAuth>
      <ConfigProvider locale={locale}>
        <BrowserRouter>
            <Switch>
              <Route exact path="/login" component={Login} />
              <Route exact path="/" component={Home} />
              <Route path="/phone-detail/:id" component={PhoneDetail} />
              <Route path="/cart" component={Cart}/>
              <Route path="/receive-method" component={ReceiveMethod} />
              <Route path="/shopping-result" component={ShoppingResult} />
              <Route path="/register" component={RegisterForm} ></Route>
              <Route path="/account/info" component={AccountInfo} ></Route>
              <Route path="/account/change-pass" component={AccountChangePass} ></Route>
              <PrivateRoute role="employee" path="/invoice-management"><InvoiceManagement/></PrivateRoute>
              <PrivateRoute role="employee" path="/order-management"><OrderManagement/></PrivateRoute>
              <PrivateRoute role={["admin", "manager"]} path="/account-management"><AccountManagement/></PrivateRoute>
              <PrivateRoute role={["admin", "manager"]} path="/product-management"><ProductManagement/></PrivateRoute>
              <PrivateRoute role={["admin", "manager"]} path="/product-import"><ProductImport/></PrivateRoute>
              <PrivateRoute role={["admin", "manager"]} path="/statistical"><Statistical/></PrivateRoute>
              <Route path="/history-order" component={HistoryOrder}></Route>
            </Switch>
          </BrowserRouter>
      </ConfigProvider>
        
      </ProvideAuth> 
    </CookiesProvider>
    
  );
};

export default App;
