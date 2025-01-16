const express = require('express');
const router = express.Router();
const check = require('../middlewares/auth');
const check2 = require('../middlewares/auth2');
const productModel = require('../models/productModel');
const upload = require('../config/multer');
const { slugify } = require('slugify');
const braintree = require('braintree');
const orderModel = require('../models/orderModel');

var gateway = new braintree.BraintreeGateway({
    environment: braintree.Environment.Sandbox,
    merchantId: process.env.BRAINTREE_MERCHANT_ID,
    publicKey: process.env.BRAINTREE_PUBLIC_KEY,
    privateKey: process.env.BRAINTREE_PRIVATE_KEY,
});

router.post('/createproduct',upload.single('photo'),async(req,res)=>{
    let {name,price,category,quantity,description,shipping} = req.body;
    if(!name || !price || !description || !quantity || !category) return res.json({success:false,message:"Please Enter Complete Info!!"});
    let products = await productModel.create({
        name,
        price,
        quantity,
        description,
        photo:req.file.filename,
        category,
        shipping
    });
    res.json({success:true,message:"Product Created Successfully",products});
})
router.get('/getproducts',async(req,res)=>{
    try {
        const products = await productModel.find().populate('category').sort({createdAt:-1});
    res.json({success:true,totalCount:products.length,products});
    } catch (error) {
        res.json({success:false,message:error});
    }
})
router.get('/subproduct/:id',async(req,res)=>{
   try {
    let {id} = req.params;
    const product = await productModel.findOne({_id:id}).populate('category');
    if(!product) return res.json({success:false,message:"Unable to get product"});
    res.json({success:true,product});
   } catch (error) {
    console.log(error.message);
   }
})
router.get('/delete/:id',async(req,res)=>{
    try {
        const {id} = req.params;
    const product = await productModel.findOneAndDelete({_id:id});
    res.json({success:true,message:"Product deleted successfuly!!"});
    } catch (error) {
        console.log(error.message);
    }
})
router.put('/updateproduct/:id',upload.single('photo'),async(req,res)=>{
    if(!req.file) return res.json({success:false,message:"Please Upload Image"})
    let {name,price,category,quantity,description,photo,shipping} = req.body;
    let product = await productModel.findOneAndUpdate({_id:req.params.id},{name,price,description,photo:req.file.filename,category,shipping,quantity},{new:true})
    res.json({success:true,message:"Product Updated Successfully",product});
})
router.post('/productfilter',async(req,res)=>{
    try {
        let {radio,checked} = req.body;
        if(!radio || !checked) return res.json({success:false,message:"Please Select The Category"})
        let args = {};
        if(checked.length > 0) args.category = checked;
        if(radio.length > 0) args.price = { $gte:radio[0], $lte:radio[1]};
        if(args.category && args.price) {
            const products = await productModel.find({category:args.category,price:args.price});
        res.json({success:true,products});     
        }  
        else if(args.category){
            const products = await productModel.find({category:args.category});
        res.json({success:true,products});     
        } 
    } catch (error) {
        console.log(error);
    }
})
router.get('/relatedproducts/:pid/:cid',async(req,res)=>{
    try {
        let {pid,cid} = req.params;
        if(!pid || !cid) return res.json({success:false,message:"Unable to get pid & cid"})
        const relatedProduct = await productModel.find({category:cid,_id:{$ne:pid}}).limit(3);
        res.json({success:true,relatedProduct});

    } catch (error) {
        console.log(error)
    }
})
router.get('/catproduct/:id',async(req,res)=>{
    try {
        const {id} = req.params;
        if(!id) return res.json({success:false,message:"Unable to get category id"});
        const products = await productModel.find({category:id});
        res.json({success:true,products});
    } catch (error) {
        console.log(error)
    }
})
router.get('/braintree/token',async(req,res)=>{
    try {
        gateway.clientToken.generate({},function(err,response){
            if(err){
                console.log(err)
            }
            else{
                res.json(response)
            }
        })
    } catch (error) {
        res.json({success:false,message:"Error"})
        console.log(error)
    }
})
router.post('/braintree/payment',check,async(req,res)=>{
    try {
        const {cart,nonce,username} = req.body;
        let total = 0;
        cart.map((item)=>{total = total + item.price});
        let newTransaction = gateway.transaction.sale({
            amount:total,
            paymentMethodNonce:nonce,
            options:{
                submitForSettlement:true
            }
        },
        function(error,result){
            if(result){
                let order = orderModel.create({
                    products:cart,
                    payment:result,
                    buyer:req.user._id,
                    username:username
                })
                res.json({success:true,order})
            }
            else{
                res.json({success:false,error})
            }
        }
        )
    } catch (error) {
        console.log(error)
    }
})
router.get('/getorders',check,async(req,res)=>{
    try {
        const orders = await orderModel.find({buyer:req.user._id}).populate("products");
        res.json({success:true,orders});
    } catch (error) {
        res.json({success:false,message:"Error"})
    }
})
router.get('/allorders',check,check2,async(req,res)=>{
    try {
        const orders = await orderModel.find().populate("products");
        res.json({success:true,orders});
    } catch (error) {
        res.json({success:false,message:error})
    }
})
router.get('/updatestatus/:id/:status',check,check2,async(req,res)=>{
    try {
        const {id} = req.params;
        const {status} = req.params;
        if(!status) return res.json({success:false,message:"Unable to get status"});
        const updatedOrder = await orderModel.findOneAndUpdate({_id:id},{status:status},{new:true});
        res.json({success:true,updatedOrder});
    } catch (error) {
        console.log(error)
    }
})

module.exports = router;