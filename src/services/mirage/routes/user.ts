import { Response, Request } from 'miragejs';
import { handlerErros } from './../server';

import { User } from './../../../interfaces/user.interface';
import { randomBytes } from 'crypto';


const generateToken = () => randomBytes(8).toString('hex')

export interface AuthResponse {
    token: string
    user: User
}

const signIn = (schema: any, req: Request): AuthResponse | Response => {
    const { username, password } = JSON.stringify(req.requestBody)
    const user = schema.users.findBy({ username })

    if(!user){
        return handlerErros(null, 'User not found!')
    }
    if( password !== user.password){
        return handlerErros(null, 'Passowrd is incorrect')
    }
    const token = generateToken()
    return {
        user: user.attrs as User,
        token
    }
}

const signUp = (schema: any, req: Request): AuthResponse | Response => {
    const data = JSON.parse(req.requestBody)
    const regUser = schema.users.findBy({ username: data.username })
    if(regUser){
        return handlerErros(null, 'Users already exixt')
    }
    const newUser = schema.users.create(data)
    const token = generateToken()
    return {
        user: newUser.attrs as User,
        token
    }
}

export default { signIn, signUp }

