import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { FleetCreateOrConnectWithoutReplyInput } from "../inputs/FleetCreateOrConnectWithoutReplyInput";
import { FleetCreateWithoutReplyInput } from "../inputs/FleetCreateWithoutReplyInput";
import { FleetWhereUniqueInput } from "../inputs/FleetWhereUniqueInput";

@TypeGraphQL.InputType({
  isAbstract: true
})
export class FleetCreateNestedOneWithoutReplyInput {
  @TypeGraphQL.Field(_type => FleetCreateWithoutReplyInput, {
    nullable: true
  })
  create?: FleetCreateWithoutReplyInput | undefined;

  @TypeGraphQL.Field(_type => FleetCreateOrConnectWithoutReplyInput, {
    nullable: true
  })
  connectOrCreate?: FleetCreateOrConnectWithoutReplyInput | undefined;

  @TypeGraphQL.Field(_type => FleetWhereUniqueInput, {
    nullable: true
  })
  connect?: FleetWhereUniqueInput | undefined;
}
