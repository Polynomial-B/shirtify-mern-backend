export class NotFound extends Error {
    constructor(message) {
        super(message);
        this.name = "Notfound";
    }
}
export class AlreadyExists extends Error {
    constructor(message) {
        super(message);
        this.name = "AlreadyExists";
    }
}
export class UsernameExists extends Error {
    constructor(message) {
        super(message);
        this.name = "UsernameExists";
    }
}
export class EmailExists extends Error {
    constructor(message) {
        super(message);
        this.name = "EmailExists";
    }
}
export class PasswordsNotMatching extends Error {
    constructor(message) {
        super(message);
        this.name = "PasswordsNotMatching ";
    }
}
export class UserInfoMissing extends Error {
    constructor(message) {
        super(message);
        this.name = "UserInfoMissing";
    }
}
export class Unauthorized extends Error {
    constructor(message) {
        super(message);
        this.name = "Unauthorized";
    }
}




