import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { FleetCreateInput } from "../../../inputs/FleetCreateInput";

@TypeGraphQL.ArgsType()
export class CreateFleetArgs {
  @TypeGraphQL.Field(_type => FleetCreateInput, {
    nullable: false
  })
  data!: FleetCreateInput;
}
