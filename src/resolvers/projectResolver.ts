import 'reflect-metadata'
import { Arg, Args, Mutation, Query, Resolver, Ctx } from 'type-graphql'
import ProjectModel, { Project, ProjectInput } from '../models/project'
import {PagingArgs} from "./args/pageArgs";

@Resolver(Project)
export class ProjectResolvers {
  @Query(returns => Project)
  async project(@Arg('id') id: string) {
    const obj = await ProjectModel.findById(id)
    if (!obj) {
      throw new Error(id)
    }
    return obj.toObject()
  }

  @Query(returns => [Project])
  async projects(@Args() { skip, limit }: PagingArgs) {
    return (
      await ProjectModel.find()
        .skip(skip)
        .limit(limit)
    ).map(p => p.toObject())
  }

  @Mutation(returns => Project)
  async createProject(@Arg('input') input: ProjectInput, @Ctx('user') user: any): Promise<Project> {
    const model = new Project()

    console.log('creating project', input)

    Object.assign(model, input)
    model.createTime = new Date()
    model.updateTime = new Date()

    const saved: Project = await ProjectModel.create(model)
    return saved
  }

  @Mutation(returns => Project)
  async updateProject(
    @Arg('id') id: string,
    @Arg('input') input: ProjectInput,
    @Ctx('user') user: any,
  ): Promise<Project> {
    const model = await ProjectModel.findById(id)
    if (!model) {
      throw Error('not found')
    }
    Object.assign(model, input)
    model.updateTime = new Date()

    return model.save()
  }

  @Mutation(returns => Boolean)
  async deleteProject(@Arg('id') id: string) {
    try {
      return !!(await ProjectModel.findOneAndDelete({ _id: id }))
    } catch {
      return false
    }
  }
}
