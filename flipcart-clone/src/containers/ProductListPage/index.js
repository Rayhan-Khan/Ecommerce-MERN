import { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import { getProductBySlug } from "../../actions/product.action";
import { useDispatch, useSelector } from "react-redux";
import "./style.css";
import { generatePublicUrl } from "../../urlConfig";

const ProductListPage = (props) => {
  const product = useSelector((state) => state.product);
  const [priceRange,setPriceRange]=useState({
      under5k:5000,
      under10k:10000,
      under15k:15000,
      under20k:20000,
      under30k:30000
  })
  const dispatch = useDispatch();
  useEffect(() => {
    const { match } = props;
    dispatch(getProductBySlug(match.params.slug));
  }, []);
  return (
     
    <Layout>
      {Object.keys(product.productsByPrice).map((key, index) => {
        return (
          <div className="card">
            <div className="cardHeader">
              <div>{props.match.params.slug} under price {priceRange[key]}</div>
              <button>view all</button>
            </div>
            <div style={{display:"flex"}}>
              {product.productsByPrice[key].map((product) => (
                <div className="productContainer">
                  <div className="productImageContainer">
                    <img
                      src={generatePublicUrl(product.productPictures[0].img)}
                      alt=""
                    />
                  </div>
                  <div className="productInfo">
                    <div style={{ margin: "5px 0" }}>{product.name}</div>
                    <div>
                      <span>4.3</span>&nbsp;
                      <span>4000</span>
                    </div>
                    <div className="productPrice">{product.price}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </Layout>
  );
};
export default ProductListPage;
