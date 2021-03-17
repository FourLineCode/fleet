import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { FleetCreateNestedOneWithoutReplyInput } from "../inputs/FleetCreateNestedOneWithoutReplyInput";

@TypeGraphQL.InputType({
  isAbstract: true
})
export class ReplyCreateWithoutUserInput {
  @TypeGraphQL.Field(_type => Date, {
    nullable: true
  })
  createdAt?: Date | undefined;

  @TypeGraphQL.Field(_type => Date, {
    nullable: true
  })
  updatedAt?: Date | undefined;

  @TypeGraphQL.Field(_type => String, {
    nullable: false
  })
  body!: string;

  @TypeGraphQL.Field(_type => FleetCreateNestedOneWithoutReplyInput, {
    nullable: false
  })
  fleet!: FleetCreateNestedOneWithoutReplyInput;
}
