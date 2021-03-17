import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { FollowCreateInput } from "../../../inputs/FollowCreateInput";

@TypeGraphQL.ArgsType()
export class CreateFollowArgs {
  @TypeGraphQL.Field(_type => FollowCreateInput, {
    nullable: false
  })
  data!: FollowCreateInput;
}
