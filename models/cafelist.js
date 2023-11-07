module.exports = (sequelize, DataTypes) => {
    const cafelist = sequelize.define('cafelist', {
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
        address: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        latitude: {
            type: DataTypes.STRING
        },
        longitude: {
            type: DataTypes.STRING
        },
    },{
        timestamps:false,
        freezeTableName:true
    });
    return cafelist;
};