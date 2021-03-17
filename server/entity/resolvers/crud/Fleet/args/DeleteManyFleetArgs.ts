import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { FleetWhereInput } from "../../../inputs/FleetWhereInput";

@TypeGraphQL.ArgsType()
export class DeleteManyFleetArgs {
  @TypeGraphQL.Field(_type => FleetWhereInput, {
    nullable: true
  })
  where?: FleetWhereInput | undefined;
}
