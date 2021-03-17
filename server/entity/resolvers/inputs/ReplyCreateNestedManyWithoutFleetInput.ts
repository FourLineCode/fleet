import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { ReplyCreateOrConnectWithoutFleetInput } from "../inputs/ReplyCreateOrConnectWithoutFleetInput";
import { ReplyCreateWithoutFleetInput } from "../inputs/ReplyCreateWithoutFleetInput";
import { ReplyWhereUniqueInput } from "../inputs/ReplyWhereUniqueInput";

@TypeGraphQL.InputType({
  isAbstract: true
})
export class ReplyCreateNestedManyWithoutFleetInput {
  @TypeGraphQL.Field(_type => [ReplyCreateWithoutFleetInput], {
    nullable: true
  })
  create?: ReplyCreateWithoutFleetInput[] | undefined;

  @TypeGraphQL.Field(_type => [ReplyCreateOrConnectWithoutFleetInput], {
    nullable: true
  })
  connectOrCreate?: ReplyCreateOrConnectWithoutFleetInput[] | undefined;

  @TypeGraphQL.Field(_type => [ReplyWhereUniqueInput], {
    nullable: true
  })
  connect?: ReplyWhereUniqueInput[] | undefined;
}
