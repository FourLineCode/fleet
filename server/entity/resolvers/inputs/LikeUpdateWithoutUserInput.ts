import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { DateTimeFieldUpdateOperationsInput } from "../inputs/DateTimeFieldUpdateOperationsInput";
import { FleetUpdateOneRequiredWithoutLikeInput } from "../inputs/FleetUpdateOneRequiredWithoutLikeInput";

@TypeGraphQL.InputType({
  isAbstract: true
})
export class LikeUpdateWithoutUserInput {
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
}
