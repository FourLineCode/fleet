import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { UserCreateOrConnectWithoutReplyInput } from "../inputs/UserCreateOrConnectWithoutReplyInput";
import { UserCreateWithoutReplyInput } from "../inputs/UserCreateWithoutReplyInput";
import { UserUpdateWithoutReplyInput } from "../inputs/UserUpdateWithoutReplyInput";
import { UserUpsertWithoutReplyInput } from "../inputs/UserUpsertWithoutReplyInput";
import { UserWhereUniqueInput } from "../inputs/UserWhereUniqueInput";

@TypeGraphQL.InputType({
  isAbstract: true
})
export class UserUpdateOneRequiredWithoutReplyInput {
  @TypeGraphQL.Field(_type => UserCreateWithoutReplyInput, {
    nullable: true
  })
  create?: UserCreateWithoutReplyInput | undefined;

  @TypeGraphQL.Field(_type => UserCreateOrConnectWithoutReplyInput, {
    nullable: true
  })
  connectOrCreate?: UserCreateOrConnectWithoutReplyInput | undefined;

  @TypeGraphQL.Field(_type => UserUpsertWithoutReplyInput, {
    nullable: true
  })
  upsert?: UserUpsertWithoutReplyInput | undefined;

  @TypeGraphQL.Field(_type => UserWhereUniqueInput, {
    nullable: true
  })
  connect?: UserWhereUniqueInput | undefined;

  @TypeGraphQL.Field(_type => UserUpdateWithoutReplyInput, {
    nullable: true
  })
  update?: UserUpdateWithoutReplyInput | undefined;
}
