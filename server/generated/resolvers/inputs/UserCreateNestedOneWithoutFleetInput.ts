import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { UserCreateOrConnectWithoutFleetInput } from "../inputs/UserCreateOrConnectWithoutFleetInput";
import { UserCreateWithoutFleetInput } from "../inputs/UserCreateWithoutFleetInput";
import { UserWhereUniqueInput } from "../inputs/UserWhereUniqueInput";

@TypeGraphQL.InputType({
  isAbstract: true
})
export class UserCreateNestedOneWithoutFleetInput {
  @TypeGraphQL.Field(_type => UserCreateWithoutFleetInput, {
    nullable: true
  })
  create?: UserCreateWithoutFleetInput | undefined;

  @TypeGraphQL.Field(_type => UserCreateOrConnectWithoutFleetInput, {
    nullable: true
  })
  connectOrCreate?: UserCreateOrConnectWithoutFleetInput | undefined;

  @TypeGraphQL.Field(_type => UserWhereUniqueInput, {
    nullable: true
  })
  connect?: UserWhereUniqueInput | undefined;
}
