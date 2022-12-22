//create index for models

const Users = require('./Users');
const Posts = require('./Posts');
const Comments = require('./Comments');

//users / posts relationship
Users.hasMany(Posts, {
    foreignKey: 'user_id'
});

Posts.belongsTo(Users, {
    foreignKey: 'user_id',
});

//users / comments relationship
Users.hasMany(Comments, {
    foreignKey: 'user_id',
});

Comments.belongsTo(Users, {
    foreignKey: 'user_id',
});

//posts / comments relationship
Posts.hasMany(Comments, {
    foreignKey: 'post_id',
});

Comments.belongsTo(Posts, {
    foreignKey: 'post_id',
});

module.exports = { Users, Posts, Comments };
