import  jwt  from 'jsonwebtoken';

//--------------------------------------authentication--------------------------------------
const authentication = async (req, res, next) => {
    try {
        const token = req.headers["x-api-key"];

        if (!token)
            return res.status(400).send({ status: false, message: 'Token must be present' })

        const decodedToken = jwt.verify(token, 'Room 56')

        if (!decodedToken)
            return res.status(400).send({ status: false, message: 'Provide your own token' })

        req.user = decodedToken

        next()
    }
    catch (err) {
        res.status(500).send({ status: false, error: err.message })
    }
}

//---------------------------------------authorization---------------------------------------
const authorization = async (req, res, next) => {
    try {
        const userId = req.params
        const token = req.headers["x-api-key"];

        if (!token)
            return res.status(400).send({ status: false, message: 'Token must be present' })

        const decodedToken = jwt.verify(token, 'Room 56')

        if (!decodedToken)
            return res.status(400).send({ status: false, message: 'Provide your own token' })

        if (decodedToken.userId !== userId)
            return res.status(400).send({ status: false, message: 'You are not authorized' })

        next()
    }
    catch (err) {
        res.status(500).send({ status: false, error: err.message })
    }
}

export { authentication, authorization }