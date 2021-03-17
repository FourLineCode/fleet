import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { FleetCreateWithoutReplyInput } from "../inputs/FleetCreateWithoutReplyInput";
import { FleetUpdateWithoutReplyInput } from "../inputs/FleetUpdateWithoutReplyInput";

@TypeGraphQL.InputType({
  isAbstract: true
})
export class FleetUpsertWithoutReplyInput {
  @TypeGraphQL.Field(_type => FleetUpdateWithoutReplyInput, {
    nullable: false
  })
  update!: FleetUpdateWithoutReplyInput;

  @TypeGraphQL.Field(_type => FleetCreateWithoutReplyInput, {
    nullable: false
  })
  create!: FleetCreateWithoutReplyInput;
}
