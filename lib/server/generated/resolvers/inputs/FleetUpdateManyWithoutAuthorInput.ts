import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { FleetCreateOrConnectWithoutAuthorInput } from "../inputs/FleetCreateOrConnectWithoutAuthorInput";
import { FleetCreateWithoutAuthorInput } from "../inputs/FleetCreateWithoutAuthorInput";
import { FleetScalarWhereInput } from "../inputs/FleetScalarWhereInput";
import { FleetUpdateManyWithWhereWithoutAuthorInput } from "../inputs/FleetUpdateManyWithWhereWithoutAuthorInput";
import { FleetUpdateWithWhereUniqueWithoutAuthorInput } from "../inputs/FleetUpdateWithWhereUniqueWithoutAuthorInput";
import { FleetUpsertWithWhereUniqueWithoutAuthorInput } from "../inputs/FleetUpsertWithWhereUniqueWithoutAuthorInput";
import { FleetWhereUniqueInput } from "../inputs/FleetWhereUniqueInput";

@TypeGraphQL.InputType({
  isAbstract: true
})
export class FleetUpdateManyWithoutAuthorInput {
  @TypeGraphQL.Field(_type => [FleetCreateWithoutAuthorInput], {
    nullable: true
  })
  create?: FleetCreateWithoutAuthorInput[] | undefined;

  @TypeGraphQL.Field(_type => [FleetCreateOrConnectWithoutAuthorInput], {
    nullable: true
  })
  connectOrCreate?: FleetCreateOrConnectWithoutAuthorInput[] | undefined;

  @TypeGraphQL.Field(_type => [FleetUpsertWithWhereUniqueWithoutAuthorInput], {
    nullable: true
  })
  upsert?: FleetUpsertWithWhereUniqueWithoutAuthorInput[] | undefined;

  @TypeGraphQL.Field(_type => [FleetWhereUniqueInput], {
    nullable: true
  })
  connect?: FleetWhereUniqueInput[] | undefined;

  @TypeGraphQL.Field(_type => [FleetWhereUniqueInput], {
    nullable: true
  })
  set?: FleetWhereUniqueInput[] | undefined;

  @TypeGraphQL.Field(_type => [FleetWhereUniqueInput], {
    nullable: true
  })
  disconnect?: FleetWhereUniqueInput[] | undefined;

  @TypeGraphQL.Field(_type => [FleetWhereUniqueInput], {
    nullable: true
  })
  delete?: FleetWhereUniqueInput[] | undefined;

  @TypeGraphQL.Field(_type => [FleetUpdateWithWhereUniqueWithoutAuthorInput], {
    nullable: true
  })
  update?: FleetUpdateWithWhereUniqueWithoutAuthorInput[] | undefined;

  @TypeGraphQL.Field(_type => [FleetUpdateManyWithWhereWithoutAuthorInput], {
    nullable: true
  })
  updateMany?: FleetUpdateManyWithWhereWithoutAuthorInput[] | undefined;

  @TypeGraphQL.Field(_type => [FleetScalarWhereInput], {
    nullable: true
  })
  deleteMany?: FleetScalarWhereInput[] | undefined;
}
