import jwt from 'jsonwebtoken';
 
export const verifyToken = async (req, res, next) => {
    try {
        let token = req.header("Authorization");
        if(!token) return res.status(403).json("Access Denied");
        if(token.startsWith("Bearer ")) {
            token = token.slice(7, token.length).trimLeft();
        };
        const decoded = await jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();

    } catch (err){
        res.status(500).json(err);
    }
};