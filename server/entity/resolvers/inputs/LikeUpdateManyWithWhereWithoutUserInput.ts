import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { LikeScalarWhereInput } from "../inputs/LikeScalarWhereInput";
import { LikeUpdateManyMutationInput } from "../inputs/LikeUpdateManyMutationInput";

@TypeGraphQL.InputType({
  isAbstract: true
})
export class LikeUpdateManyWithWhereWithoutUserInput {
  @TypeGraphQL.Field(_type => LikeScalarWhereInput, {
    nullable: false
  })
  where!: LikeScalarWhereInput;

  @TypeGraphQL.Field(_type => LikeUpdateManyMutationInput, {
    nullable: false
  })
  data!: LikeUpdateManyMutationInput;
}
