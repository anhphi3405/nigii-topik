interface SignUpFormValues {
    userName: string;
    email: string;
    password: string;
}

const validateSignUp = (values: SignUpFormValues) => {
    const { userName, email, password } = values;
    let isPassed = true;
    if (userName.length < 8 || /\s/.test(userName)) {
      alert('Username must be at least 8 characters long and contain no spaces');
      isPassed = false;
    } else if (!/\S+@\S+\.\S+/.test(email) || /\s/.test(email)) {
      alert('Email is not valid and should contain no spaces');
      isPassed = false;
    } else if (password.length < 8 || /\s/.test(password)) {
      alert('Password must be at least 8 characters long and contain no spaces');
      isPassed = false;
    } else {
    }
    return isPassed;
}

export default validateSignUp;