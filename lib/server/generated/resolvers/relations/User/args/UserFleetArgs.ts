import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { FleetOrderByInput } from "../../../inputs/FleetOrderByInput";
import { FleetWhereInput } from "../../../inputs/FleetWhereInput";
import { FleetWhereUniqueInput } from "../../../inputs/FleetWhereUniqueInput";
import { FleetScalarFieldEnum } from "../../../../enums/FleetScalarFieldEnum";

@TypeGraphQL.ArgsType()
export class UserFleetArgs {
  @TypeGraphQL.Field(_type => FleetWhereInput, {
    nullable: true
  })
  where?: FleetWhereInput | undefined;

  @TypeGraphQL.Field(_type => [FleetOrderByInput], {
    nullable: true
  })
  orderBy?: FleetOrderByInput[] | undefined;

  @TypeGraphQL.Field(_type => FleetWhereUniqueInput, {
    nullable: true
  })
  cursor?: FleetWhereUniqueInput | undefined;

  @TypeGraphQL.Field(_type => TypeGraphQL.Int, {
    nullable: true
  })
  take?: number | undefined;

  @TypeGraphQL.Field(_type => TypeGraphQL.Int, {
    nullable: true
  })
  skip?: number | undefined;

  @TypeGraphQL.Field(_type => [FleetScalarFieldEnum], {
    nullable: true
  })
  distinct?: Array<"id" | "createdAt" | "updatedAt" | "body" | "authorId"> | undefined;
}
