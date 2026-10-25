const userService = require("./user.service");

async function createUser(req , res , next) {
    try{
        const {name , email , password } = req.body ;
        await userService.createUser({name , email , password });
        res.status(201).json({
            message : "User added successfully.",
        });
    }catch(error){
        next(error);
    } 
}
async function createOrUpdateById(req , res , next) {
      try{
        await userService.createOrUpdateById(req.params.id , req.body);
        res.status(200).json({
            message : "User created or updated successfully.",
        });
    }catch(error){
        next(error);
    }   
}

async function getByEmail(req , res , next) {
    try{
        const {email} = req.query;
       if(!email){
        return res.status(400).json({message: "Email is required.",});
       }
       const user = await userService.findPublicByEmail(email);
       if(!user){
        return res.status(404).json({message: "no user found",});
       }
       return res.status(200).json({user});
     
    }catch(error){
        next(error);
    }    
}
async function getById(req , res , next){
    try{
        const user = await userService.findPublicById(req.params.id);
        if(!user){
            return res.status(404).json({message: "no user found",});
        }
        res.status(200).json(user);
    }catch(error){
        next(error);
    }      
}
module.exports = {
    createUser,
    createOrUpdateById,
    getByEmail,
    getById,
};
