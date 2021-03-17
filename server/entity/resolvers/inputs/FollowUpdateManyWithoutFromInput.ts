import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { FollowCreateOrConnectWithoutFromInput } from "../inputs/FollowCreateOrConnectWithoutFromInput";
import { FollowCreateWithoutFromInput } from "../inputs/FollowCreateWithoutFromInput";
import { FollowScalarWhereInput } from "../inputs/FollowScalarWhereInput";
import { FollowUpdateManyWithWhereWithoutFromInput } from "../inputs/FollowUpdateManyWithWhereWithoutFromInput";
import { FollowUpdateWithWhereUniqueWithoutFromInput } from "../inputs/FollowUpdateWithWhereUniqueWithoutFromInput";
import { FollowUpsertWithWhereUniqueWithoutFromInput } from "../inputs/FollowUpsertWithWhereUniqueWithoutFromInput";
import { FollowWhereUniqueInput } from "../inputs/FollowWhereUniqueInput";

@TypeGraphQL.InputType({
  isAbstract: true
})
export class FollowUpdateManyWithoutFromInput {
  @TypeGraphQL.Field(_type => [FollowCreateWithoutFromInput], {
    nullable: true
  })
  create?: FollowCreateWithoutFromInput[] | undefined;

  @TypeGraphQL.Field(_type => [FollowCreateOrConnectWithoutFromInput], {
    nullable: true
  })
  connectOrCreate?: FollowCreateOrConnectWithoutFromInput[] | undefined;

  @TypeGraphQL.Field(_type => [FollowUpsertWithWhereUniqueWithoutFromInput], {
    nullable: true
  })
  upsert?: FollowUpsertWithWhereUniqueWithoutFromInput[] | undefined;

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

  @TypeGraphQL.Field(_type => [FollowUpdateWithWhereUniqueWithoutFromInput], {
    nullable: true
  })
  update?: FollowUpdateWithWhereUniqueWithoutFromInput[] | undefined;

  @TypeGraphQL.Field(_type => [FollowUpdateManyWithWhereWithoutFromInput], {
    nullable: true
  })
  updateMany?: FollowUpdateManyWithWhereWithoutFromInput[] | undefined;

  @TypeGraphQL.Field(_type => [FollowScalarWhereInput], {
    nullable: true
  })
  deleteMany?: FollowScalarWhereInput[] | undefined;
}
