import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { ReplyCreateInput } from "../../../inputs/ReplyCreateInput";
import { ReplyUpdateInput } from "../../../inputs/ReplyUpdateInput";
import { ReplyWhereUniqueInput } from "../../../inputs/ReplyWhereUniqueInput";

@TypeGraphQL.ArgsType()
export class UpsertReplyArgs {
  @TypeGraphQL.Field(_type => ReplyWhereUniqueInput, {
    nullable: false
  })
  where!: ReplyWhereUniqueInput;

  @TypeGraphQL.Field(_type => ReplyCreateInput, {
    nullable: false
  })
  create!: ReplyCreateInput;

  @TypeGraphQL.Field(_type => ReplyUpdateInput, {
    nullable: false
  })
  update!: ReplyUpdateInput;
}
