import { NextApiRequest, NextApiResponse } from 'next';
import bcrypt from 'bcrypt';

import { executeQuery } from '../../lib/Database/connectDatabase';

export default async function userController(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        return new Promise(async (resolve, reject) => {
            try {
                let { email, password, token } = req.body
                // console.log(req.body);
                // const sqlQuery = `insert into user_new_table (email,password)values("anjali@gmail.com", "anjali@12345")`

                //=========================== AVOID DUPLICACY ===========================
                const getRecord = `select * from user_new_table where email='${email}'`

                let resultset: any = await executeQuery(getRecord);

                if (resultset.length > 0) return res.status(400).send({ message: "User already registered please login" });
                //=======================================================================



                //=========================== BCRYPT THE PASSWORD ===========================
                const salt = await bcrypt.genSalt();

                const hashedPassword = await bcrypt.hash(password, salt);
                //=======================================================================


                //=========================== SELECT QUERY ===========================
                // const sqlQuery = `select * from user_new_table`


                //=========================== UPDATE QUERY ===========================
                // const sqlQuery = `update user_new_table set f_name='Archana' where token=11223`


                //=========================== DELETE QUERY ===========================
                // const sqlQuery = `delete from user_new_table where token=67239`


                const sqlQuery = `insert into user_new_table (email,password)values('${email}', '${hashedPassword}', '${token}')`

                let response = await executeQuery(sqlQuery);

                console.log("userController.ts: ~ returnnewPromise ~ response:", response)

                return resolve(response);

            } catch (error) {
                console.log("userController.ts:~ returnnewPromise ~ error:", error);
                return reject(error);
            }
        })
    } else {
        res.send({ done: false });
    }
};