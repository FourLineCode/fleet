import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { FollowCreateInput } from "../../../inputs/FollowCreateInput";
import { FollowUpdateInput } from "../../../inputs/FollowUpdateInput";
import { FollowWhereUniqueInput } from "../../../inputs/FollowWhereUniqueInput";

@TypeGraphQL.ArgsType()
export class UpsertFollowArgs {
  @TypeGraphQL.Field(_type => FollowWhereUniqueInput, {
    nullable: false
  })
  where!: FollowWhereUniqueInput;

  @TypeGraphQL.Field(_type => FollowCreateInput, {
    nullable: false
  })
  create!: FollowCreateInput;

  @TypeGraphQL.Field(_type => FollowUpdateInput, {
    nullable: false
  })
  update!: FollowUpdateInput;
}
