import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { ReplyCreateNestedManyWithoutFleetInput } from "../inputs/ReplyCreateNestedManyWithoutFleetInput";
import { UserCreateNestedOneWithoutFleetInput } from "../inputs/UserCreateNestedOneWithoutFleetInput";

@TypeGraphQL.InputType({
  isAbstract: true
})
export class FleetCreateWithoutLikeInput {
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

  @TypeGraphQL.Field(_type => UserCreateNestedOneWithoutFleetInput, {
    nullable: false
  })
  author!: UserCreateNestedOneWithoutFleetInput;

  @TypeGraphQL.Field(_type => ReplyCreateNestedManyWithoutFleetInput, {
    nullable: true
  })
  reply?: ReplyCreateNestedManyWithoutFleetInput | undefined;
}
