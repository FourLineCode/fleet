import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { FollowCreateWithoutToInput } from "../inputs/FollowCreateWithoutToInput";
import { FollowWhereUniqueInput } from "../inputs/FollowWhereUniqueInput";

@TypeGraphQL.InputType({
  isAbstract: true
})
export class FollowCreateOrConnectWithoutToInput {
  @TypeGraphQL.Field(_type => FollowWhereUniqueInput, {
    nullable: false
  })
  where!: FollowWhereUniqueInput;

  @TypeGraphQL.Field(_type => FollowCreateWithoutToInput, {
    nullable: false
  })
  create!: FollowCreateWithoutToInput;
}
