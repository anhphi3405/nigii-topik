interface PostCheckUserProps {
    userName: string;
    password: string;
}
interface User {
    userName: string;
    email: string;
    password: string;
}
const fetcher =  {
    getUser: async (username: string) => {
        try{
            const response = await fetch(`http://localhost:5000/api/user/${username}`);
            const data = await response.json();
            return data;
        }
        catch(e){
            console.log(e);
        }
    },
    postCheckUser : async (userToCheck : PostCheckUserProps) =>{
        try{
            const response = await fetch('http://localhost:5000/api/user/login', {
                method : 'POST',
                headers : {
                    'Content-Type' : 'application/json'
                },
                body : JSON.stringify(userToCheck)
                })
                return response;
        }
        catch(e){
            console.log(e);
        }
    },
    postUser: async (user: User) => {
        try{ 
            const response = await fetch('http://localhost:5000/api/user', {
                method : 'POST',
                headers : {
                    'Content-Type' : 'application/json'
                },
                body : JSON.stringify(user)
            })
            return response;
        }
        catch(e){
            console.log(e);
        }
    }
}


export default fetcher;