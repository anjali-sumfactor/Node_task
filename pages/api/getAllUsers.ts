import { NextApiRequest, NextApiResponse } from "next";
import { executeQuery } from "../../lib/Database/connectDatabase";
import { verifyToken } from "../../lib/JWT-token/service";

export default async function getAllUser(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'GET') {
        try {
            // verifyToken(req, res, async () => {
                const getRecord = `select * from user_table;`
                const resultset: any = await executeQuery(getRecord);
                res.status(200).send({ userlist: resultset, done: true });
            // });
        }
        catch (error) {
            res.status(500).send('Server Error');
        }
    }
    else {
        res.status(400).json({ message: 'Bad Request' });
    }
};