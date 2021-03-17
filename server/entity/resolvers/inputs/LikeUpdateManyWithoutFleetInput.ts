import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { LikeCreateOrConnectWithoutFleetInput } from "../inputs/LikeCreateOrConnectWithoutFleetInput";
import { LikeCreateWithoutFleetInput } from "../inputs/LikeCreateWithoutFleetInput";
import { LikeScalarWhereInput } from "../inputs/LikeScalarWhereInput";
import { LikeUpdateManyWithWhereWithoutFleetInput } from "../inputs/LikeUpdateManyWithWhereWithoutFleetInput";
import { LikeUpdateWithWhereUniqueWithoutFleetInput } from "../inputs/LikeUpdateWithWhereUniqueWithoutFleetInput";
import { LikeUpsertWithWhereUniqueWithoutFleetInput } from "../inputs/LikeUpsertWithWhereUniqueWithoutFleetInput";
import { LikeWhereUniqueInput } from "../inputs/LikeWhereUniqueInput";

@TypeGraphQL.InputType({
  isAbstract: true
})
export class LikeUpdateManyWithoutFleetInput {
  @TypeGraphQL.Field(_type => [LikeCreateWithoutFleetInput], {
    nullable: true
  })
  create?: LikeCreateWithoutFleetInput[] | undefined;

  @TypeGraphQL.Field(_type => [LikeCreateOrConnectWithoutFleetInput], {
    nullable: true
  })
  connectOrCreate?: LikeCreateOrConnectWithoutFleetInput[] | undefined;

  @TypeGraphQL.Field(_type => [LikeUpsertWithWhereUniqueWithoutFleetInput], {
    nullable: true
  })
  upsert?: LikeUpsertWithWhereUniqueWithoutFleetInput[] | undefined;

  @TypeGraphQL.Field(_type => [LikeWhereUniqueInput], {
    nullable: true
  })
  connect?: LikeWhereUniqueInput[] | undefined;

  @TypeGraphQL.Field(_type => [LikeWhereUniqueInput], {
    nullable: true
  })
  set?: LikeWhereUniqueInput[] | undefined;

  @TypeGraphQL.Field(_type => [LikeWhereUniqueInput], {
    nullable: true
  })
  disconnect?: LikeWhereUniqueInput[] | undefined;

  @TypeGraphQL.Field(_type => [LikeWhereUniqueInput], {
    nullable: true
  })
  delete?: LikeWhereUniqueInput[] | undefined;

  @TypeGraphQL.Field(_type => [LikeUpdateWithWhereUniqueWithoutFleetInput], {
    nullable: true
  })
  update?: LikeUpdateWithWhereUniqueWithoutFleetInput[] | undefined;

  @TypeGraphQL.Field(_type => [LikeUpdateManyWithWhereWithoutFleetInput], {
    nullable: true
  })
  updateMany?: LikeUpdateManyWithWhereWithoutFleetInput[] | undefined;

  @TypeGraphQL.Field(_type => [LikeScalarWhereInput], {
    nullable: true
  })
  deleteMany?: LikeScalarWhereInput[] | undefined;
}
