import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { DateTimeFieldUpdateOperationsInput } from "../inputs/DateTimeFieldUpdateOperationsInput";
import { UserUpdateOneRequiredWithoutFollowersInput } from "../inputs/UserUpdateOneRequiredWithoutFollowersInput";
import { UserUpdateOneRequiredWithoutFollowingInput } from "../inputs/UserUpdateOneRequiredWithoutFollowingInput";

@TypeGraphQL.InputType({
  isAbstract: true
})
export class FollowUpdateInput {
  @TypeGraphQL.Field(_type => DateTimeFieldUpdateOperationsInput, {
    nullable: true
  })
  createdAt?: DateTimeFieldUpdateOperationsInput | undefined;

  @TypeGraphQL.Field(_type => DateTimeFieldUpdateOperationsInput, {
    nullable: true
  })
  updatedAt?: DateTimeFieldUpdateOperationsInput | undefined;

  @TypeGraphQL.Field(_type => UserUpdateOneRequiredWithoutFollowersInput, {
    nullable: true
  })
  from?: UserUpdateOneRequiredWithoutFollowersInput | undefined;

  @TypeGraphQL.Field(_type => UserUpdateOneRequiredWithoutFollowingInput, {
    nullable: true
  })
  to?: UserUpdateOneRequiredWithoutFollowingInput | undefined;
}
