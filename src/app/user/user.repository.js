const User = require("./users.model");

function findByEmail(email){
    return User.findOne({where:{email}});
}

function findById(id){
    return User.findByPk(id);
}

async function buildAndSave(userData){
    const user = User.build(userData);
    await user.save();
    return user;
}
function upsertById(userData){
    return User.upsert(userData , {validate: false});
}
function findPublicByEmail(email){
    return User.findOne({
        where: {email},
        attributes: {exclude:["password"]},
    });
}

function findPublicById(id){
    return User.findByPk(id , {
        attributes: {exclude: ["role" , "password"]},
    });
}
module.exports = {
    findByEmail,
    findById,
    buildAndSave,
    upsertById,
    findPublicByEmail,
    findPublicById,
};