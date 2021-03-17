import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { FollowCreateOrConnectWithoutToInput } from "../inputs/FollowCreateOrConnectWithoutToInput";
import { FollowCreateWithoutToInput } from "../inputs/FollowCreateWithoutToInput";
import { FollowScalarWhereInput } from "../inputs/FollowScalarWhereInput";
import { FollowUpdateManyWithWhereWithoutToInput } from "../inputs/FollowUpdateManyWithWhereWithoutToInput";
import { FollowUpdateWithWhereUniqueWithoutToInput } from "../inputs/FollowUpdateWithWhereUniqueWithoutToInput";
import { FollowUpsertWithWhereUniqueWithoutToInput } from "../inputs/FollowUpsertWithWhereUniqueWithoutToInput";
import { FollowWhereUniqueInput } from "../inputs/FollowWhereUniqueInput";

@TypeGraphQL.InputType({
  isAbstract: true
})
export class FollowUpdateManyWithoutToInput {
  @TypeGraphQL.Field(_type => [FollowCreateWithoutToInput], {
    nullable: true
  })
  create?: FollowCreateWithoutToInput[] | undefined;

  @TypeGraphQL.Field(_type => [FollowCreateOrConnectWithoutToInput], {
    nullable: true
  })
  connectOrCreate?: FollowCreateOrConnectWithoutToInput[] | undefined;

  @TypeGraphQL.Field(_type => [FollowUpsertWithWhereUniqueWithoutToInput], {
    nullable: true
  })
  upsert?: FollowUpsertWithWhereUniqueWithoutToInput[] | undefined;

  @TypeGraphQL.Field(_type => [FollowWhereUniqueInput], {
    nullable: true
  })
  connect?: FollowWhereUniqueInput[] | undefined;

  @TypeGraphQL.Field(_type => [FollowWhereUniqueInput], {
    nullable: true
  })
  set?: FollowWhereUniqueInput[] | undefined;

  @TypeGraphQL.Field(_type => [FollowWhereUniqueInput], {
    nullable: true
  })
  disconnect?: FollowWhereUniqueInput[] | undefined;

  @TypeGraphQL.Field(_type => [FollowWhereUniqueInput], {
    nullable: true
  })
  delete?: FollowWhereUniqueInput[] | undefined;

  @TypeGraphQL.Field(_type => [FollowUpdateWithWhereUniqueWithoutToInput], {
    nullable: true
  })
  update?: FollowUpdateWithWhereUniqueWithoutToInput[] | undefined;

  @TypeGraphQL.Field(_type => [FollowUpdateManyWithWhereWithoutToInput], {
    nullable: true
  })
  updateMany?: FollowUpdateManyWithWhereWithoutToInput[] | undefined;

  @TypeGraphQL.Field(_type => [FollowScalarWhereInput], {
    nullable: true
  })
  deleteMany?: FollowScalarWhereInput[] | undefined;
}
