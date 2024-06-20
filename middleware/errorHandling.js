import { NotFound, AlreadyExists, UsernameExists, EmailExists, PasswordsNotMatching,UserInfoMissing, Unauthorized } from '../lib/customErrors.js'

export default function errHandler (err, _req, res, next) {
    console.log(`🤖 Oops! Something went wrong`);
    console.log(`Error: ${err.name}`);
    console.log(err.stack);

    if (err.name === "NotFound" || err.name === 'CastError') {
        return res.status(404).json({ message: 'Oops! THe requested resource was not found.'})
    }


if (err.name === 'ValidationError') {
    console.log(`Validation Error: ${err.name}`);
    console.log(err);
    const validationErrors = {};

    for (const key in err.errors) {
        validationErrors[key] = err.errors[key].message;
    }
    return res.status(422).json(validationErrors);
}

if(err.name === 'AlreadyExists') {
    return res.status(400).json({message: "Sorry, this ite already exists. Please choose another"});
}

// ! for security maybe we should use a generic 'not authorised' message ?

if(err.name === 'UsernameExists') {
    return res.status(400).json({message: "This username is already taken. Please try another one"});
}
if(err.name === 'EmailExists') {
    return res.status(400).json({message: "This email is already registered. Please use a different email"});
}
if(err.name === 'PasswordsNotMatching') {
    return res.status(400).json({message: "The passwords you entered do not match. Please try again"});
}
if(err.name === 'UserInfoMissing') {
    return res.status(422).json({message: "Please fill in all required fields"});
}
if(err.name === 'Unauthorized') {
    return res.status(401).json({message: "You are not authorized to access this resource"});
}
res.sendStatus(500);
next(err);

}