import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { ReplyCreateOrConnectWithoutFleetInput } from "../inputs/ReplyCreateOrConnectWithoutFleetInput";
import { ReplyCreateWithoutFleetInput } from "../inputs/ReplyCreateWithoutFleetInput";
import { ReplyScalarWhereInput } from "../inputs/ReplyScalarWhereInput";
import { ReplyUpdateManyWithWhereWithoutFleetInput } from "../inputs/ReplyUpdateManyWithWhereWithoutFleetInput";
import { ReplyUpdateWithWhereUniqueWithoutFleetInput } from "../inputs/ReplyUpdateWithWhereUniqueWithoutFleetInput";
import { ReplyUpsertWithWhereUniqueWithoutFleetInput } from "../inputs/ReplyUpsertWithWhereUniqueWithoutFleetInput";
import { ReplyWhereUniqueInput } from "../inputs/ReplyWhereUniqueInput";

@TypeGraphQL.InputType({
  isAbstract: true
})
export class ReplyUpdateManyWithoutFleetInput {
  @TypeGraphQL.Field(_type => [ReplyCreateWithoutFleetInput], {
    nullable: true
  })
  create?: ReplyCreateWithoutFleetInput[] | undefined;

  @TypeGraphQL.Field(_type => [ReplyCreateOrConnectWithoutFleetInput], {
    nullable: true
  })
  connectOrCreate?: ReplyCreateOrConnectWithoutFleetInput[] | undefined;

  @TypeGraphQL.Field(_type => [ReplyUpsertWithWhereUniqueWithoutFleetInput], {
    nullable: true
  })
  upsert?: ReplyUpsertWithWhereUniqueWithoutFleetInput[] | undefined;

  @TypeGraphQL.Field(_type => [ReplyWhereUniqueInput], {
    nullable: true
  })
  connect?: ReplyWhereUniqueInput[] | undefined;

  @TypeGraphQL.Field(_type => [ReplyWhereUniqueInput], {
    nullable: true
  })
  set?: ReplyWhereUniqueInput[] | undefined;

  @TypeGraphQL.Field(_type => [ReplyWhereUniqueInput], {
    nullable: true
  })
  disconnect?: ReplyWhereUniqueInput[] | undefined;

  @TypeGraphQL.Field(_type => [ReplyWhereUniqueInput], {
    nullable: true
  })
  delete?: ReplyWhereUniqueInput[] | undefined;

  @TypeGraphQL.Field(_type => [ReplyUpdateWithWhereUniqueWithoutFleetInput], {
    nullable: true
  })
  update?: ReplyUpdateWithWhereUniqueWithoutFleetInput[] | undefined;

  @TypeGraphQL.Field(_type => [ReplyUpdateManyWithWhereWithoutFleetInput], {
    nullable: true
  })
  updateMany?: ReplyUpdateManyWithWhereWithoutFleetInput[] | undefined;

  @TypeGraphQL.Field(_type => [ReplyScalarWhereInput], {
    nullable: true
  })
  deleteMany?: ReplyScalarWhereInput[] | undefined;
}
