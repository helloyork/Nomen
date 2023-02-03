import user from '$lib/server/user.login.json';

//@ts-ignore
export function check(nickname, password) {
    // @ts-ignore
    return (user[nickname] && (user[nickname].password == password)) ?
        { username: user[nickname].username, accessKey: user[nickname].accessKey }
        : false
}
