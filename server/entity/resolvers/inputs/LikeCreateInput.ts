import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { FleetCreateNestedOneWithoutLikeInput } from "../inputs/FleetCreateNestedOneWithoutLikeInput";
import { UserCreateNestedOneWithoutLikeInput } from "../inputs/UserCreateNestedOneWithoutLikeInput";

@TypeGraphQL.InputType({
  isAbstract: true
})
export class LikeCreateInput {
  @TypeGraphQL.Field(_type => Date, {
    nullable: true
  })
  createdAt?: Date | undefined;

  @TypeGraphQL.Field(_type => Date, {
    nullable: true
  })
  updatedAt?: Date | undefined;

  @TypeGraphQL.Field(_type => FleetCreateNestedOneWithoutLikeInput, {
    nullable: false
  })
  fleet!: FleetCreateNestedOneWithoutLikeInput;

  @TypeGraphQL.Field(_type => UserCreateNestedOneWithoutLikeInput, {
    nullable: false
  })
  user!: UserCreateNestedOneWithoutLikeInput;
}
