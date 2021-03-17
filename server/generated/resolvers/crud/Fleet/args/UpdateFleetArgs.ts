import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { FleetUpdateInput } from "../../../inputs/FleetUpdateInput";
import { FleetWhereUniqueInput } from "../../../inputs/FleetWhereUniqueInput";

@TypeGraphQL.ArgsType()
export class UpdateFleetArgs {
  @TypeGraphQL.Field(_type => FleetUpdateInput, {
    nullable: false
  })
  data!: FleetUpdateInput;

  @TypeGraphQL.Field(_type => FleetWhereUniqueInput, {
    nullable: false
  })
  where!: FleetWhereUniqueInput;
}
