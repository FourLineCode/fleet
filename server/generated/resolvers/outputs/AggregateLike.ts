import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { LikeAvgAggregate } from "../outputs/LikeAvgAggregate";
import { LikeCountAggregate } from "../outputs/LikeCountAggregate";
import { LikeMaxAggregate } from "../outputs/LikeMaxAggregate";
import { LikeMinAggregate } from "../outputs/LikeMinAggregate";
import { LikeSumAggregate } from "../outputs/LikeSumAggregate";

@TypeGraphQL.ObjectType({
  isAbstract: true
})
export class AggregateLike {
  @TypeGraphQL.Field(_type => LikeCountAggregate, {
    nullable: true
  })
  count!: LikeCountAggregate | null;

  @TypeGraphQL.Field(_type => LikeAvgAggregate, {
    nullable: true
  })
  avg!: LikeAvgAggregate | null;

  @TypeGraphQL.Field(_type => LikeSumAggregate, {
    nullable: true
  })
  sum!: LikeSumAggregate | null;

  @TypeGraphQL.Field(_type => LikeMinAggregate, {
    nullable: true
  })
  min!: LikeMinAggregate | null;

  @TypeGraphQL.Field(_type => LikeMaxAggregate, {
    nullable: true
  })
  max!: LikeMaxAggregate | null;
}
