import { readFileSync, existsSync, writeFile } from 'fs'; // {Ler o arquivo de forma assíncrona, Verificar se o arquivo existe antes de tentar ler e escrever}
const path = './data.json';

function selectUsers() {
    try {
        if (existsSync(path)) {
            const jsonContent = readFileSync(path, 'utf8');
            if (jsonContent) {
                const data = JSON.parse(jsonContent);
                return {
                    success: true,       
                    message: "Success.", 
                    data: data,              
                    error: null           
                };
            }
        }
    } catch (error) {
        return {
            success: false,       
            message: "Error reading the data file.", 
            data: null,           
            error: error.message       
        };
    }

    return {
        success: false,           
        message: "File does not exist or is empty.", 
        data: null,              
        error: "File does not exist or is empty."             
    };
};

function insertUser(newUser){ // newUser {id, name, email, password, role}
    try{
        if(existsSync(path)){
            const jsonContent = readFileSync(path, 'utf8');
            if(jsonContent){
                const data = JSON.parse(jsonContent);
                data.users.push(newUser);
                writeFile(path, JSON.stringify(data, null, 2), (error) => {
                    if (error) {
                        return {
                            success: false,           
                            message: "Error inserting the user.", 
                            data: null,              
                            error: error.message
                        }
                    }
                });

                // Se deu certo

                return {
                    success: true,           
                    message: "User inserted", 
                    data: data.users[data.users.length - 1],              
                    error: null
                }
            }
        }
    } catch (error){
        return {
            success: false,           
            message: "File does not exist or is empty.", 
            data: null,              
            error: error.message             
        };
    }
};

function updateUser(id, updatedUser) { // updatedUser {id, name, email, password, role}
    try {
        if (existsSync(path)) {
            const jsonContent = readFileSync(path, 'utf8');
            if (jsonContent) {
                const data = JSON.parse(jsonContent);
                const userIndex = data.users.findIndex(user => user.id === id); // Encontrar o índice do usuário com o id
                if (userIndex != -1) { // Se o usuário for encontrado
                    data.users[userIndex] = updatedUser;
                    writeFile(path, JSON.stringify(data, null, 2), (error) => {
                        if (error) {
                            return {
                                success: false,           
                                message: "Error updating the user.", 
                                data: null,              
                                error: error.message
                            }
                        }
                    });

                    // Se deu certo

                    return {
                        success: true,           
                        message: "User updated", 
                        data: data.users[userIndex],              
                        error: null
                    }

                }else{
                    return {
                        success: false,
                        message: `User ${id} not found.`,
                        data: null,
                        error: null
                    }
                }
            }
        }
    } catch (error) {
        return {
            success: false,           
            message: "File does not exist or is empty.", 
            data: null,              
            error: error.message             
        };
    }
};

function deleteUser(id){
    try {
        if(existsSync(path)){
            const jsonContent = readFileSync(path, 'utf8');
            if(jsonContent){
                const data = JSON.parse(jsonContent);
                const userIndex = data.users.findIndex(user => user.id === id); 
                data.users.splice(userIndex, 1);
                writeFile(path, JSON.stringify(data, null, 2), (error) => {
                    if (error) {
                        return {
                            success: false,           
                            message: "Error deleting the user.", 
                            data: null,              
                            error: error.message
                        }
                    }
                });

                return {
                    success: true,           
                    message: "User deleted", 
                    data: data,  // sem o usuário deletado           
                    error: null
                }
            }
        }
    } catch (error) {
        return {
            success: false,           
            message: "File does not exist or is empty.", 
            data: null,              
            error: error.message             
        };
    }
};

export {selectUsers, updateUser, deleteUser, insertUser};