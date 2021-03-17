import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { FollowWhereUniqueInput } from "../../../inputs/FollowWhereUniqueInput";

@TypeGraphQL.ArgsType()
export class FindUniqueFollowArgs {
  @TypeGraphQL.Field(_type => FollowWhereUniqueInput, {
    nullable: false
  })
  where!: FollowWhereUniqueInput;
}
