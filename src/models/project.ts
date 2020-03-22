import { getModelForClass, prop } from '@typegoose/typegoose'
import { Field, InputType, ObjectType } from 'type-graphql'
import { Types } from 'mongoose'

@InputType()
export class ProjectInput {
  @Field()
  name: string

  @Field()
  description: string
}

@ObjectType()
export class Project {
  @Field(type => String)
  _id: Types.ObjectId

  @Field()
  @prop()
  name: string

  @Field()
  @prop()
  createTime: Date

  @Field()
  @prop()
  updateTime: Date
}

const ProjectModel = getModelForClass(Project)

export default ProjectModel
