import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { BoolFieldUpdateOperationsInput } from "../inputs/BoolFieldUpdateOperationsInput";
import { DateTimeFieldUpdateOperationsInput } from "../inputs/DateTimeFieldUpdateOperationsInput";
import { FleetUpdateManyWithoutAuthorInput } from "../inputs/FleetUpdateManyWithoutAuthorInput";
import { FollowUpdateManyWithoutFromInput } from "../inputs/FollowUpdateManyWithoutFromInput";
import { FollowUpdateManyWithoutToInput } from "../inputs/FollowUpdateManyWithoutToInput";
import { LikeUpdateManyWithoutUserInput } from "../inputs/LikeUpdateManyWithoutUserInput";
import { StringFieldUpdateOperationsInput } from "../inputs/StringFieldUpdateOperationsInput";

@TypeGraphQL.InputType({
  isAbstract: true
})
export class UserUpdateWithoutReplyInput {
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
  email?: StringFieldUpdateOperationsInput | undefined;

  @TypeGraphQL.Field(_type => StringFieldUpdateOperationsInput, {
    nullable: true
  })
  password?: StringFieldUpdateOperationsInput | undefined;

  @TypeGraphQL.Field(_type => StringFieldUpdateOperationsInput, {
    nullable: true
  })
  username?: StringFieldUpdateOperationsInput | undefined;

  @TypeGraphQL.Field(_type => StringFieldUpdateOperationsInput, {
    nullable: true
  })
  displayName?: StringFieldUpdateOperationsInput | undefined;

  @TypeGraphQL.Field(_type => StringFieldUpdateOperationsInput, {
    nullable: true
  })
  bio?: StringFieldUpdateOperationsInput | undefined;

  @TypeGraphQL.Field(_type => BoolFieldUpdateOperationsInput, {
    nullable: true
  })
  isAdmin?: BoolFieldUpdateOperationsInput | undefined;

  @TypeGraphQL.Field(_type => FleetUpdateManyWithoutAuthorInput, {
    nullable: true
  })
  fleet?: FleetUpdateManyWithoutAuthorInput | undefined;

  @TypeGraphQL.Field(_type => FollowUpdateManyWithoutFromInput, {
    nullable: true
  })
  followers?: FollowUpdateManyWithoutFromInput | undefined;

  @TypeGraphQL.Field(_type => FollowUpdateManyWithoutToInput, {
    nullable: true
  })
  following?: FollowUpdateManyWithoutToInput | undefined;

  @TypeGraphQL.Field(_type => LikeUpdateManyWithoutUserInput, {
    nullable: true
  })
  like?: LikeUpdateManyWithoutUserInput | undefined;
}
