import user from '$lib/server/user.json';

//@ts-ignore
export function check(username,accessKey){
    return (user[username] && user[username] == accessKey)
}
