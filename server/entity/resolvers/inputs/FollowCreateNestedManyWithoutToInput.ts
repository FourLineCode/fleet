import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { FollowCreateOrConnectWithoutToInput } from "../inputs/FollowCreateOrConnectWithoutToInput";
import { FollowCreateWithoutToInput } from "../inputs/FollowCreateWithoutToInput";
import { FollowWhereUniqueInput } from "../inputs/FollowWhereUniqueInput";

@TypeGraphQL.InputType({
  isAbstract: true
})
export class FollowCreateNestedManyWithoutToInput {
  @TypeGraphQL.Field(_type => [FollowCreateWithoutToInput], {
    nullable: true
  })
  create?: FollowCreateWithoutToInput[] | undefined;

  @TypeGraphQL.Field(_type => [FollowCreateOrConnectWithoutToInput], {
    nullable: true
  })
  connectOrCreate?: FollowCreateOrConnectWithoutToInput[] | undefined;

  @TypeGraphQL.Field(_type => [FollowWhereUniqueInput], {
    nullable: true
  })
  connect?: FollowWhereUniqueInput[] | undefined;
}
