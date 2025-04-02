import { useDispatch, useSelector } from 'react-redux';
import { loginUserAsync, logoutUserAsync } from '../redux/authSlice';
import { useNavigate } from 'react-router-dom';

export const useAuth = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, token } = useSelector((state) => state.auth);

  const login = async (credentials) => {
    const result = await dispatch(loginUserAsync(credentials));
    if (result?.payload) {
      localStorage.setItem('user', JSON.stringify(result.payload.user));
      localStorage.setItem('token', result.payload.token);
      navigate('/contacts');
    }
    return result?.payload ? true : false;
  };

  const logout = () => {
    dispatch(logoutUserAsync());
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    navigate('/');
  };

  return {
    user, 
    token, 
    login,
    logout,
  };
};
