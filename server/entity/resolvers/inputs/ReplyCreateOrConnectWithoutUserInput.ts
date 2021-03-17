import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { ReplyCreateWithoutUserInput } from "../inputs/ReplyCreateWithoutUserInput";
import { ReplyWhereUniqueInput } from "../inputs/ReplyWhereUniqueInput";

@TypeGraphQL.InputType({
  isAbstract: true
})
export class ReplyCreateOrConnectWithoutUserInput {
  @TypeGraphQL.Field(_type => ReplyWhereUniqueInput, {
    nullable: false
  })
  where!: ReplyWhereUniqueInput;

  @TypeGraphQL.Field(_type => ReplyCreateWithoutUserInput, {
    nullable: false
  })
  create!: ReplyCreateWithoutUserInput;
}
