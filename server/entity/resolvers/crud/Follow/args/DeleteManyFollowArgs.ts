import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { FollowWhereInput } from "../../../inputs/FollowWhereInput";

@TypeGraphQL.ArgsType()
export class DeleteManyFollowArgs {
  @TypeGraphQL.Field(_type => FollowWhereInput, {
    nullable: true
  })
  where?: FollowWhereInput | undefined;
}
