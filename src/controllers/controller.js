import usersService from '../services/service.js';
import createResponse from '../utils/responses.js';
import jwt from 'jsonwebtoken';

export default function usersController(){
  return {
    login: (req, res) => {

        if(!req.body){
            return createResponse().badRequest(res, 'Required request body is missing.');
        }
        if(!req.body.email || !req.body.password) {
            return createResponse().badRequest(res, 'Email and Password are required');
        }

        const user = usersService().login(req.body.email, req.body.password);

        if(!user) {
            return createResponse().unauthorized(res, 'Invalid email or password.');
        }

        console.log("Login successful!" + user);
        createResponse().ok(res, { message: 'Login successful!', user });
    },
    getUsers: (req, res) => {
        createResponse().ok(res, usersService().returnUsers());
    },
    createUser: (req, res) => {
        console.log("Post received:" + req.body);

         if(!req.body){
            return createResponse().badRequest(res, 'Required request body is missing.');
        }

        const { name, email, password, role } = req.body;

        if (!name || !email || !password || !role) {
            return createResponse().badRequest(res, 'Name, Email, Password, Role are required');
        };

        if (usersService().existsUserByEmail(email)) {
            return createResponse().badRequest(res, 'This email already exists.');
        }

        const newUser = usersService().addUser({
            name,
            email,
            password,
            role
        });

        console.log("User created successfully!");
        return createResponse().created(res, {
            message: 'User created successfully!',
            data: newUser
        });
        
    },
    updateUser: (req, res) => {
        console.log("Put received:" + req.body);
        
        if(!req.body){
            return createResponse().badRequest(res, 'Required request body is missing.');
        }

        if(req.body.password){
            return createResponse().unauthorized(res, 'Changing password is not allowed.')
        }

       const { name, email, role } = req.body;

        if (!name || !email || !role) {
            return createResponse().badRequest(res, 'Name, Email, Role are required');
        };

        const updatedUser = {
            id: req.params.id,
            name,
            email,
            role
        };

        console.log(updatedUser.id);

        if(!usersService().updateUser(updatedUser)){
            return createResponse().notFound(res, 'User not found.');
        }
            
        console.log("User updated successfully!");
        return createResponse().created(res, {
            message: 'User updated successfully!',
            data: {
                id: updatedUser.id,
                name,
                email,
                role
            }
        });
    },
    deleteUser: (req, res) => {
        console.log("Delete received:" + req.body);

        if (usersService().deleteUser(req.params.id)) { 
            console.log("User deleted successfully!");
            return createResponse().ok(res, {
                message: 'User deleted successfully!',
            });
        } else {
            return createResponse().notFound(res, 'User not found.');
        }
    },
    getProfile: (req, res) => {

        const {authorization} = req.headers;

        if(!authorization) {
            return createResponse().unauthorized(res, 'Authorization header is missing.');
        }   

        const authorizationSplited = req.headers.authorization.split(' ');

        if(authorizationSplited[0] !== "Bearer"){
            return createResponse().badRequest(res, "The Authorization header is malformed. Expected format: 'Bearer <token>'");
        }

        try {
            const tokenVerified = jwt.verify(authorizationSplited[1], process.env.JWT_SECRET);
            
            const user = usersService().findById(tokenVerified.id);

            return createResponse().ok(res, user);

        } catch (error) {
            return createResponse().unauthorized(res, error);
        }
    } 
  };
};