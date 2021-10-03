import Layout from "../../components/Layout";
import getParams from "../../utils/getParams";
import ProductPage from "./ProductPage";
import ProductStore from "./ProductStore";
import "./style.css";


const ProductListPage = (props) => {
  const renderProducts=()=>{
    let content=null;
    const params=getParams(props.location.search);
    switch(params.type){
      case 'store':
        content=<ProductStore {...props}/>
        break;
      case 'page':
        content=<ProductPage {...props}/>
        break;
      default:
        content=null;
        break;
    }
    return content;
  }
  return (
    <Layout>
      {renderProducts()}
    </Layout>
  );
};
export default ProductListPage;
