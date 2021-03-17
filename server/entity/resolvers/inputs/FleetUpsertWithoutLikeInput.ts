import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { FleetCreateWithoutLikeInput } from "../inputs/FleetCreateWithoutLikeInput";
import { FleetUpdateWithoutLikeInput } from "../inputs/FleetUpdateWithoutLikeInput";

@TypeGraphQL.InputType({
  isAbstract: true
})
export class FleetUpsertWithoutLikeInput {
  @TypeGraphQL.Field(_type => FleetUpdateWithoutLikeInput, {
    nullable: false
  })
  update!: FleetUpdateWithoutLikeInput;

  @TypeGraphQL.Field(_type => FleetCreateWithoutLikeInput, {
    nullable: false
  })
  create!: FleetCreateWithoutLikeInput;
}
