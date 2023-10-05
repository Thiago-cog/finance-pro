

class UserAuthorization {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }

    async login(userData) {
        const user = this.userRepository.getUserByEmail(userData.email);

        const passwordMatch = await bcrypt.compare(password, user.password);
        const { id, fullname } = user;
        const userToken = {
            id,
            fullname,
            email
        }

        const token = jwt.sign({ userToken }, config.auth.secret, {
            expiresIn: config.auth.expiresIn
        });
    }
}

export default UserAuthorization;