const userData = {
    setFlag: (newFlag: string) => {
        localStorage.setItem('flag', newFlag);
    },
    getFlag: () =>{
        const flag = localStorage.getItem('flag');
        if(flag) return flag;
        return '';
    },
    setIgLogged: (isLogged: boolean) => {
        localStorage.setItem('isLogged', JSON.stringify(isLogged));
    },
    getIsLogged: () => {
        const isLogged = localStorage.getItem('isLogged');
        if(isLogged) return JSON.parse(isLogged);
        return false;
    },
    setUserName: (userName: string) => {
        localStorage.setItem('userName', userName);
    },
    getUserName: () => {
        const userName = localStorage.getItem('userName');
        if(userName) return userName;
        return '';
    }
}

export default userData;