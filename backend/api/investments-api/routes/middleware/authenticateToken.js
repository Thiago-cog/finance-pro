const UserAuthorization = require('../../component/user-authorization.js');
const UserRepository = require('../../component/data/user-repository.js');

const authenticateToken = async (req, res, next) => {
    const authHeader = req.headers.authorization;
    const userAuthorization = new UserAuthorization(new UserRepository());
    
    if (!authHeader){
        return res.status(401).json({ error: 'Nenhum token fornecido' });
    } 

    const [, token] = authHeader.split(' ');

    try {
        const userData = await userAuthorization.decodeToken(token);
        req.user = userData.data;
    } catch (error) {
        if (error instanceof AuthError) {
            return res.status(401).send();
        }
        return res.status(500).json({ error });
    }

    return next();
}

module.exports = authenticateToken;