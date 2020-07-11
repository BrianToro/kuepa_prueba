const users = [];

const addUser = (user) => {
    users.push(user);
    return user;
}

const removeUser = (user) => {
    const index = users.findIndex(user);
    if (index !== -1){
        return users.splice(index, 1)[0];
    }
}

const getUser = (user) => {
    return users.find(user_ => {
        return user_.user === user
    });
}

module.exports = {
    addUser,
    removeUser,
    getUser
}
