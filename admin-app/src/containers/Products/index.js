import { Button, Container, Row, Col, Table } from "react-bootstrap";
import React, { useState } from "react";
import Layout from "../../components/Layout";
import Input from "../../components/UI";
import Modal from "../../components/UI/Modal";
import { useDispatch, useSelector } from "react-redux";
import { addProduct } from "../../actions";
import "./style.css";
import { generatePublicUrl } from "../../urlConfig";
const Products = (props) => {
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [productPictures, setProductPictures] = useState([]);
  const [show, setShow] = useState(false);
  const [productDetailModal, setProductDetailModal] = useState(false);
  const [productDetail, setProductDetail] = useState(null);
  const category = useSelector((state) => state.category);
  const product = useSelector((state) => state.product);
  const dispatch = useDispatch();

  const handleClose = () => {
    const form = new FormData();
    form.append("name", name);
    form.append("price", price);
    form.append("quantity", quantity);
    form.append("description", description);
    form.append("category", categoryId);
    for (let pic of productPictures) {
      form.append("productPicture", pic);
    }
    dispatch(addProduct(form));
    setShow(false);
  };
  const handleShow = () => {
    setShow(true);
  };
  const createCategoryList = (categories, options = []) => {
    for (let category of categories) {
      options.push({ value: category._id, name: category.name });
      if (category.children.length > 0) {
        createCategoryList(category.children, options);
      }
    }
    return options;
  };
  /*  const handleCategoryImage = (e) => {
    setCategoryImage(e.target.files[0]);
  }; */

  const handleProductPicture = (e) => {
    setProductPictures([...productPictures, e.target.files[0]]);
  };
  const renderProducts = () => {
    return (
      <Table size={{ fontsize: 12 }} responsive="sm">
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Catergory</th>
          </tr>
        </thead>
        <tbody>
          {product.products.length > 0
            ? product.products.map((product) => {
                return (
                  <tr
                    onClick={() => showProductDetailsModel(product)}
                    key={product._id}
                  >
                    <td>2</td>
                    <td>{product.name}</td>
                    <td>{product.price}</td>
                    <td>{product.quantity}</td>
                    <td>{product.category.name}</td>
                  </tr>
                );
              })
            : null}
        </tbody>
      </Table>
    );
  };

  const renderAddproductModal = () => {
    return (
      <Modal show={show} handleClose={handleClose} modalTitle={"Add products"}>
        <Input
          label="Name"
          value={name}
          placeholder={`Product name`}
          onChange={(e) => setName(e.target.value)}
        />
        <Input
          label="Quantity"
          value={quantity}
          placeholder={`quantity`}
          onChange={(e) => setQuantity(e.target.value)}
        />
        <Input
          label="Price"
          value={price}
          placeholder={`price`}
          onChange={(e) => setPrice(e.target.value)}
        />
        <Input
          label="Description"
          value={description}
          placeholder={`Description`}
          onChange={(e) => setDescription(e.target.value)}
        />
        <select
          className="form-control"
          value={categoryId}
          onChange={(e) => setCategoryId(e.target.value)}
        >
          <option>Select category</option>
          {createCategoryList(category.categories).map((option) => (
            <option key={option.value} value={option.value}>
              {option.name}
            </option>
          ))}
        </select>
        {productPictures.length > 0
          ? productPictures.map((pic, index) => (
              <div key={index}>{pic.name}</div>
            ))
          : null}
        <input
          type="file"
          name="productPicture"
          onChange={handleProductPicture}
        />
      </Modal>
    );
  };
  const handleCloseProductDetailsModal = () => {
    setProductDetailModal(false);
  };

  const showProductDetailsModel = (product) => {
    setProductDetail(product);
    setProductDetailModal(true);
  };
  const renderProductDetailModel = () => {
    if (!productDetail) {
      return null;
    }
    return (
      <Modal
        show={productDetailModal}
        handleClose={handleCloseProductDetailsModal}
        modalTitle={"Product Details"}
        size="lg"
      >
        <Row>
          <Col md="6">
            <label className="key">Name</label>
            <p className="value">{productDetail.name}</p>
          </Col>
          <Col md="6">
            <label className="key">Price</label>
            <p className="value">{productDetail.price}</p>
          </Col>
        </Row>
        <Row>
          <Col md="6">
            <label className="key">Quantity</label>
            <p className="value">{productDetail.quantity}</p>
          </Col>
          <Col md="6">
            <label className="key">Category</label>
            <p className="value">{productDetail.category.name}</p>
          </Col>
        </Row>
        <Row>
          <Col md="12">
            <label className="key">Description</label>
            <p className="value">{productDetail.description}</p>
          </Col>
        </Row>
        <Row>
          <Col>
            <label className='key'>product Picture</label>
            <div style={{ display: "flex" }}>
              {productDetail.productPictures.map((pic) => (
                <div className="productImgContainer">
                  <img src={generatePublicUrl(pic.img)} />
                </div>
              ))}
            </div>
          </Col>
        </Row>
      </Modal>
    );
  };

  return (
    <Layout sidebar>
      <Container>
        <Row>
          <Col md={12}>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <h3>Products</h3>
              <Button onClick={handleShow}>Add</Button>
            </div>
          </Col>
        </Row>
        <Row>
          <Col>{renderProducts()}</Col>
        </Row>
      </Container>
      {renderAddproductModal()}
      {renderProductDetailModel()}
    </Layout>
  );
};
export default Products;
