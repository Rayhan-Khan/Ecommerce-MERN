import { Col, Row } from "react-bootstrap";
import Input from "../../../components/UI";
import Modal from '../../../components/UI/Modal'

const UpdateCategoriesModal = (props) => {
    const {
        show,
        handleClose,
        modalTitle,
        size,
        expandedArray,
        checkedArray,
        handleCategoryInput,
        categoryList
    }=props;
    return (
      <Modal
        show={show}
        handleClose={handleClose}
        modalTitle={modalTitle}
        size={size}
      >
        <Row>
          <Col>
            <h6>Expanded</h6>
          </Col>
        </Row>
        {expandedArray.length > 0 &&
          expandedArray.map((item, index) => (
            <Row>
              <Col>
                <Input
                  value={item.name}
                  placeholder={`category name`}
                  onChange={(e) =>
                    handleCategoryInput(
                      "name",
                      e.target.value,
                      index,
                      "expanded"
                    )
                  }
                />
              </Col>
              <Col>
                <select
                  className="form-control"
                  value={item.parentId}
                  onChange={(e) =>
                    handleCategoryInput(
                      "name",
                      e.target.value,
                      index,
                      "expanded"
                    )
                  }
                >
                  <option>Select category</option>
                  {categoryList.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.name}
                    </option>
                  ))}
                </select>
              </Col>
              <Col>
                <select className="form-control"
                value={item.type}
                onChange={(e) =>
                  handleCategoryInput(
                    "type",
                    e.target.value,
                    index,
                    "expanded"
                  )
                }
                >
                  <option value="">Select Type</option>
                  <option value="store">store</option>
                  <option value="product">product</option>
                  <option value="page">page</option>
                </select>
              </Col>
            </Row>
          ))}
        <Row>
          <Col>
            <h6>Checked</h6>
          </Col>
        </Row>
        {checkedArray.length > 0 &&
          checkedArray.map((item, index) => (
            <Row>
              <Col>
                <Input
                  value={item.name}
                  placeholder={`category name`}
                  onChange={(e) =>
                    handleCategoryInput(
                      "name",
                      e.target.value,
                      index,
                      "checked"
                    )
                  }
                />
              </Col>
              <Col>
                <select
                  className="form-control"
                  value={item.parentId}
                  onChange={(e) =>
                    handleCategoryInput(
                      "name",
                      e.target.value,
                      index,
                      "checked"
                    )
                  }
                >
                  <option>Select category</option>
                  {categoryList.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.name}
                    </option>
                  ))}
                </select>
              </Col>
              <Col>
                <select className="form-control"
                value={item.type}
                onChange={(e) =>
                  handleCategoryInput(
                    "type",
                    e.target.value,
                    index,
                    "checked"
                  )
                }
                >
                  <option value="">Select Type</option>
                  <option value="store">store</option>
                  <option value="product">product</option>
                  <option value="page">page</option>
                </select>
              </Col>
            </Row>
          ))}
      </Modal>
    );
  };

  export default UpdateCategoriesModal