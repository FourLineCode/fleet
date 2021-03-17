import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { UserCreateOrConnectWithoutFollowersInput } from "../inputs/UserCreateOrConnectWithoutFollowersInput";
import { UserCreateWithoutFollowersInput } from "../inputs/UserCreateWithoutFollowersInput";
import { UserUpdateWithoutFollowersInput } from "../inputs/UserUpdateWithoutFollowersInput";
import { UserUpsertWithoutFollowersInput } from "../inputs/UserUpsertWithoutFollowersInput";
import { UserWhereUniqueInput } from "../inputs/UserWhereUniqueInput";

@TypeGraphQL.InputType({
  isAbstract: true
})
export class UserUpdateOneRequiredWithoutFollowersInput {
  @TypeGraphQL.Field(_type => UserCreateWithoutFollowersInput, {
    nullable: true
  })
  create?: UserCreateWithoutFollowersInput | undefined;

  @TypeGraphQL.Field(_type => UserCreateOrConnectWithoutFollowersInput, {
    nullable: true
  })
  connectOrCreate?: UserCreateOrConnectWithoutFollowersInput | undefined;

  @TypeGraphQL.Field(_type => UserUpsertWithoutFollowersInput, {
    nullable: true
  })
  upsert?: UserUpsertWithoutFollowersInput | undefined;

  @TypeGraphQL.Field(_type => UserWhereUniqueInput, {
    nullable: true
  })
  connect?: UserWhereUniqueInput | undefined;

  @TypeGraphQL.Field(_type => UserUpdateWithoutFollowersInput, {
    nullable: true
  })
  update?: UserUpdateWithoutFollowersInput | undefined;
}
