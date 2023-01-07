const { sign, verify } = require("jsonwebtoken");
const SECRET_WORD = `${process.env.JWT_SECRET}`

 async function createToken(id) {
    return await sign({id}, SECRET_WORD,{expiresIn: "3d"});
}

async function checkToken(token) {
    try {
        return verify(token, SECRET_WORD);
    } catch (error) {
        return false
    }
}

module.exports = {
	createToken,
	checkToken,
};