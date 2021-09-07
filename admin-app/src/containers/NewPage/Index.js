import { useEffect, useState } from "react";
import { Row,Col, Container } from "react-bootstrap";
import { useSelector } from "react-redux";
import Layout from "../../components/Layout";
import Input from '../../components/UI'
import Modal from '../../components/UI/Modal'
import linearCategories from "../../helper/linearCategories";
import Category from "../Category";

const NewPage = (props) => {
    const [createModal,setCreateModal]=useState(false);
    const [title,setTitle]=useState('')
    const [categories,setCategories]=useState([]);
    const category=useSelector(state=>state.category);
    const [categoryId,setCaetegoryId]=useState('');
    const [desc,setDesc]=useState('');
    const [banners,setBanners]=useState([]);
    const [products,setProducts]=useState([]);


    useEffect(()=>{
        setCategories(linearCategories(category.categories));
    },[category])

    const handleBannersImages=(e)=>{
        console.log(e)
    }
    const handleProductImages=(e)=>{
        console.log(e)
    }
    const renderCreatePageModel=()=>{
        return (
            <Modal
            show={createModal}
            modalTitle={ 'Create New Page'}
            handleClose={()=>setCreateModal(false)}
            >
                <Container>
                <Row>
                    <Col>
                    <select
                    className='form-control form-control-sm'
                    value={categoryId}
                    onChange={(e)=>setCaetegoryId(e.target.value)}
                    >
                        <option value=''>select category
                        </option>
                        {
                            categories.map((cat)=>
                            <option key={cat._id} value={cat._id}>{cat.name}</option>
                            )
                        }
                       
                    </select>
                    </Col>
                </Row>
                <Row>
                    <Col>
                    <Input
                    value={title}
                    className='form-control form-control-sm'
                    onChange={(e)=>setTitle(e.target.value)}
                    placeholder={'page title'}>
                    </Input>
                    </Col>
                </Row>
                <Row>
                    <Col>
                    <Input
                    value={desc}
                    className='form-control-sm'
                    onChange={(e)=>setDesc(e.target.value)}
                    placeholder={'page Desc'}>
                    </Input>
                    </Col>
                </Row>
                <Row>
                    <Col>
                    <Input
                    className='form-control-sm'
                    type='file'
                    name='banners'
                    onChange={handleBannersImages}
                    ></Input>
                    </Col>
                </Row>
                <Row>
                    <Col>
                    <Input
                    className='form-control-sm'
                    type='file'
                    name='banners'
                    onChange={handleProductImages}
                    ></Input>
                    </Col>
                </Row>
                </Container>
            </Modal>
        )
    }

  return (
       <Layout sidebar>
      {renderCreatePageModel()}
      <button onClick={()=>setCreateModal(true)}>Create Page</button>
    </Layout>
    )}
export default NewPage;