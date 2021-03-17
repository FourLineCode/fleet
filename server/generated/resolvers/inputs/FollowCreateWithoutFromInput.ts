import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { UserCreateNestedOneWithoutFollowingInput } from "../inputs/UserCreateNestedOneWithoutFollowingInput";

@TypeGraphQL.InputType({
  isAbstract: true
})
export class FollowCreateWithoutFromInput {
  @TypeGraphQL.Field(_type => Date, {
    nullable: true
  })
  createdAt?: Date | undefined;

  @TypeGraphQL.Field(_type => Date, {
    nullable: true
  })
  updatedAt?: Date | undefined;

  @TypeGraphQL.Field(_type => UserCreateNestedOneWithoutFollowingInput, {
    nullable: false
  })
  to!: UserCreateNestedOneWithoutFollowingInput;
}
