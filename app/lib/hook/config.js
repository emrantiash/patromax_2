import { useSelector } from "react-redux";

export default function useConfig() {
  const isLogin = useSelector((state) => state.loginReducer.isLogin);
  const data = useSelector((state) => state.loginReducer.data);
  const name = useSelector((state) => state.loginReducer.full_name ) 
  const info = useSelector((state) => state.loginReducer.info ) 
  

  // const errorMsg = useSelector((state) => state.loginReducer.errorMsg);

  return [isLogin,data,name,info];
}
