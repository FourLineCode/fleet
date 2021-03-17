import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { FleetCreateWithoutAuthorInput } from "../inputs/FleetCreateWithoutAuthorInput";
import { FleetUpdateWithoutAuthorInput } from "../inputs/FleetUpdateWithoutAuthorInput";
import { FleetWhereUniqueInput } from "../inputs/FleetWhereUniqueInput";

@TypeGraphQL.InputType({
  isAbstract: true
})
export class FleetUpsertWithWhereUniqueWithoutAuthorInput {
  @TypeGraphQL.Field(_type => FleetWhereUniqueInput, {
    nullable: false
  })
  where!: FleetWhereUniqueInput;

  @TypeGraphQL.Field(_type => FleetUpdateWithoutAuthorInput, {
    nullable: false
  })
  update!: FleetUpdateWithoutAuthorInput;

  @TypeGraphQL.Field(_type => FleetCreateWithoutAuthorInput, {
    nullable: false
  })
  create!: FleetCreateWithoutAuthorInput;
}
