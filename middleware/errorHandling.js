import {NotFound, AlreadyExists, UsernameExists, EmailExists, PasswordsNotMatching,UserInfoMissing, Unauthorized} from './customErrors';

export default function errHandler (err, req, res, next) {
    console.log(`🤖 Oops! Something went wrong`);
    console.log(`Error: ${err.name}`);
    console.log(err.stack);

    if (err.name === "Not Found" || err.name === 'CastError') {
        return res.status(404).json({ messge: 'Oops! THe requested resource was not found.'})
    }
}

if (err.name === 'ValidationError') {
    console.log('Validation Error: ${err.name}');
    console.log(err);
    const validationErrors = {};

    for (const key in err.errors) {
        validationErrors[key] = err.errors[key].message;
    }
    return res.status(422).json(validationErrors);
}

if(err.nmae === 'AlreadyExists') {
    return res.status(400).json({message: "Sorry, this ite already exists. Please choose another"});
}
if(err.nmae === 'UsernameExists') {
    return res.status(400).json({message: "This useername is already taken. Please try another one"});
}
if(err.nmae === 'EmailExists') {
    return res.status(400).json({message: "This email is already registered. Please use a different email"});
}
if(err.nmae === 'PasswordsNotMatching') {
    return res.status(400).json({message: "The passwords you entered do not match. Please try again"});
}
if(err.nmae === 'UserInfoMissing') {
    return res.status(422).json({message: "Please fill in all required fields"});
}
if(err.nmae === 'Unauthorised') {
    return res.status(401).json({message: "You are not authorized to access this resource"});
}
res.sendStatus(500);
next(err);