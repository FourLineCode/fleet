import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { FollowAvgAggregate } from "../outputs/FollowAvgAggregate";
import { FollowCountAggregate } from "../outputs/FollowCountAggregate";
import { FollowMaxAggregate } from "../outputs/FollowMaxAggregate";
import { FollowMinAggregate } from "../outputs/FollowMinAggregate";
import { FollowSumAggregate } from "../outputs/FollowSumAggregate";

@TypeGraphQL.ObjectType({
  isAbstract: true
})
export class AggregateFollow {
  @TypeGraphQL.Field(_type => FollowCountAggregate, {
    nullable: true
  })
  count!: FollowCountAggregate | null;

  @TypeGraphQL.Field(_type => FollowAvgAggregate, {
    nullable: true
  })
  avg!: FollowAvgAggregate | null;

  @TypeGraphQL.Field(_type => FollowSumAggregate, {
    nullable: true
  })
  sum!: FollowSumAggregate | null;

  @TypeGraphQL.Field(_type => FollowMinAggregate, {
    nullable: true
  })
  min!: FollowMinAggregate | null;

  @TypeGraphQL.Field(_type => FollowMaxAggregate, {
    nullable: true
  })
  max!: FollowMaxAggregate | null;
}
