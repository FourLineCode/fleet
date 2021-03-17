import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { ReplyScalarWhereInput } from "../inputs/ReplyScalarWhereInput";
import { ReplyUpdateManyMutationInput } from "../inputs/ReplyUpdateManyMutationInput";

@TypeGraphQL.InputType({
  isAbstract: true
})
export class ReplyUpdateManyWithWhereWithoutUserInput {
  @TypeGraphQL.Field(_type => ReplyScalarWhereInput, {
    nullable: false
  })
  where!: ReplyScalarWhereInput;

  @TypeGraphQL.Field(_type => ReplyUpdateManyMutationInput, {
    nullable: false
  })
  data!: ReplyUpdateManyMutationInput;
}
