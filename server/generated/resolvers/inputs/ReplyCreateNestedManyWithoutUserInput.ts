import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { ReplyCreateOrConnectWithoutUserInput } from "../inputs/ReplyCreateOrConnectWithoutUserInput";
import { ReplyCreateWithoutUserInput } from "../inputs/ReplyCreateWithoutUserInput";
import { ReplyWhereUniqueInput } from "../inputs/ReplyWhereUniqueInput";

@TypeGraphQL.InputType({
  isAbstract: true
})
export class ReplyCreateNestedManyWithoutUserInput {
  @TypeGraphQL.Field(_type => [ReplyCreateWithoutUserInput], {
    nullable: true
  })
  create?: ReplyCreateWithoutUserInput[] | undefined;

  @TypeGraphQL.Field(_type => [ReplyCreateOrConnectWithoutUserInput], {
    nullable: true
  })
  connectOrCreate?: ReplyCreateOrConnectWithoutUserInput[] | undefined;

  @TypeGraphQL.Field(_type => [ReplyWhereUniqueInput], {
    nullable: true
  })
  connect?: ReplyWhereUniqueInput[] | undefined;
}
