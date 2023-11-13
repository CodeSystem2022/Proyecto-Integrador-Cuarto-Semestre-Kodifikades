import { NextApiRequest, NextApiResponse } from 'next';
import { decodeToken } from 'lib/jwt';
import NextCors from "nextjs-cors";

export function authMiddleware(callback) {
	return function (req: NextApiRequest, res: NextApiResponse) {
		const token = req.headers.authorization;
		if (!token) res.status(401).send({ Message: 'Missing token.' });

		const decodedToken = decodeToken(token);
		if (decodedToken) {
			callback(req, res, decodedToken);
		} else {
			res.status(401).send({ Message: 'Incorrect token' });
		}
	};
}

export function handlerCORS(callback) {
  return async function (req: NextApiRequest, res: NextApiResponse) {
    // Run the cors middleware
    // nextjs-cors uses the cors package, so we invite you to check the documentation https://github.com/expressjs/cors
    await NextCors(req, res, {
      // Options
      methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE"],
      origin: "*",
      optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
    });

    // Rest of the API logic
    callback(req, res);
    //res.json({ message: "Hello NextJs Cors!" });
  };
}