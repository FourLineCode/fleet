import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { FollowOrderByInput } from "../../../inputs/FollowOrderByInput";
import { FollowWhereInput } from "../../../inputs/FollowWhereInput";
import { FollowWhereUniqueInput } from "../../../inputs/FollowWhereUniqueInput";

@TypeGraphQL.ArgsType()
export class AggregateFollowArgs {
  @TypeGraphQL.Field(_type => FollowWhereInput, {
    nullable: true
  })
  where?: FollowWhereInput | undefined;

  @TypeGraphQL.Field(_type => [FollowOrderByInput], {
    nullable: true
  })
  orderBy?: FollowOrderByInput[] | undefined;

  @TypeGraphQL.Field(_type => FollowWhereUniqueInput, {
    nullable: true
  })
  cursor?: FollowWhereUniqueInput | undefined;

  @TypeGraphQL.Field(_type => TypeGraphQL.Int, {
    nullable: true
  })
  take?: number | undefined;

  @TypeGraphQL.Field(_type => TypeGraphQL.Int, {
    nullable: true
  })
  skip?: number | undefined;
}
