import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { FleetCreateOrConnectWithoutAuthorInput } from "../inputs/FleetCreateOrConnectWithoutAuthorInput";
import { FleetCreateWithoutAuthorInput } from "../inputs/FleetCreateWithoutAuthorInput";
import { FleetWhereUniqueInput } from "../inputs/FleetWhereUniqueInput";

@TypeGraphQL.InputType({
  isAbstract: true
})
export class FleetCreateNestedManyWithoutAuthorInput {
  @TypeGraphQL.Field(_type => [FleetCreateWithoutAuthorInput], {
    nullable: true
  })
  create?: FleetCreateWithoutAuthorInput[] | undefined;

  @TypeGraphQL.Field(_type => [FleetCreateOrConnectWithoutAuthorInput], {
    nullable: true
  })
  connectOrCreate?: FleetCreateOrConnectWithoutAuthorInput[] | undefined;

  @TypeGraphQL.Field(_type => [FleetWhereUniqueInput], {
    nullable: true
  })
  connect?: FleetWhereUniqueInput[] | undefined;
}
