import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { LikeCreateOrConnectWithoutFleetInput } from "../inputs/LikeCreateOrConnectWithoutFleetInput";
import { LikeCreateWithoutFleetInput } from "../inputs/LikeCreateWithoutFleetInput";
import { LikeWhereUniqueInput } from "../inputs/LikeWhereUniqueInput";

@TypeGraphQL.InputType({
  isAbstract: true
})
export class LikeCreateNestedManyWithoutFleetInput {
  @TypeGraphQL.Field(_type => [LikeCreateWithoutFleetInput], {
    nullable: true
  })
  create?: LikeCreateWithoutFleetInput[] | undefined;

  @TypeGraphQL.Field(_type => [LikeCreateOrConnectWithoutFleetInput], {
    nullable: true
  })
  connectOrCreate?: LikeCreateOrConnectWithoutFleetInput[] | undefined;

  @TypeGraphQL.Field(_type => [LikeWhereUniqueInput], {
    nullable: true
  })
  connect?: LikeWhereUniqueInput[] | undefined;
}
