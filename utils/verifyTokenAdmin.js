import jwt from 'jsonwebtoken'

export const verifyTokenAdmin = (req, res, next) => {

    const token = req.cookies.accessTokenAdmin
    

    if (!token) {
        return res
            .status(401)
            .json({
                success: false,
                message: "You're not authorize"
            })
    }

    // if token is exist then verify the token 
    jwt.verify(token, process.env.JWT_SECRET_KEY, (err, user) => {
        if (err) {
            return res
                .status(401)
                .json({
                    success: false,
                    message: "token is invalid"
                })
        }

        req.user = user
        next() // don't forget to call next 
    })

}

