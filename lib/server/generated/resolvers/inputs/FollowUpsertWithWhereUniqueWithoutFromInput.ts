import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { FollowCreateWithoutFromInput } from "../inputs/FollowCreateWithoutFromInput";
import { FollowUpdateWithoutFromInput } from "../inputs/FollowUpdateWithoutFromInput";
import { FollowWhereUniqueInput } from "../inputs/FollowWhereUniqueInput";

@TypeGraphQL.InputType({
  isAbstract: true
})
export class FollowUpsertWithWhereUniqueWithoutFromInput {
  @TypeGraphQL.Field(_type => FollowWhereUniqueInput, {
    nullable: false
  })
  where!: FollowWhereUniqueInput;

  @TypeGraphQL.Field(_type => FollowUpdateWithoutFromInput, {
    nullable: false
  })
  update!: FollowUpdateWithoutFromInput;

  @TypeGraphQL.Field(_type => FollowCreateWithoutFromInput, {
    nullable: false
  })
  create!: FollowCreateWithoutFromInput;
}
