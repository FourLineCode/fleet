import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { ReplyWhereUniqueInput } from "../../../inputs/ReplyWhereUniqueInput";

@TypeGraphQL.ArgsType()
export class FindUniqueReplyArgs {
  @TypeGraphQL.Field(_type => ReplyWhereUniqueInput, {
    nullable: false
  })
  where!: ReplyWhereUniqueInput;
}
