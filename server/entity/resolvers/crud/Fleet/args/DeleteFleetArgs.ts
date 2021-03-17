import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { FleetWhereUniqueInput } from "../../../inputs/FleetWhereUniqueInput";

@TypeGraphQL.ArgsType()
export class DeleteFleetArgs {
  @TypeGraphQL.Field(_type => FleetWhereUniqueInput, {
    nullable: false
  })
  where!: FleetWhereUniqueInput;
}
