import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { LikeCreateOrConnectWithoutUserInput } from "../inputs/LikeCreateOrConnectWithoutUserInput";
import { LikeCreateWithoutUserInput } from "../inputs/LikeCreateWithoutUserInput";
import { LikeScalarWhereInput } from "../inputs/LikeScalarWhereInput";
import { LikeUpdateManyWithWhereWithoutUserInput } from "../inputs/LikeUpdateManyWithWhereWithoutUserInput";
import { LikeUpdateWithWhereUniqueWithoutUserInput } from "../inputs/LikeUpdateWithWhereUniqueWithoutUserInput";
import { LikeUpsertWithWhereUniqueWithoutUserInput } from "../inputs/LikeUpsertWithWhereUniqueWithoutUserInput";
import { LikeWhereUniqueInput } from "../inputs/LikeWhereUniqueInput";

@TypeGraphQL.InputType({
  isAbstract: true
})
export class LikeUpdateManyWithoutUserInput {
  @TypeGraphQL.Field(_type => [LikeCreateWithoutUserInput], {
    nullable: true
  })
  create?: LikeCreateWithoutUserInput[] | undefined;

  @TypeGraphQL.Field(_type => [LikeCreateOrConnectWithoutUserInput], {
    nullable: true
  })
  connectOrCreate?: LikeCreateOrConnectWithoutUserInput[] | undefined;

  @TypeGraphQL.Field(_type => [LikeUpsertWithWhereUniqueWithoutUserInput], {
    nullable: true
  })
  upsert?: LikeUpsertWithWhereUniqueWithoutUserInput[] | undefined;

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

  @TypeGraphQL.Field(_type => [LikeUpdateWithWhereUniqueWithoutUserInput], {
    nullable: true
  })
  update?: LikeUpdateWithWhereUniqueWithoutUserInput[] | undefined;

  @TypeGraphQL.Field(_type => [LikeUpdateManyWithWhereWithoutUserInput], {
    nullable: true
  })
  updateMany?: LikeUpdateManyWithWhereWithoutUserInput[] | undefined;

  @TypeGraphQL.Field(_type => [LikeScalarWhereInput], {
    nullable: true
  })
  deleteMany?: LikeScalarWhereInput[] | undefined;
}
