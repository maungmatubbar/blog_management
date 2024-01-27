import { cleanEnv } from "envalid";
import { port,str } from "envalid/dist/validators";

export default cleanEnv(process.env,{
    MONGO_CONECTION_STRING: str(),
    PORT: port(),
})