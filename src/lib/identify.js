//@ts-nocheck

import user from '$lib/server/user.login.json';

export function check(nickname, password) {
    return (user[nickname] && (user[nickname].password == password)) ?
        { username: user[nickname].username, accessKey: user[nickname].accessKey }
        : false
}
