import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { UserCreateNestedOneWithoutLikeInput } from "../inputs/UserCreateNestedOneWithoutLikeInput";

@TypeGraphQL.InputType({
  isAbstract: true
})
export class LikeCreateWithoutFleetInput {
  @TypeGraphQL.Field(_type => Date, {
    nullable: true
  })
  createdAt?: Date | undefined;

  @TypeGraphQL.Field(_type => Date, {
    nullable: true
  })
  updatedAt?: Date | undefined;

  @TypeGraphQL.Field(_type => UserCreateNestedOneWithoutLikeInput, {
    nullable: false
  })
  user!: UserCreateNestedOneWithoutLikeInput;
}
