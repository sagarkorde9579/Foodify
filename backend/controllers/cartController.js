import userModel from "../models/userModel.js"

const addToCart = async (req, res) => {
  try {
   
    const userId = req.userId;
   
    const userData = await userModel.findById(userId);
    if (!userData) {
      return res.json({ success: false, message: "User not found" });
    }
   
    let cartData = userData.cartData || {};

    
    const { itemId } = req.body;
    if (!itemId) {
      return res.json({ success: false, message: "itemId is required" });
    }

    if (!cartData[itemId]) {
      cartData[itemId] = 1;
    } else {
      cartData[itemId] += 1;
    }

    await userModel.findByIdAndUpdate(userId, { cartData });

    res.json({ success: true, message: "Added To Cart" });
  } catch (error) {
  
    res.json({ success: false, message: "Error adding to cart" });
  }
};



const removeFromCart=async(req,res)=>{
try{
let userData=await userModel.findById(req.userId)
  let cartData=await userData.cartData;
  if(cartData[req.body.itemId]>0){
    cartData[req.body.itemId]-=1;
  }
  await userModel.findByIdAndUpdate(req.userId,{cartData})
  res.json({success:true,message:"Remove From Cart"})
}catch(error){
console.log(error)
res.json({success:false,message:"Error"});
}
}

const getCart=async(req,res)=>{
 try{
  let userData=await userModel.findById(req.userId);
  let cartData=await userData.cartData;
  res.json({success:true,cartData})
 }
 catch(error){
 console.log(error)
 res.json({success:false,message:"Error"})
 }
}
export {addToCart,removeFromCart,getCart}