import Sequelize, { Model } from 'sequelize';
import { isBefore, subHours } from 'date-fns';

class Appointment extends Model {
  static init(sequelize) {
    super.init(
      {
        date: Sequelize.DATE,
        canceled_at: Sequelize.DATE,
        past: {
          type: Sequelize.VIRTUAL,
          get() {
            return isBefore(this.date, new Date());
          },
        },
        cancelable: {
          type: Sequelize.VIRTUAL,
          get() {
            return isBefore(new Date(), subHours(this.date, 2));
          },
        },
      },
      {
        sequelize,
        freezeTableName: true,
        modelName: 'appointments',
      }
    );
    return this;
  }

  static associate(models) {
    this.belongsTo(models.users, {
      foreignKey: 'user_id',
      as: 'user',
      targetKey: 'id',
    });
    this.belongsTo(models.users, {
      foreignKey: 'provider_id',
      as: 'provider',
      targetKey: 'id',
    });
  }
}

export default Appointment;
