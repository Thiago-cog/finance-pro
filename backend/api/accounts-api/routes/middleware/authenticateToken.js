const AccountsMaintenance = require('../../component/accounts-maintenance.js');
const AccountsRepository = require('../../component/data/accounts-repository.js');

const authenticateToken = async (req, res, next) => {
    const authHeader = req.headers.authorization;
    const accountsMaintenance = new AccountsMaintenance(new AccountsRepository());
    
    if (!authHeader){
        return res.status(401).json({ error: 'Nenhum token fornecido' });
    } 

    const [, token] = authHeader.split(' ');

    try {
        const userData = await accountsMaintenance.decodeToken(token);
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