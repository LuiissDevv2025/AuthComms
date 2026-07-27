/*Explanation:
We will create a list of allowed origins (your "table") and export a single middleware function that intercepts the request, 
performs the check, and handles both paths
*/


//The Table
const ALLOWED_ORIGINS = [
    'https://myfrontend-website-domain.com',
    'http://localhost:3000' //Local Domain 
];

const corsHandler = (req, res, next) => {
    const req_origin = req.headers.origin;

        //Incoming/Outgoing: If verified, apply the approval stamp to the response headers
    if(ALLOWED_ORIGINS.includes(req_origin)){
        res.setHeader('Access-Control-Allow-Origin', req_origin);
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
        res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    }

        //Options request
    if(req.method === 'OPTIONS'){
            //if verified origin the browser will if not the browser will take care of it
        return res.status(204).end();
    }


    next();
}

module.exports = corsHandler;