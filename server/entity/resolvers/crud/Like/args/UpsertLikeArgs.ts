import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { LikeCreateInput } from "../../../inputs/LikeCreateInput";
import { LikeUpdateInput } from "../../../inputs/LikeUpdateInput";
import { LikeWhereUniqueInput } from "../../../inputs/LikeWhereUniqueInput";

@TypeGraphQL.ArgsType()
export class UpsertLikeArgs {
  @TypeGraphQL.Field(_type => LikeWhereUniqueInput, {
    nullable: false
  })
  where!: LikeWhereUniqueInput;

  @TypeGraphQL.Field(_type => LikeCreateInput, {
    nullable: false
  })
  create!: LikeCreateInput;

  @TypeGraphQL.Field(_type => LikeUpdateInput, {
    nullable: false
  })
  update!: LikeUpdateInput;
}
