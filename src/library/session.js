import { SignJWT,jwtVerify } from "jose"
import Cookies from 'js-cookie'

const key = new TextEncoder().encode(import.meta.env.VITE_JOSE_SECRET)
const cookie = {
    name:'token',
    option:{httpOnly:true, secure:true, sameSite:'lax',path:'/'},
    duration: 24*60*60*1000
}

export async function encrypt(payload) {
    return new SignJWT(payload)
        .setProtectedHeader({alg:'HS256'})
        .setIssuedAt()
        .setExpirationTime('60 minutes')
        .sign(key)
}

export async function decrypt(token){
    try {
        const {payload} = await jwtVerify(token, key,{
            algorithms:['HS256']
        })
        return payload
    } catch (error) {
        return null
    }
}


export async function createSession(user) {
    let date = new Date();
    const expires = date.setTime(date.getTime() + (60 * 1000))
    const token = await encrypt({user:user})
    Cookies.set(cookie.name, token, { expires: expires })
}


export async function verifySession() {
    const token = Cookies.get(cookie.name)
    const session = await decrypt(token)
    if(!session?.user){
        return null;
    }
    return session.user;
}


export async function deleteSession() {
    let expires = new Date();
    Cookies.set(cookie.name, '', { expires: expires })
}