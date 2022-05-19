const { sequelize, Sequelize } = require('../config/sequelize');
const db = require('../models/model');

controllerUser = {
    create: async (userData) => {
        try{
            await db.user.create(userData);
            return userData;
        }

        catch (error){
            console.log(error);
        }
    },
    
    delete: async (id) => {
        try{
            let userDeleted = await db.user.destroy({
                where: {
                    id: id
                }
            })
            return userDeleted;
        }
        
        catch(error) {
            console.log(error);
        }

    },

    update: async (id, data) => {
        try{
           const user = await db.user.update(data, {where: {id: id}})
            return user;
        }
        
        catch(error) {
            console.log(error);
        }
    },
    
    index: async () => {
        try{
            let users = await db.user.findAll();
            
            users.map((item) => {
                console.log(item);
            })
            return users;
        }

        catch(error){
            console.log(error);
        }
    },

    show: async (id) => {
        let user = await db.user.findOne({
            where: {
                id: id
            }
        })
        return user;
    }
}

module.exports = controllerUser
