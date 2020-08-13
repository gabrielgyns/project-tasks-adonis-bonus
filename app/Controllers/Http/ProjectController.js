'use strict'

const Project = use('App/Models/Project')

class ProjectController {
  /**
   * Show a list of all projects.
   * GET projects
   */
  async index ({ request }) {
    const { page } = request.get()

    const projects = await Project.query()
      .with('user')
      .paginate(page)

    return projects
  }

  /**
   * Create/save a new project.
   * POST projects
   */
  async store ({ request, auth }) {
    const data = request.only(['title', 'description'])

    const project = await Project.create({ ...data, user_id: auth.user.id })

    return project
  }

  /**
   * Display a single project.
   * GET projects/:id
   */
  async show ({ params }) {
    const project = await Project.findOrFail(params.id)

    await project.load('user') // Traz user junto no get
    await project.load('tasks') // Traz tasks junto no get

    return project
  }

  /**
   * Update project details.
   * PUT or PATCH projects/:id
   */
  async update ({ params, request, response }) {
    try {
      const project = await Project.findOrFail(params.id)
      const data = request.only(['title', 'description'])

      project.merge(data)

      await project.save()

      return project
    } catch (error) {
      return response.status(401).send({ error: { message: 'Erro ao atualizar! Esse id de projeto existe ?' } })
    }
  }

  /**
   * Delete a project with id.
   * DELETE projects/:id
   */
  async destroy ({ params, request, response }) {
    try {
      const project = await Project.findOrFail(params.id)

      await project.delete()
    } catch (error) {
      return response.status(401).send({ error: { message: 'Erro ao deletar! Esse id de projeto existe ?' } })
    }
  }
}

module.exports = ProjectController
