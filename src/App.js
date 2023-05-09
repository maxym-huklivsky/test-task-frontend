import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Layout from './components/Layout/Layout';
import CustomersPage from './pages/CustomersPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import EventsPage from './pages/EventsPage';
import PrivateRoute from './components/PrivateRoute';
import RestrictedRoute from './components/RestrictedRoute';
import { authRefresh } from './business-logic/auth';
import { useDispatch, useSelector } from 'react-redux';
import { selectToken } from './redux/auth/selectors';
import { clearAuthHeader, setAuthHeader } from './helpers/setHeaders';
import { setRefresh } from './redux/auth/slice';

function App() {
  const [isRefreshing, setIsRefresh] = React.useState(false);
  const token = useSelector(selectToken);
  const isMounted = React.useRef(false);
  const dispatch = useDispatch();

  React.useEffect(() => {
    if (!isMounted.current) {
      setIsRefresh(true);

      const refresh = async () => {
        try {
          setAuthHeader(token);
          const { data } = await authRefresh();

          dispatch(setRefresh(data));
        } catch (error) {
          clearAuthHeader();
        } finally {
          setIsRefresh(false);
        }
      };

      refresh();

      isMounted.current = true;
    }
  }, [dispatch, token]);

  return (
    <>
      {!isRefreshing && (
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route
              path="customers"
              element={<PrivateRoute component={<CustomersPage />} redirect="/login" />}
            />
            <Route
              path="customers/:customerId"
              element={<PrivateRoute component={<EventsPage />} redirect="/login" />}
            />
            <Route
              path="register"
              element={<RestrictedRoute component={<RegisterPage />} redirect="/customers" />}
            />
            <Route
              path="login"
              element={<RestrictedRoute component={<LoginPage />} redirect="/customers" />}
            />
          </Route>
        </Routes>
      )}

      <ToastContainer limit={1} />
    </>
  );
}

export default App;
