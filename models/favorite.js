module.exports = (sequelize, DataTypes) => {
    const favorite = sequelize.define('favorite', {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        cafeshopId:{
            type: DataTypes.INTEGER,
            allowNull:false,
        },
        userId:{
            type: DataTypes.INTEGER,
            allowNull:false,
        },
    },{
        timestamps:false,
        freezeTableName:true
    });
    return favorite;
};