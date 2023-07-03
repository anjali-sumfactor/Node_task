import { NextApiRequest, NextApiResponse } from "next";
import bcrypt from 'bcrypt';

import { executeQuery } from '../../lib/Database/connectDatabase';
import { generateJwtToken, refreshAccessToken } from "../../lib/server";

export default async function login(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        try {
            const { email, password } = req.body;
            const getRecordQuery = `select * from user_new_table where email='${email}'`;
            const getRecord: any = await executeQuery(getRecordQuery);

            if (getRecord.length == 0) res.status(404).send({ message: "user not found please register and try again to login" });

            const match: boolean = await bcrypt.compare(password, getRecord[0].password);
            if (!match) return res.status(400).send({ message: "entered password is incorrect" });

            let user: any = { email: email as string, password: password as string };

            let JWTtoken = generateJwtToken(user);

            const JWTrefreshtoken = refreshAccessToken({ user });

            res.status(200).send({ JWTtoken, JWTrefreshtoken, message: { done: true } });
        }
        catch (error) {
            res.status(400).send({ done: false });
        }
    }
    else {
        res.send({ done: false });
    }
}