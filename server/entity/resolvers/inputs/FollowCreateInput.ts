import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { UserCreateNestedOneWithoutFollowersInput } from "../inputs/UserCreateNestedOneWithoutFollowersInput";
import { UserCreateNestedOneWithoutFollowingInput } from "../inputs/UserCreateNestedOneWithoutFollowingInput";

@TypeGraphQL.InputType({
  isAbstract: true
})
export class FollowCreateInput {
  @TypeGraphQL.Field(_type => Date, {
    nullable: true
  })
  createdAt?: Date | undefined;

  @TypeGraphQL.Field(_type => Date, {
    nullable: true
  })
  updatedAt?: Date | undefined;

  @TypeGraphQL.Field(_type => UserCreateNestedOneWithoutFollowersInput, {
    nullable: false
  })
  from!: UserCreateNestedOneWithoutFollowersInput;

  @TypeGraphQL.Field(_type => UserCreateNestedOneWithoutFollowingInput, {
    nullable: false
  })
  to!: UserCreateNestedOneWithoutFollowingInput;
}
