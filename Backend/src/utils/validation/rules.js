//Email Validation 
export function isValidEmail(email){
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/; //bool

    return emailRegex.test(email);//boolean value
}

//Password Validation
export function isValidPassword(password){
    if(!password || password.length < 8){
        return (false);
    }

    const forbiddenPatterns = [
        /^[0-9]+$/, /^[a-zA-Z]+$/, /^(.)\1+$/, /123456/, /password/i
    ];

    for (let pattern of forbiddenPatterns){
        if(pattern.test(password)) return false;
    }

    return (true);
}

//Equal String Validation
export function areStringEqual(str1, str2){
    return str1 == str2;
}