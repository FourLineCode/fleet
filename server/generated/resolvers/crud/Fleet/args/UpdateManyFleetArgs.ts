import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { FleetUpdateManyMutationInput } from "../../../inputs/FleetUpdateManyMutationInput";
import { FleetWhereInput } from "../../../inputs/FleetWhereInput";

@TypeGraphQL.ArgsType()
export class UpdateManyFleetArgs {
  @TypeGraphQL.Field(_type => FleetUpdateManyMutationInput, {
    nullable: false
  })
  data!: FleetUpdateManyMutationInput;

  @TypeGraphQL.Field(_type => FleetWhereInput, {
    nullable: true
  })
  where?: FleetWhereInput | undefined;
}
