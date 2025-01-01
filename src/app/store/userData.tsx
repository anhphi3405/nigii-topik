const userData = {
    setFlag: (newFlag: string) => {
        localStorage.setItem('flag', newFlag);
    },
    getFlag: () =>{
        const flag = localStorage.getItem('flag');
        if(flag) return flag;
        return '';
    }
}

export default userData;