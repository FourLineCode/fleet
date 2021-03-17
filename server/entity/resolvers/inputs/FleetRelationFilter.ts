import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { FleetWhereInput } from "../inputs/FleetWhereInput";

@TypeGraphQL.InputType({
  isAbstract: true
})
export class FleetRelationFilter {
  @TypeGraphQL.Field(_type => FleetWhereInput, {
    nullable: true
  })
  is?: FleetWhereInput | undefined;

  @TypeGraphQL.Field(_type => FleetWhereInput, {
    nullable: true
  })
  isNot?: FleetWhereInput | undefined;
}
