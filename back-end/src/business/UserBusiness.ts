import { UserDatabase } from "../database/UserDatabase";
import { LoginInputDTO, LoginOutputDTO } from "../dtos/user/login.dto";
import { SignupInputDTO, SignupOutputDTO } from "../dtos/user/signup.dto";
import { BadRequestError } from "../erros/BadRequestError";
import { NotFoundError } from "../erros/NotFoundError";
import { USER_ROLES, User } from "../models/User";
import { HashManager } from "../services/HashManager";
import { IdGenerator } from "../services/IdGenerator";
import { TokenManager, TokenPayload } from "../services/TokenManager";

export class UserBusiness {
    constructor(
        private userDatabase: UserDatabase,
        private idGenerator: IdGenerator,
        private tokenManager: TokenManager,
        private hashManager: HashManager
    ){}
    
    public signup = async (input: SignupInputDTO): Promise<SignupOutputDTO> => {
        const {name, email, password} = input
        
        const id = this.idGenerator.generate()

        const hashedPassword = await this.hashManager.hash(password)

        const user = new User(
            id,
            name,
            email,
            password,
            USER_ROLES.NORMAL,
            new Date().toISOString()
        )

        await this.userDatabase.insertUser(user.toDBModel())
        
        const payload: TokenPayload = {
            id: user.getId(),
            name: user.getName(),
            role: user.getRole()
        }

        const token = this.tokenManager.createToken(payload)
        
        const output: SignupOutputDTO = {
            token
        }
        return output
    }

    public login = async (input: LoginInputDTO): Promise<LoginOutputDTO> => {
        const { email, password} = input

        const userDB = await this.userDatabase.findUserByEmail(email)

        if (!userDB) {
            throw new NotFoundError("email não cadastrado")
        }
        
        const user = new User(
            userDB.id,
            userDB.name,
            userDB.email,
            userDB.password,
            userDB.role,
            userDB.created_at
        )
        
        const hashedPassword = userDB.password

        const isPasswordCorrect = await this.hashManager.compare(password, hashedPassword)

        if(!isPasswordCorrect){
            throw new BadRequestError("email e/ou senha invalidos")
        }

        const payload: TokenPayload = {
            id: user.getId(),
            name: user.getName(),
            role: user.getRole()
        }

        const token = this.tokenManager.createToken(payload)
        
        const output: LoginOutputDTO = {
            token
        }
        return output
    }
}