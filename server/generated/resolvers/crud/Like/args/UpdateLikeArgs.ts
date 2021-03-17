import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { LikeUpdateInput } from "../../../inputs/LikeUpdateInput";
import { LikeWhereUniqueInput } from "../../../inputs/LikeWhereUniqueInput";

@TypeGraphQL.ArgsType()
export class UpdateLikeArgs {
  @TypeGraphQL.Field(_type => LikeUpdateInput, {
    nullable: false
  })
  data!: LikeUpdateInput;

  @TypeGraphQL.Field(_type => LikeWhereUniqueInput, {
    nullable: false
  })
  where!: LikeWhereUniqueInput;
}
