import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { ReplyAvgAggregate } from "../outputs/ReplyAvgAggregate";
import { ReplyCountAggregate } from "../outputs/ReplyCountAggregate";
import { ReplyMaxAggregate } from "../outputs/ReplyMaxAggregate";
import { ReplyMinAggregate } from "../outputs/ReplyMinAggregate";
import { ReplySumAggregate } from "../outputs/ReplySumAggregate";

@TypeGraphQL.ObjectType({
  isAbstract: true
})
export class AggregateReply {
  @TypeGraphQL.Field(_type => ReplyCountAggregate, {
    nullable: true
  })
  count!: ReplyCountAggregate | null;

  @TypeGraphQL.Field(_type => ReplyAvgAggregate, {
    nullable: true
  })
  avg!: ReplyAvgAggregate | null;

  @TypeGraphQL.Field(_type => ReplySumAggregate, {
    nullable: true
  })
  sum!: ReplySumAggregate | null;

  @TypeGraphQL.Field(_type => ReplyMinAggregate, {
    nullable: true
  })
  min!: ReplyMinAggregate | null;

  @TypeGraphQL.Field(_type => ReplyMaxAggregate, {
    nullable: true
  })
  max!: ReplyMaxAggregate | null;
}
