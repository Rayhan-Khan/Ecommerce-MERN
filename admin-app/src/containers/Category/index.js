import { useState } from "react";
import { Button } from "react-bootstrap";
import { Col, Container, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { addCategory,
  getAllCategory,
   updateCategories,
   deleteCategories as deleteCategoriesAction} from "../../actions";
import Layout from "../../components/Layout";

import Modal from "../../components/UI/Modal";
import CheckboxTree from "react-checkbox-tree";
import {
  IoIosCheckboxOutline,
  IoIosCheckbox,
  IoIosArrowDown,
  IoIosArrowForward,
  IoIosAdd,
  IoIosTrash,
  IoIosCloudUpload,
} from "react-icons/io";
import "react-checkbox-tree/lib/react-checkbox-tree.css";
import UpdateCategoriesModal from "./components/UpdateCategoriesModal";
import AddCategoryModal from "./components/AddCategoryModel";
import './style.css'

const Category = (props) => {
  const category = useSelector(state => state.category);
  const [show, setShow] = useState(false);
  const [categoryName, setCategoryName] = useState("");
  const [parentCategoryId, setParentCategoryId] = useState("");
  const [categoryImage, setCategoryImage] = useState("");
  const [checked, setChecked] = useState([]);
  const [expanded, setExpanded] = useState([]);
  const [checkedArray, setCheckedArray] = useState([]);
  const [expandedArray, setExpandedArray] = useState([]);
  const [updateCategoryModel, setUpdateCategoryModel] = useState(false);
  const [deleteCategoryModal,setDeleteCategoryModal]=useState(false);

  const handleClose = () => {
    /* if(categoryName===''){
      alert("name is required")
      return;
    } */
    const form = new FormData();
    form.append("name", categoryName);
    form.append("parentId", parentCategoryId);
    form.append("categoryImage", categoryImage);
    dispatch(addCategory(form));
    setCategoryName("");

    /* const cat = {
      categoryName,
      parentCategoryId,
      categoryImage,
    }; */

    setShow(false);
  };
  const handleShow = () => setShow(true);
  const dispatch = useDispatch();

  const renderCategories = (categories) => {
    const myCategories = [];
    for (let category of categories) {
      myCategories.push({
        label: category.name,
        value: category._id,
        children: category.children.length > 0 && renderCategories(category.children)
      });  
    }
    return myCategories;
  };

  const createCategoryList = (categories, options = []) => {
    for (let category of categories) {
      options.push({
        value: category._id,
        name: category.name,
        parentId: category.parentId,
        type:category.type
      });
      if (category.children.length > 0) {
        createCategoryList(category.children, options);
      }
    }
    return options;
  };
  const handleCategoryImage = (e) => {
    setCategoryImage(e.target.files[0]);
  };
  const updateCategory = () => {
    updateCheckedAndExpandedCategories();
    setUpdateCategoryModel(true);
  };

  const updateCheckedAndExpandedCategories=()=>{
    const categories = createCategoryList(category.categories);
    console.log(expanded)
    const checkedArray = [];
    const expandedArray = [];
    checked.length > 0 &&
      checked.forEach((categoryId, index) => {
        const category = categories.find(
          (category, _index) => categoryId === category.value
        );
        category && checkedArray.push(category);
      });
    expanded.length > 0 &&
      expanded.forEach((categoryId, index) => {
        const category = categories.find(
          (category, _index) => categoryId === category.value
        );
        category && expandedArray.push(category);
      });
    setCheckedArray(checkedArray);
    setExpandedArray(expandedArray);
  }
  const handleCategoryInput = (key, value, index, type) => {
    if (type === "checked") {
      const updatedChekedArray = checkedArray.map((item, _index) =>
        index === _index ? { ...item, [key]: value } : item
      );
      setCheckedArray(updatedChekedArray);
    } else if (type === "expanded") {
      const updatedExapandArray = expandedArray.map((item, _index) =>
        index === _index ? { ...item, [key]: value } : item
      );
      setExpandedArray(updatedExapandArray);
    }
  };
const updateCategoriesForm=()=>{
  const form =new FormData();
  expandedArray.forEach((item,index)=>{
    form.append('_id',item.value);
    form.append('name',item.name);
    form.append('parentId',item.parentId?item.parentId:"");
    form.append('type',item.type);
  })
  checkedArray.forEach((item,index)=>{
    form.append('_id',item.value);
    form.append('name',item.name);
    form.append('parentId',item.parentId?item.parentId:"");
    form.append('type',item.type);
  })
  dispatch(updateCategories(form))
  .then(result=>{
    if(result){
      dispatch(getAllCategory());
    }});
  setUpdateCategoryModel(false)
}
  
  const deleateCategory=()=>{
    updateCheckedAndExpandedCategories();
    setDeleteCategoryModal(true)
  }
const deleteCategories=()=>{
  const checkedIdsArray=checkedArray.map((item,index)=>({_id:item.value}))
  const expandedIdsArray=expandedArray.map((item,index)=>({_id:item.value}));
  const idsArray=expandedIdsArray.concat(checkedIdsArray)
  if(checkedIdsArray.length>0){
    dispatch(deleteCategoriesAction(checkedIdsArray))
  }
   setDeleteCategoryModal(false)
}
  const renderDeleteCategoryModal=()=>{
    return (<Modal
    modalTitle='Confirm'
    show={deleteCategoryModal}
    handleClose={()=>setDeleteCategoryModal(false)}
    buttons={
      [
        {
          label:'No',
          color:'primary',
          onClick:()=>{
            alert('No')
          }
        },
          {
            label:'Yes',
            color:'danger',
            onClick:deleteCategories
         }
      ]
    }
    >
      <h5>Expanded</h5>
      {expandedArray.map((item,index)=><span key={index}>{item.name}</span>)}
      <h5>Checked</h5>
    {checkedArray.map((item,index)=><span key={index}>{item.name}</span>)}
    </Modal>)
  }
  const categoryList=createCategoryList(category.categories)
  return (
    <Layout sidebar>
      <Container>
        <Row>
          <Col md={12}>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <h3>Category</h3>
              <div className='actionBtnContainer'>
                <span>Action...</span>
              <button onClick={handleShow}><IoIosAdd/><span>Add</span></button>
              <button onClick={deleateCategory}><IoIosTrash/><span>Delete</span></button>
             <button onClick={updateCategory}><IoIosCloudUpload/><span>Edit</span></button>
              </div>
            </div>
          </Col>
        </Row>
        <Row>
          <Col md={12}>
            {/* <ul>{renderCategories(category.categories)}</ul> */}
            <CheckboxTree
              nodes={renderCategories(category.categories)}
              checked={checked}
              expanded={expanded}
              onCheck={(checked) => setChecked(checked)}
              onExpand={(expanded) => setExpanded(expanded)}
              icons={{
                check: <IoIosCheckbox />,
                uncheck: <IoIosCheckboxOutline />,
                halfCheck: <IoIosCheckboxOutline />,
                expandClose: <IoIosArrowForward />,
                expandOpen: <IoIosArrowDown />,
              }}
            />
            {console.log(category.categories)}
          </Col>
        </Row>
      </Container>

      <AddCategoryModal
        show={show}
        handleClose={handleClose}
         modalTitle={`Add Category`}
         categoryName={categoryName}
         setCategoryName={setCategoryName}
         parentCategoryId={parentCategoryId}
         setParentCategoryId={setParentCategoryId}
         categoryList={categoryList}
         handleCategoryImage={handleCategoryImage}
      />

      <UpdateCategoriesModal
       show={updateCategoryModel}
       handleClose={updateCategoriesForm}
       modalTitle={`Update Category`}
       size="lg"
       expandedArray={expandedArray}
       checkedArray={checkedArray}
       handleCategoryInput={handleCategoryInput}
       categoryList={categoryList}
      />
      {renderDeleteCategoryModal()}
    </Layout>
  );
};
export default Category;
