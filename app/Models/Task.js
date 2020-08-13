'use strict'

const Model = use('Model')

class Task extends Model {
  static boot () {
    super.boot()

    this.addHook('afterCreate', 'TaskHook.sendNewTaskMail')
    this.addHook('beforeUpdate', 'TaskHook.sendNewTaskMail')
  }

  project () {
    return this.belongsTo('App/Models/User')
  }

  user () {
    return this.belongsTo('App/Models/User')
  }

  files () {
    return this.belongsTo('App/Models/File')
  }
}

module.exports = Task
