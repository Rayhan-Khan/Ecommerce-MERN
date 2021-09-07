const express=require('express');
const { requireSignin, adminMiddleware } = require('../common-middleware');
const { addcategory, getCategories, updateCategories, deleteCategories } = require('../controller/category');
const multer=require('multer');
const path=require('path');
const shortid=require('shortid');
const router=express.Router();

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(path.dirname(__dirname),'uploads'))
    },
    filename: function (req, file, cb) {
      cb(null, shortid.generate() + '-' + file.originalname)
    }
  })

const upload=multer({storage})

router
.post('/category/create',requireSignin,adminMiddleware,upload.single('categoryImage'),addcategory)
.get('/category/getcategory',getCategories)
.post('/category/update',upload.array('categoryImage'),updateCategories)
.post('/category/delete',deleteCategories)

module.exports=router;