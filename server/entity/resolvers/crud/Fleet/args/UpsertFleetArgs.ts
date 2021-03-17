import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { FleetCreateInput } from "../../../inputs/FleetCreateInput";
import { FleetUpdateInput } from "../../../inputs/FleetUpdateInput";
import { FleetWhereUniqueInput } from "../../../inputs/FleetWhereUniqueInput";

@TypeGraphQL.ArgsType()
export class UpsertFleetArgs {
  @TypeGraphQL.Field(_type => FleetWhereUniqueInput, {
    nullable: false
  })
  where!: FleetWhereUniqueInput;

  @TypeGraphQL.Field(_type => FleetCreateInput, {
    nullable: false
  })
  create!: FleetCreateInput;

  @TypeGraphQL.Field(_type => FleetUpdateInput, {
    nullable: false
  })
  update!: FleetUpdateInput;
}
