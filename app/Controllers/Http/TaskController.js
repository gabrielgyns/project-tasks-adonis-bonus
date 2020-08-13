'use strict'

const Task = use('App/Models/Task')

class TaskController {
  /**
   * Show a list of all tasks.
   * GET tasks
   */
  async index ({ params, request }) {
    const { page } = request.get()

    const tasks = await Task.query()
      .where('project_id', params.projects_id)
      .with('user')
      .paginate(page)

    return tasks
  }

  /**
   * Create/save a new task.
   * POST tasks
   */
  async store ({ params, request }) {
    const data = request.only(['user_id', 'title', 'description', 'due_date', 'file_id'])

    const task = await Task.create({ ...data, project_id: params.projects_id })

    return task
  }

  /**
   * Display a single task.
   * GET tasks/:id
   */
  async show ({ params, response }) {
    try {
      const task = await Task.findOrFail(params.id)

      return task
    } catch (error) {
      return response.status(401).send({ error: { message: 'Erro ao encontrar tarefa, esse id existe ?' } })
    }
  }

  /**
   * Update task details.
   * PUT or PATCH tasks/:id
   */
  async update ({ params, request, response }) {
    try {
      const task = await Task.findOrFail(params.id)
      const data = request.only(['user_id', 'title', 'description', 'due_date', 'file_id'])

      task.merge(data)

      await task.save()

      return task
    } catch (error) {
      return response.status(401).send({ error: { message: 'Erro ao atualizar tarefa, esse id existe ?' } })
    }
  }

  /**
   * Delete a task with id.
   * DELETE tasks/:id
   */
  async destroy ({ params, response }) {
    try {
      const task = Task.findOrFail(params.id)

      await task.delete()
    } catch (error) {
      return response.status(401).send({ error: { message: 'Erro ao deletar tarefa, esse id existe ?' } })
    }
  }
}

module.exports = TaskController
