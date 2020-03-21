import 'reflect-metadata'
import { Arg, Args, Mutation, Query, Resolver, Ctx } from 'type-graphql'
import Projects, { Project, ProjectInput } from '../models/project'
import {PagingArgs} from "./args/pageArgs";

@Resolver(Project)
export class ProjectResolvers {
  @Query(returns => Project)
  async project(@Arg('id') id: string) {
    const obj = await Projects.findById(id)
    if (!obj) {
      throw new Error(id)
    }
    return obj.toObject()
  }

  @Query(returns => [Project])
  async projects(@Args() { skip, limit }: PagingArgs) {
    return (
      await Projects.find()
        .skip(skip)
        .limit(limit)
    ).map(p => p.toObject())
  }

  @Mutation(returns => Project)
  async createProject(@Arg('project') input: ProjectInput, @Ctx('user') user: any): Promise<Project> {
    const model = new Project()

    Object.assign(model, input)
    model.createTime = new Date()
    model.updateTime = new Date()

    const saved: Project = await Projects.create(model)
    return saved
  }

  @Mutation(returns => Project)
  async updateProject(
    @Arg('id') id: string,
    @Arg('project') input: ProjectInput,
    @Ctx('user') user: any,
  ): Promise<Project> {
    const model = await Projects.findById(id)
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
      return !!(await Projects.findOneAndDelete({ _id: id }))
    } catch {
      return false
    }
  }
}
