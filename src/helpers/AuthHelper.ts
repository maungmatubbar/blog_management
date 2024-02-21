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
    async comparePassword({password,hashedPassword}:{password:string,hashedPassword:string})
    {
        return await bcrypt.compare(password,hashedPassword);
    }
}

export default new AuthHelper;