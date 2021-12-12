import { Navigate } from 'react-router-dom';
import { useContext } from 'react';
import { Context } from './index';

export default function RequireAuth({ children }) {
  const { store } = useContext(Context);

  return store.isAuth === true ? children : <Navigate to="/auth" replace />;
}
