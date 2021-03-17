import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { FleetCreateOrConnectWithoutLikeInput } from "../inputs/FleetCreateOrConnectWithoutLikeInput";
import { FleetCreateWithoutLikeInput } from "../inputs/FleetCreateWithoutLikeInput";
import { FleetUpdateWithoutLikeInput } from "../inputs/FleetUpdateWithoutLikeInput";
import { FleetUpsertWithoutLikeInput } from "../inputs/FleetUpsertWithoutLikeInput";
import { FleetWhereUniqueInput } from "../inputs/FleetWhereUniqueInput";

@TypeGraphQL.InputType({
  isAbstract: true
})
export class FleetUpdateOneRequiredWithoutLikeInput {
  @TypeGraphQL.Field(_type => FleetCreateWithoutLikeInput, {
    nullable: true
  })
  create?: FleetCreateWithoutLikeInput | undefined;

  @TypeGraphQL.Field(_type => FleetCreateOrConnectWithoutLikeInput, {
    nullable: true
  })
  connectOrCreate?: FleetCreateOrConnectWithoutLikeInput | undefined;

  @TypeGraphQL.Field(_type => FleetUpsertWithoutLikeInput, {
    nullable: true
  })
  upsert?: FleetUpsertWithoutLikeInput | undefined;

  @TypeGraphQL.Field(_type => FleetWhereUniqueInput, {
    nullable: true
  })
  connect?: FleetWhereUniqueInput | undefined;

  @TypeGraphQL.Field(_type => FleetUpdateWithoutLikeInput, {
    nullable: true
  })
  update?: FleetUpdateWithoutLikeInput | undefined;
}
