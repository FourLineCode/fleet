import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { LikeCreateNestedManyWithoutFleetInput } from "../inputs/LikeCreateNestedManyWithoutFleetInput";
import { ReplyCreateNestedManyWithoutFleetInput } from "../inputs/ReplyCreateNestedManyWithoutFleetInput";

@TypeGraphQL.InputType({
  isAbstract: true
})
export class FleetCreateWithoutAuthorInput {
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

  @TypeGraphQL.Field(_type => LikeCreateNestedManyWithoutFleetInput, {
    nullable: true
  })
  like?: LikeCreateNestedManyWithoutFleetInput | undefined;

  @TypeGraphQL.Field(_type => ReplyCreateNestedManyWithoutFleetInput, {
    nullable: true
  })
  reply?: ReplyCreateNestedManyWithoutFleetInput | undefined;
}
