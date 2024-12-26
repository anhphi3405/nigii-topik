interface LogInFormValues {
    userName: string;
    password: string;
}


const validateLogIn = (values : LogInFormValues) =>{
    const {userName, password} = values;
    let isPassed = true;
    if (userName.length < 8 || /\s/.test(userName)) {
        alert('Username must be at least 8 characters long and contain no spaces');
        isPassed = false;
    }
    else if (password.length < 8 || /\s/.test(password)) {
        alert('Password must be at least 8 characters long and contain no spaces');
        isPassed = false;
    }
    return isPassed;
}


export default validateLogIn;