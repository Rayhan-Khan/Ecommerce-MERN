import { useEffect, useState } from "react";
import { Row, Col, Container } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { createPage } from "../../actions/page.action";
import Layout from "../../components/Layout";
import Input from "../../components/UI";
import Modal from "../../components/UI/Modal";
import linearCategories from "../../helper/linearCategories";

const NewPage = (props) => {
  const [createModal, setCreateModal] = useState(false);
  const [title, setTitle] = useState("");
  const [type, setType] = useState("");
  const [categories, setCategories] = useState([]);
  const category = useSelector((state) => state.category);
  const [categoryId, setCaetegoryId] = useState("");
  const [desc, setDesc] = useState("");
  const [banners, setBanners] = useState([]);
  const [products, setProducts] = useState([]);
  const dispatch = useDispatch();
  const page = useSelector((state) => state.page);

  useEffect(() => {
    setCategories(linearCategories(category.categories));
  }, [category]);

  useEffect(() => {
    console.log(page);
    if (!page.loading) {
      setCreateModal(false);
      setTitle('');
      setCaetegoryId('');
      setDesc('');
      setProducts([]);
      setBanners([]);
    }
  }, [page]);

  const handleBannersImages = (e) => {
    console.log(e);
    setBanners([...banners, e.target.files[0]]);
  };
  const handleProductImages = (e) => {
    console.log(e);
    setProducts([...products, e.target.files[0]]);
  };
  const onCategoryChange = (e) => {
    const category = categories.find(
      (category) => category.value === e.target.value
    );
    setCaetegoryId(e.target.value);
    setType(category.type);
  };

  const submitPageForm = (e) => {
    if (title === "") {
      alert("title is required");
      setCreateModal(false);
      return;
    }
    const form = new FormData();
    form.append("title", title);
    form.append("description", desc);
    form.append("category", categoryId);
    form.append("type", type);
    banners.forEach((banner, index) => {
      form.append("banners", banner);
    });
    products.forEach((product, index) => {
      form.append("products", product);
    });
    console.log(form);
    dispatch(createPage(form));
    //setCreateModal(false);
  };
  const renderCreatePageModel = () => {
    return (
      <Modal
        show={createModal}
        modalTitle={"Create New Page"}
        handleClose={() => setCreateModal(false)}
        onSubmit={submitPageForm}
      >
        <Container>
          <Row>
            <Col>
              {/* <select
                className="form-control form-control-sm"
                value={categoryId}
                onChange={onCategoryChange}
              >
                <option value="">select category</option>
                {categories.map((cat) => (
                  <option key={cat._id} value={cat._id}>
                    {cat.name}
                  </option>
                ))}
              </select> */}
              <Input
              type='select'
              value={categoryId}
              onChange={onCategoryChange}
              placeholder={'select category'}
              options={categories}
              />
            </Col>
          </Row>
          <Row>
            <Col>
              <Input
                value={title}
                className="form-control form-control-sm"
                onChange={(e) => setTitle(e.target.value)}
                placeholder={"page title"}
              ></Input>
            </Col>
          </Row>
          <Row>
            <Col>
              <Input
                value={desc}
                className="form-control-sm"
                onChange={(e) => setDesc(e.target.value)}
                placeholder={"page Desc"}
              ></Input>
            </Col>
          </Row>
          {banners.length > 0
            ? banners.map((banner, index) => (
                <Row key={index}>
                  <Col>{banner.name}</Col>
                </Row>
              ))
            : null}
          <Row>
            <Col>
              <Input
                className="form-control-sm"
                type="file"
                name="banners"
                onChange={handleBannersImages}
              ></Input>
            </Col>
          </Row>
          {products.length > 0
            ? products.map((product, index) => (
                <Row key={index}>
                  <Col>{product.name}</Col>
                </Row>
              ))
            : null}
          <Row>
            <Col>
              <Input
                className="form-control-sm"
                type="file"
                name="products"
                onChange={handleProductImages}
              ></Input>
            </Col>
          </Row>
        </Container>
      </Modal>
    );
  };

  return (
    <Layout sidebar>
      {page.loading ? (
        <p>Creating page... please wait</p>
      ) : (
        <>
          {renderCreatePageModel()}
          <button onClick={() => setCreateModal(true)}>Create Page</button>
        </>
      )}
    </Layout>
  );
};
export default NewPage;
