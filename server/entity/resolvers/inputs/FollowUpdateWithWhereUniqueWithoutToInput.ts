import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { FollowUpdateWithoutToInput } from "../inputs/FollowUpdateWithoutToInput";
import { FollowWhereUniqueInput } from "../inputs/FollowWhereUniqueInput";

@TypeGraphQL.InputType({
  isAbstract: true
})
export class FollowUpdateWithWhereUniqueWithoutToInput {
  @TypeGraphQL.Field(_type => FollowWhereUniqueInput, {
    nullable: false
  })
  where!: FollowWhereUniqueInput;

  @TypeGraphQL.Field(_type => FollowUpdateWithoutToInput, {
    nullable: false
  })
  data!: FollowUpdateWithoutToInput;
}
