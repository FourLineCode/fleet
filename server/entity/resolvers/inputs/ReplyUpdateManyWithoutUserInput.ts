import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { ReplyCreateOrConnectWithoutUserInput } from "../inputs/ReplyCreateOrConnectWithoutUserInput";
import { ReplyCreateWithoutUserInput } from "../inputs/ReplyCreateWithoutUserInput";
import { ReplyScalarWhereInput } from "../inputs/ReplyScalarWhereInput";
import { ReplyUpdateManyWithWhereWithoutUserInput } from "../inputs/ReplyUpdateManyWithWhereWithoutUserInput";
import { ReplyUpdateWithWhereUniqueWithoutUserInput } from "../inputs/ReplyUpdateWithWhereUniqueWithoutUserInput";
import { ReplyUpsertWithWhereUniqueWithoutUserInput } from "../inputs/ReplyUpsertWithWhereUniqueWithoutUserInput";
import { ReplyWhereUniqueInput } from "../inputs/ReplyWhereUniqueInput";

@TypeGraphQL.InputType({
  isAbstract: true
})
export class ReplyUpdateManyWithoutUserInput {
  @TypeGraphQL.Field(_type => [ReplyCreateWithoutUserInput], {
    nullable: true
  })
  create?: ReplyCreateWithoutUserInput[] | undefined;

  @TypeGraphQL.Field(_type => [ReplyCreateOrConnectWithoutUserInput], {
    nullable: true
  })
  connectOrCreate?: ReplyCreateOrConnectWithoutUserInput[] | undefined;

  @TypeGraphQL.Field(_type => [ReplyUpsertWithWhereUniqueWithoutUserInput], {
    nullable: true
  })
  upsert?: ReplyUpsertWithWhereUniqueWithoutUserInput[] | undefined;

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

  @TypeGraphQL.Field(_type => [ReplyUpdateWithWhereUniqueWithoutUserInput], {
    nullable: true
  })
  update?: ReplyUpdateWithWhereUniqueWithoutUserInput[] | undefined;

  @TypeGraphQL.Field(_type => [ReplyUpdateManyWithWhereWithoutUserInput], {
    nullable: true
  })
  updateMany?: ReplyUpdateManyWithWhereWithoutUserInput[] | undefined;

  @TypeGraphQL.Field(_type => [ReplyScalarWhereInput], {
    nullable: true
  })
  deleteMany?: ReplyScalarWhereInput[] | undefined;
}
