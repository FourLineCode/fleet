import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { FleetCreateNestedOneWithoutLikeInput } from "../inputs/FleetCreateNestedOneWithoutLikeInput";

@TypeGraphQL.InputType({
  isAbstract: true
})
export class LikeCreateWithoutUserInput {
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
}
