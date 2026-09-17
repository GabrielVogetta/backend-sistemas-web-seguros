const users = [];

export default function usersService() {
    return {
        returnUsers: () => {
            return users;
        },
        addUser: (user) => {
            users.push(user);
        },
        existsUserByEmail: (email) => {
            return users.some(user => user.email === email);
        },
        updateUser: (updatedUser) => {
            const userIndex = users.findIndex(user => user.id === updatedUser.id);
            if (userIndex !== -1) {
                users[userIndex] = updatedUser;
                return true;
            }
        },
        deleteUser: (id) => {
            const userIndex = users.findIndex(user => user.id === id);
            if (userIndex !== -1) {
                users.splice(userIndex, 1);
                return true;
            }
        }
    };
};