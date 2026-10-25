const userRepository = require("./user.repository");

function makeError(message , statusCode){
    const error = new Error(message);
    error.statusCode = statusCode ;
    return error ;
}

async function createUser(data){

    const {name , email , password} = data;
    if(!name || ! email || !password){
        throw makeError("Name, email, and password are required.", 400);
    }
    const existUser = await userRepository.findByEmail(email);
    if(existUser){
        throw makeError("Email already exists.", 409);
    }
    const user = await userRepository.buildAndSave({name , email , password , role: "user"});
    return user ;
}
async function createOrUpdateById(id, data){
    const numericId = Number(id);
     if (!Number.isInteger(numericId) || numericId < 1) {
        throw makeError("A valid user ID is required.", 400);
    }

    const existingUser = await userRepository.findById(numericId);
    let userData ;
    if(existingUser){
        userData = {
            id: numericId,
            name: data.name ?? existingUser.name,
            email: data.email ?? existingUser.email,
            password: data.password ?? existingUser.password,
            role: data.role?? existingUser.role,
        };
    }
    else{
        if (!data.name || !data.email || !data.password){
            throw makeError("To create a user, name, email, and password are required.", 400);    
        }
         userData = {
            id: numericId,
            name: data.name,
            email: data.email,
            password: data.password,
            role: data.role ?? "user",
        };
    }
    await userRepository.upsertById(userData);
}
async function findPublicByEmail(email) {
    return await userRepository.findPublicByEmail(email);  
}
async function findPublicById(id){
    return userRepository.findPublicById(id);
}

module.exports = {
    createUser,
    createOrUpdateById,
    findPublicByEmail,
    findPublicById,
};