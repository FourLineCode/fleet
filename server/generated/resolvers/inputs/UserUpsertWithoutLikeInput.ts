import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { UserCreateWithoutLikeInput } from "../inputs/UserCreateWithoutLikeInput";
import { UserUpdateWithoutLikeInput } from "../inputs/UserUpdateWithoutLikeInput";

@TypeGraphQL.InputType({
  isAbstract: true
})
export class UserUpsertWithoutLikeInput {
  @TypeGraphQL.Field(_type => UserUpdateWithoutLikeInput, {
    nullable: false
  })
  update!: UserUpdateWithoutLikeInput;

  @TypeGraphQL.Field(_type => UserCreateWithoutLikeInput, {
    nullable: false
  })
  create!: UserCreateWithoutLikeInput;
}
