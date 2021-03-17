import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { FollowWhereInput } from "../inputs/FollowWhereInput";

@TypeGraphQL.InputType({
  isAbstract: true
})
export class FollowListRelationFilter {
  @TypeGraphQL.Field(_type => FollowWhereInput, {
    nullable: true
  })
  every?: FollowWhereInput | undefined;

  @TypeGraphQL.Field(_type => FollowWhereInput, {
    nullable: true
  })
  some?: FollowWhereInput | undefined;

  @TypeGraphQL.Field(_type => FollowWhereInput, {
    nullable: true
  })
  none?: FollowWhereInput | undefined;
}
