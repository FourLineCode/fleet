import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { FleetScalarWhereInput } from "../inputs/FleetScalarWhereInput";
import { FleetUpdateManyMutationInput } from "../inputs/FleetUpdateManyMutationInput";

@TypeGraphQL.InputType({
  isAbstract: true
})
export class FleetUpdateManyWithWhereWithoutAuthorInput {
  @TypeGraphQL.Field(_type => FleetScalarWhereInput, {
    nullable: false
  })
  where!: FleetScalarWhereInput;

  @TypeGraphQL.Field(_type => FleetUpdateManyMutationInput, {
    nullable: false
  })
  data!: FleetUpdateManyMutationInput;
}
