import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { LikeUpdateManyMutationInput } from "../../../inputs/LikeUpdateManyMutationInput";
import { LikeWhereInput } from "../../../inputs/LikeWhereInput";

@TypeGraphQL.ArgsType()
export class UpdateManyLikeArgs {
  @TypeGraphQL.Field(_type => LikeUpdateManyMutationInput, {
    nullable: false
  })
  data!: LikeUpdateManyMutationInput;

  @TypeGraphQL.Field(_type => LikeWhereInput, {
    nullable: true
  })
  where?: LikeWhereInput | undefined;
}
