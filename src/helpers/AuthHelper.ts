import bcrypt from 'bcrypt';

class AuthHelper {
    async hasPassword(password:string)
    {
        try {
            const saltRounds = 10;
             const hashedPassword = await bcrypt.hash(password, saltRounds);
            return hashedPassword;
        } catch (error) {
            console.log(error);
        }
    }
}

export default new AuthHelper;