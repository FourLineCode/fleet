import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { ReplyCreateInput } from "../../../inputs/ReplyCreateInput";

@TypeGraphQL.ArgsType()
export class CreateReplyArgs {
  @TypeGraphQL.Field(_type => ReplyCreateInput, {
    nullable: false
  })
  data!: ReplyCreateInput;
}
