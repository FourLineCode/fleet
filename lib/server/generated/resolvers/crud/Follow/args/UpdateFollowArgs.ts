import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { FollowUpdateInput } from "../../../inputs/FollowUpdateInput";
import { FollowWhereUniqueInput } from "../../../inputs/FollowWhereUniqueInput";

@TypeGraphQL.ArgsType()
export class UpdateFollowArgs {
  @TypeGraphQL.Field(_type => FollowUpdateInput, {
    nullable: false
  })
  data!: FollowUpdateInput;

  @TypeGraphQL.Field(_type => FollowWhereUniqueInput, {
    nullable: false
  })
  where!: FollowWhereUniqueInput;
}
