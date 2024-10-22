import crypto from "crypto";

export const hashPassword = (password: string) => {  
    const hashedPassword = crypto.createHash('sha256').update(password).digest('hex')
    return hashedPassword
}

export const validatePassword = (enteredPassword: string, storedPassword: string) => {
    const hashedPassword = crypto.createHash('sha256').update(enteredPassword).digest('hex') 
    return hashedPassword === storedPassword;
    
}

