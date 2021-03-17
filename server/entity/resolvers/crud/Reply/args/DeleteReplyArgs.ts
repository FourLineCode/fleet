import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { ReplyWhereUniqueInput } from "../../../inputs/ReplyWhereUniqueInput";

@TypeGraphQL.ArgsType()
export class DeleteReplyArgs {
  @TypeGraphQL.Field(_type => ReplyWhereUniqueInput, {
    nullable: false
  })
  where!: ReplyWhereUniqueInput;
}
