import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { DateTimeFieldUpdateOperationsInput } from "../inputs/DateTimeFieldUpdateOperationsInput";
import { FleetUpdateOneRequiredWithoutLikeInput } from "../inputs/FleetUpdateOneRequiredWithoutLikeInput";
import { UserUpdateOneRequiredWithoutLikeInput } from "../inputs/UserUpdateOneRequiredWithoutLikeInput";

@TypeGraphQL.InputType({
  isAbstract: true
})
export class LikeUpdateInput {
  @TypeGraphQL.Field(_type => DateTimeFieldUpdateOperationsInput, {
    nullable: true
  })
  createdAt?: DateTimeFieldUpdateOperationsInput | undefined;

  @TypeGraphQL.Field(_type => DateTimeFieldUpdateOperationsInput, {
    nullable: true
  })
  updatedAt?: DateTimeFieldUpdateOperationsInput | undefined;

  @TypeGraphQL.Field(_type => FleetUpdateOneRequiredWithoutLikeInput, {
    nullable: true
  })
  fleet?: FleetUpdateOneRequiredWithoutLikeInput | undefined;

  @TypeGraphQL.Field(_type => UserUpdateOneRequiredWithoutLikeInput, {
    nullable: true
  })
  user?: UserUpdateOneRequiredWithoutLikeInput | undefined;
}
