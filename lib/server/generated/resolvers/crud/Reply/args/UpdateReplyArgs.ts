import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { ReplyUpdateInput } from "../../../inputs/ReplyUpdateInput";
import { ReplyWhereUniqueInput } from "../../../inputs/ReplyWhereUniqueInput";

@TypeGraphQL.ArgsType()
export class UpdateReplyArgs {
  @TypeGraphQL.Field(_type => ReplyUpdateInput, {
    nullable: false
  })
  data!: ReplyUpdateInput;

  @TypeGraphQL.Field(_type => ReplyWhereUniqueInput, {
    nullable: false
  })
  where!: ReplyWhereUniqueInput;
}
