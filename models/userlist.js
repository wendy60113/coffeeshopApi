module.exports = (sequelize, DataTypes) => {
    const userlist = sequelize.define('userlist', {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },{
        timestamps:false,
        freezeTableName:true
    });
    return userlist;
};