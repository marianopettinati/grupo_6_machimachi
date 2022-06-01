const fs = require('fs');
const path = require('path');

const getPath = () => {
    const _path = path.join(__dirname,'../data/users.json');
    return _path;
}

const generateId = () => {
    let allUser = findAll();
    let lastUser = allUser.pop();
    if(lastUser){
        return lastUser.id + 1;
    } 
    return 1;
}

const getData = () => {
    const _path = getPath();
    const file_data = fs.readFileSync(_path, 'utf-8');
    return JSON.parse(file_data);
}

const findAll = () => {
    return getData();
}

const findByPk = (id) => {
    let allUser = findAll();
    let userFound = allUser.find((user) => user.id === id);
    return userFound;
}

const findByField = (field, text) => {
    let allUser = findAll();
    let userFound = allUser.find(user => user[field] === text);
    return userFound;
}

const create = (userDate) => {
    let allUser = findAll();
    let user = {
        id: generateId(),
        ...userDate
    }
    allUser.push(user);
    fs.writeFileSync(getPath(), JSON.stringify(allUser, null, ' '));
    return true;
}

const deleteUser = (id) =>{
    let allUser = findAll();
    let newListUsers = allUser.filter(user => user.id !== id);
    fs.writeFileSync(getPath(), JSON.stringify(newListUsers, null, ' '));
    return true;
}

const User = {
    findAll,
    findByPk,
    findByField,
    create,
    deleteUser
}

module.exports = User;