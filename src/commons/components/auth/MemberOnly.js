import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom'; //컴포넌트로 이동
import UserInfoContext from '../../../member/modules/UserInfoContext';

const MemberOnly = ({ children }) => {
  const {
    states: { isLogin },
  } = useContext(UserInfoContext);

  return isLogin ? children : <Navigate to="/member/login" replace={true} />; //replace={true}-뒤로가기X, false-가능(기본값)
};

export default React.memo(MemberOnly);
