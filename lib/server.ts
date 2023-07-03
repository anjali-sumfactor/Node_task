import * as jwt from 'jsonwebtoken';

interface JwtToken {
    email: string,
    password: string
}

export const generateJwtToken = (user: JwtToken) => {
    return jwt.sign(user, process.env.JWT_SECRET_KEY, { expiresIn: '2m' });
}

interface refreshJwtToken {
    user: object
}

export const refreshAccessToken = (tokenUser: refreshJwtToken) => {
    return jwt.sign(tokenUser.user, process.env.REFRESH_ACCESS_KEY);
}