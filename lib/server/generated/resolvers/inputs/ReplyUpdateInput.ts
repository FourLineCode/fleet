import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { DateTimeFieldUpdateOperationsInput } from "../inputs/DateTimeFieldUpdateOperationsInput";
import { FleetUpdateOneRequiredWithoutReplyInput } from "../inputs/FleetUpdateOneRequiredWithoutReplyInput";
import { StringFieldUpdateOperationsInput } from "../inputs/StringFieldUpdateOperationsInput";
import { UserUpdateOneRequiredWithoutReplyInput } from "../inputs/UserUpdateOneRequiredWithoutReplyInput";

@TypeGraphQL.InputType({
  isAbstract: true
})
export class ReplyUpdateInput {
  @TypeGraphQL.Field(_type => DateTimeFieldUpdateOperationsInput, {
    nullable: true
  })
  createdAt?: DateTimeFieldUpdateOperationsInput | undefined;

  @TypeGraphQL.Field(_type => DateTimeFieldUpdateOperationsInput, {
    nullable: true
  })
  updatedAt?: DateTimeFieldUpdateOperationsInput | undefined;

  @TypeGraphQL.Field(_type => StringFieldUpdateOperationsInput, {
    nullable: true
  })
  body?: StringFieldUpdateOperationsInput | undefined;

  @TypeGraphQL.Field(_type => FleetUpdateOneRequiredWithoutReplyInput, {
    nullable: true
  })
  fleet?: FleetUpdateOneRequiredWithoutReplyInput | undefined;

  @TypeGraphQL.Field(_type => UserUpdateOneRequiredWithoutReplyInput, {
    nullable: true
  })
  user?: UserUpdateOneRequiredWithoutReplyInput | undefined;
}
