import { createContext, useState } from 'react'; //전역에서 조회할 수 있는 context

const UserInfoContext = createContext({
  state: {
    // 상태 값
    userInfo: null,
    isLogin: false,
  },
  actions: {
    // 상태 변경 함수
    setUserInfo: null,
    setIsLogin: null,
  },
});

const UserInfoProvider = ({ children }) => {
  const [userInfo, setUserInfo] = useState(null);
  const [isLogin, setIsLogin] = useState(null);
  const value = {
    states: { userInfo, isLogin },
    actions: { setUserInfo, setIsLogin },
  };

  return (
    <UserInfoContext.Provider value={value}>
      {children}
    </UserInfoContext.Provider>
  );
};

const { Consumer: UserInfoConsumer } = UserInfoContext;

export { UserInfoConsumer, UserInfoProvider };

export default UserInfoContext;
