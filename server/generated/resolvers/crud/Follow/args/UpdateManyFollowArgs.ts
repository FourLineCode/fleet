import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { FollowUpdateManyMutationInput } from "../../../inputs/FollowUpdateManyMutationInput";
import { FollowWhereInput } from "../../../inputs/FollowWhereInput";

@TypeGraphQL.ArgsType()
export class UpdateManyFollowArgs {
  @TypeGraphQL.Field(_type => FollowUpdateManyMutationInput, {
    nullable: false
  })
  data!: FollowUpdateManyMutationInput;

  @TypeGraphQL.Field(_type => FollowWhereInput, {
    nullable: true
  })
  where?: FollowWhereInput | undefined;
}
