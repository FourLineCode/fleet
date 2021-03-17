import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { UserCreateWithoutReplyInput } from "../inputs/UserCreateWithoutReplyInput";
import { UserUpdateWithoutReplyInput } from "../inputs/UserUpdateWithoutReplyInput";

@TypeGraphQL.InputType({
  isAbstract: true
})
export class UserUpsertWithoutReplyInput {
  @TypeGraphQL.Field(_type => UserUpdateWithoutReplyInput, {
    nullable: false
  })
  update!: UserUpdateWithoutReplyInput;

  @TypeGraphQL.Field(_type => UserCreateWithoutReplyInput, {
    nullable: false
  })
  create!: UserCreateWithoutReplyInput;
}
