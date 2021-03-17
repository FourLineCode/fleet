import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { FleetCreateWithoutAuthorInput } from "../inputs/FleetCreateWithoutAuthorInput";
import { FleetWhereUniqueInput } from "../inputs/FleetWhereUniqueInput";

@TypeGraphQL.InputType({
  isAbstract: true
})
export class FleetCreateOrConnectWithoutAuthorInput {
  @TypeGraphQL.Field(_type => FleetWhereUniqueInput, {
    nullable: false
  })
  where!: FleetWhereUniqueInput;

  @TypeGraphQL.Field(_type => FleetCreateWithoutAuthorInput, {
    nullable: false
  })
  create!: FleetCreateWithoutAuthorInput;
}
