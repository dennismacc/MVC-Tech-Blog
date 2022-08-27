const globals = {};

module.exports = {
    formatDate: date => {
        return `${new Date(date).getMonth() + 1}/${new Date(date).getDate()}/${new Date(
        date
        ).getFullYear()}`;
    },
    isLocalUser: (currentUserId, userId) => {
        console.log("Is current user --- ", currentUserId, userId)
        return currentUserId === userId
    },
    print: data => console.log('from helper: ', data),
    setGlobalVar: (key, value) => {
        globals[key] = value;
        console.log('set global key: ', key, ' to value: ', value);
        
    },
    getGlobalVar: key => {
        const value = globals[key];
        console.log('got global key: ', key, ' who\'s value is: ', value);
        return value;
    },
    notEmpty: arr => arr.length > 0
};