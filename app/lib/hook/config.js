import { useSelector } from "react-redux";

export default function useConfig() {
  const isLogin = useSelector((state) => state.loginReducer.login);
  const data = useSelector((state) => state.loginReducer.data);
  const name = useSelector((state) => state.loginReducer.full_name ) ;
  const use_name = useSelector((state)=>state.loginReducer.use_name) ;
  const info = useSelector((state) => state.loginReducer.info ) 


  

  // const errorMsg = useSelector((state) => state.loginReducer.errorMsg);

  return [isLogin,data,name,info,use_name];
}
