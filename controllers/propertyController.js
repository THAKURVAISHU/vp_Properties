const Property = require("../models/Property");

const getProperties = async(req,res) =>{
    try {
      const{location ,bhk,type,minPrice,maxPrice}=req.query;
      let filter ={};

      if(location){
        filter.location ={$regex:location,$options:"i"};
      }
      if(bhk) filter.bhk = bhk;
      if(type) filter.type = type;
      if(minPrice && maxprice){
        filter.price ={
            $gte:Number(minPrice),
             $lte:Number(maxPrice)
        };
      }
      const properties = await Property.find(filter);
      res.json(properties);
        

    } catch (error) {
        res.status(500).json({message:"Error fetching data"});
    }
}

module.exports ={getProperties};