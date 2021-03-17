import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { LikeCreateOrConnectWithoutUserInput } from "../inputs/LikeCreateOrConnectWithoutUserInput";
import { LikeCreateWithoutUserInput } from "../inputs/LikeCreateWithoutUserInput";
import { LikeWhereUniqueInput } from "../inputs/LikeWhereUniqueInput";

@TypeGraphQL.InputType({
  isAbstract: true
})
export class LikeCreateNestedManyWithoutUserInput {
  @TypeGraphQL.Field(_type => [LikeCreateWithoutUserInput], {
    nullable: true
  })
  create?: LikeCreateWithoutUserInput[] | undefined;

  @TypeGraphQL.Field(_type => [LikeCreateOrConnectWithoutUserInput], {
    nullable: true
  })
  connectOrCreate?: LikeCreateOrConnectWithoutUserInput[] | undefined;

  @TypeGraphQL.Field(_type => [LikeWhereUniqueInput], {
    nullable: true
  })
  connect?: LikeWhereUniqueInput[] | undefined;
}
