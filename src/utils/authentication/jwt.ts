import jwt, { Secret, SignOptions } from 'jsonwebtoken'
import UserType from '../../types/user'

export function issueToken(user: UserType) {
    const payload = {
        sub: user._id,
    }
    const secret = process.env.SESSION_SECRET as string
    console.log(secret, "secret is")
    const signOptions: SignOptions = {
        algorithm: 'HS256',
        expiresIn: '7d',
    }
    const token = jwt.sign(payload, secret, signOptions)
    return token
}
