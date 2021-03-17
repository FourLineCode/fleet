import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { DateTimeFieldUpdateOperationsInput } from "../inputs/DateTimeFieldUpdateOperationsInput";
import { ReplyUpdateManyWithoutFleetInput } from "../inputs/ReplyUpdateManyWithoutFleetInput";
import { StringFieldUpdateOperationsInput } from "../inputs/StringFieldUpdateOperationsInput";
import { UserUpdateOneRequiredWithoutFleetInput } from "../inputs/UserUpdateOneRequiredWithoutFleetInput";

@TypeGraphQL.InputType({
  isAbstract: true
})
export class FleetUpdateWithoutLikeInput {
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

  @TypeGraphQL.Field(_type => UserUpdateOneRequiredWithoutFleetInput, {
    nullable: true
  })
  author?: UserUpdateOneRequiredWithoutFleetInput | undefined;

  @TypeGraphQL.Field(_type => ReplyUpdateManyWithoutFleetInput, {
    nullable: true
  })
  reply?: ReplyUpdateManyWithoutFleetInput | undefined;
}
