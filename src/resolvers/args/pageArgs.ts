import 'reflect-metadata'
import { ArgsType, Field, Int} from 'type-graphql'

@ArgsType()
export class PagingArgs {
    @Field(type => Int)
    skip: number = 0

    @Field(type => Int)
    limit: number = 25
}
