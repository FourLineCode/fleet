import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { UserCreateWithoutFleetInput } from "../inputs/UserCreateWithoutFleetInput";
import { UserUpdateWithoutFleetInput } from "../inputs/UserUpdateWithoutFleetInput";

@TypeGraphQL.InputType({
  isAbstract: true
})
export class UserUpsertWithoutFleetInput {
  @TypeGraphQL.Field(_type => UserUpdateWithoutFleetInput, {
    nullable: false
  })
  update!: UserUpdateWithoutFleetInput;

  @TypeGraphQL.Field(_type => UserCreateWithoutFleetInput, {
    nullable: false
  })
  create!: UserCreateWithoutFleetInput;
}
