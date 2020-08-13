'use strict'

const User = use('App/Models/User')

class UserController {
  async store ({ request }) {
    // request.all -> você pegaria todos os dados da request.
    const data = request.only(['username', 'email', 'password'])

    const user = await User.create(data)

    return user
  }
}

module.exports = UserController
