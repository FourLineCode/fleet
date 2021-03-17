import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { FollowCreateOrConnectWithoutFromInput } from "../inputs/FollowCreateOrConnectWithoutFromInput";
import { FollowCreateWithoutFromInput } from "../inputs/FollowCreateWithoutFromInput";
import { FollowWhereUniqueInput } from "../inputs/FollowWhereUniqueInput";

@TypeGraphQL.InputType({
  isAbstract: true
})
export class FollowCreateNestedManyWithoutFromInput {
  @TypeGraphQL.Field(_type => [FollowCreateWithoutFromInput], {
    nullable: true
  })
  create?: FollowCreateWithoutFromInput[] | undefined;

  @TypeGraphQL.Field(_type => [FollowCreateOrConnectWithoutFromInput], {
    nullable: true
  })
  connectOrCreate?: FollowCreateOrConnectWithoutFromInput[] | undefined;

  @TypeGraphQL.Field(_type => [FollowWhereUniqueInput], {
    nullable: true
  })
  connect?: FollowWhereUniqueInput[] | undefined;
}
