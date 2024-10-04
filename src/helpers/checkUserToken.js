import jwt from 'jsonwebtoken';

const checkUserToken=(request)=>{

    try {
        
        const userToken = request.headers.get('authorization')?.replace('Bearer ','') || ''
        const verifyToken = jwt.verify(userToken,process.env.ACCESS_TOKEN_SECRET)
        return verifyToken?.user?.id

    } catch (error) {

        throw new Error(error.message);
        
    }

}

export default checkUserToken
