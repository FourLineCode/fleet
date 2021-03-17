import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { FleetCreateWithoutReplyInput } from "../inputs/FleetCreateWithoutReplyInput";
import { FleetWhereUniqueInput } from "../inputs/FleetWhereUniqueInput";

@TypeGraphQL.InputType({
  isAbstract: true
})
export class FleetCreateOrConnectWithoutReplyInput {
  @TypeGraphQL.Field(_type => FleetWhereUniqueInput, {
    nullable: false
  })
  where!: FleetWhereUniqueInput;

  @TypeGraphQL.Field(_type => FleetCreateWithoutReplyInput, {
    nullable: false
  })
  create!: FleetCreateWithoutReplyInput;
}
