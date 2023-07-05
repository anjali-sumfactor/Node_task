import * as jwt from 'jsonwebtoken';
import { NextApiRequest, NextApiResponse } from 'next';

import { executeQuery } from "../../lib/Database/connectDatabase";
import { generateJwtToken } from "../../lib/JWT-token/service";

export default async function refreshToken(req: NextApiRequest, res: NextApiResponse) {
    try {
        const { token, email } = req.body;

        if (!token)
            return res.status(401).json({ error: 'Token is required' });

        const getRecord = `select * from user_table where email='${email}';`;

        const result: any = await executeQuery(getRecord);

        if (result.length === 0)
            return res.status(403).json({ error: 'User not found' });

        jwt.verify(token, process.env.REFRESH_ACCESS_KEY as string, (error: unknown, response: unknown) => {
            if (error) return res.status(403).json({ error: 'Forbidden' });

            const accessToken: string = generateJwtToken({
                email: result[0].email,
                password: result[0].password,
            });

            return res.status(200).json({ token: `Bearer ${accessToken}` });
        });
    } catch (error) {
        return res.status(403).json({ error: error });
    };
};