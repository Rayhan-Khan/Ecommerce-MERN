import Header from "../Header";
import MenuHeader from "../MenuHeader";

const Layout = (props) => (
    <>
      <Header/>
      <MenuHeader/>
      {props.children}  
    </>
);
export default Layout;