const express = require('express');
const fs = require('fs');
const Path = require('path');

let dataList_path = Path.join(process.cwd(), `server`, "data", "data.json");
const productData = fs.readFileSync(dataList_path);
let productData_JSON = JSON.parse(productData.toString()); 
const router = new express.Router();

router.post('/addProduct', function(req, res){
    let { 
        name, 
        product_code,
        product_price,
        active_inactive
    } = req.body||{};
    let product_img = req.files.product_img;
    try{
        console.log('productData_JSON....', productData_JSON)

        product_img.mv(
            Path.join(process.cwd(), 
            `server`, 
            `data`, 
            `productImages`, 
            `${product_code}`//TODO: mention the image here
        ), function(error, response){
            if(error){
                console.log('error is coming ..', error)
                return
            }
            productData_JSON.push({
                name,
                product_code,
                product_price,
                active_inactive,
                image: `${product_code}`//TODO: mention the image name 
            })
            console.log("error ...'", productData_JSON)
            fs.writeFileSync(dataList_path, JSON.stringify(productData_JSON));
            return res.send({
                data: undefined,
                status: true,
                message: "Product is successfully added."
            });    
        });
    
    }
    catch(e){
        console.log(e);
        return res.send({
            data: undefined,
            status: false,
            message: "Error while adding product info. Please try again later."
        });
    }
    
});
router.get("/getProductsList", function(req, res){
    try {
        let {from, to} = req.query;
        return res.send({
            data: productData_JSON.slice(from, to),
            status: true,
            message: "Success"
        });
    } catch (e){
        console.log(e);
        return res.send({
            data: undefined,
            status: false,
            message: "Unable to get Product List from server."
        })
    }
})

module.exports = router;