var express = require('express');
const check = require('../middlewares/auth');
const check2 = require('../middlewares/auth2');
const categoryModel = require('../models/categoryModel');
const { default: slugify } = require('slugify');
var router = express.Router();
router.post('/createcategory',async(req,res,next)=>{
    try {
        let {name} = req.body;
        if(!name) return res.json({success:false,message:'Please Provide Complete Info'});
        const prevCategory = await categoryModel.findOne({name:name});
        if(prevCategory) return res.json({success:false,message:"Category Already Exists"});
        const category = await categoryModel.create({
            name,
            slug:slugify(name)
        })
        res.json({success:true,message:"New Category Created",category});
    } catch (error) {
        res.json({success:false,message:error.message});
        console.log(error)
    }
})
router.put('/updatecategory/:id',async(req,res)=>{
    try {
        const {name} = req.body;
        if(!name) return res.json({success:false,message:"Please Update the Name"})
        const {id} = req.params;
        let category = await categoryModel.findByIdAndUpdate(id,{name,slug:slugify(name)},{new:true});
        res.json({success:true,message:"Category Updated Successfully",category})
    } catch (error) {
        res.json({success:false,message:"Something went wrong",error});
        console.log(error.message);
    }
})
router.get('/allcategory',async(req,res,next) => {
    try {
        const allcategory = await categoryModel.find();
        res.json({success:true,allcategory});
    } catch (error) {
        res.json({success:false,message:error});
        console.log(error.message);
    }
})
router.get('/subcategory/:id',async(req,res)=>{
   try {
    let {id} = req.params;
    const subcategory = await categoryModel.findOne({_id:id});
    if(!subcategory) return res.json({success:false,message:"No Category Available"});
    res.json({success:true,message:subcategory});
   } catch (error) {
    console.log(error.message);
    res.json({success:false,message:error});
   }
})
router.delete('/deletecategory/:id',async(req,res,next)=>{
    let deletecategory = await categoryModel.findOneAndDelete({_id:req.params.id});
    const checkCategory = await categoryModel.findOne({_id:req.params.id});
    if(checkCategory) return res.json({success:false,message:"Category Didn't Deleted"});
    res.json({success:true,message:"Category Deleted Successfully"});
})
module.exports = router;