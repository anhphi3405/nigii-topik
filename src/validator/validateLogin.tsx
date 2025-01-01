interface LogInFormValues {
    username: string;
    password: string;
}


const validateLogIn = (values : LogInFormValues) =>{
    const {username, password} = values;
    let isPassed = true;
    if (username.length < 8 || /\s/.test(username)) {
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