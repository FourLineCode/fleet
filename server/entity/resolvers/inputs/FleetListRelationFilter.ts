import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { FleetWhereInput } from "../inputs/FleetWhereInput";

@TypeGraphQL.InputType({
  isAbstract: true
})
export class FleetListRelationFilter {
  @TypeGraphQL.Field(_type => FleetWhereInput, {
    nullable: true
  })
  every?: FleetWhereInput | undefined;

  @TypeGraphQL.Field(_type => FleetWhereInput, {
    nullable: true
  })
  some?: FleetWhereInput | undefined;

  @TypeGraphQL.Field(_type => FleetWhereInput, {
    nullable: true
  })
  none?: FleetWhereInput | undefined;
}
