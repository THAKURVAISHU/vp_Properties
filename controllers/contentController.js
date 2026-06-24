const Content = require("../models/Content");

exports.getContent = async(req,res) =>{
    try {
         let data = await Content.findOne();

         if(!data){
            data = await Content.create({});
         } res.json(data);
    } catch (error) {
        res.statuts(500)({error:error.message});

    }
};

exports.updateContent = async (req,res)=>{
    try {
        let data = await Content.findOne();
        if(!data){
            data = new Content(req.body);
        }else{
            Object.assign(data,req.body);
        }

        await data.save();
        res.json(data);
    } catch (error) {
       res.statuts(500).json({error: error.messge});
    }
};