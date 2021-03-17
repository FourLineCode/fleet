import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { FleetCreateOrConnectWithoutLikeInput } from "../inputs/FleetCreateOrConnectWithoutLikeInput";
import { FleetCreateWithoutLikeInput } from "../inputs/FleetCreateWithoutLikeInput";
import { FleetWhereUniqueInput } from "../inputs/FleetWhereUniqueInput";

@TypeGraphQL.InputType({
  isAbstract: true
})
export class FleetCreateNestedOneWithoutLikeInput {
  @TypeGraphQL.Field(_type => FleetCreateWithoutLikeInput, {
    nullable: true
  })
  create?: FleetCreateWithoutLikeInput | undefined;

  @TypeGraphQL.Field(_type => FleetCreateOrConnectWithoutLikeInput, {
    nullable: true
  })
  connectOrCreate?: FleetCreateOrConnectWithoutLikeInput | undefined;

  @TypeGraphQL.Field(_type => FleetWhereUniqueInput, {
    nullable: true
  })
  connect?: FleetWhereUniqueInput | undefined;
}
