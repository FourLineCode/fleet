import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { LikeOrderByInput } from "../../../inputs/LikeOrderByInput";
import { LikeWhereInput } from "../../../inputs/LikeWhereInput";
import { LikeWhereUniqueInput } from "../../../inputs/LikeWhereUniqueInput";
import { LikeScalarFieldEnum } from "../../../../enums/LikeScalarFieldEnum";

@TypeGraphQL.ArgsType()
export class UserLikeArgs {
  @TypeGraphQL.Field(_type => LikeWhereInput, {
    nullable: true
  })
  where?: LikeWhereInput | undefined;

  @TypeGraphQL.Field(_type => [LikeOrderByInput], {
    nullable: true
  })
  orderBy?: LikeOrderByInput[] | undefined;

  @TypeGraphQL.Field(_type => LikeWhereUniqueInput, {
    nullable: true
  })
  cursor?: LikeWhereUniqueInput | undefined;

  @TypeGraphQL.Field(_type => TypeGraphQL.Int, {
    nullable: true
  })
  take?: number | undefined;

  @TypeGraphQL.Field(_type => TypeGraphQL.Int, {
    nullable: true
  })
  skip?: number | undefined;

  @TypeGraphQL.Field(_type => [LikeScalarFieldEnum], {
    nullable: true
  })
  distinct?: Array<"id" | "createdAt" | "updatedAt" | "fleetId" | "userId"> | undefined;
}
