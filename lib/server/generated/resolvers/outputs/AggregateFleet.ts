import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { FleetAvgAggregate } from "../outputs/FleetAvgAggregate";
import { FleetCountAggregate } from "../outputs/FleetCountAggregate";
import { FleetMaxAggregate } from "../outputs/FleetMaxAggregate";
import { FleetMinAggregate } from "../outputs/FleetMinAggregate";
import { FleetSumAggregate } from "../outputs/FleetSumAggregate";

@TypeGraphQL.ObjectType({
  isAbstract: true
})
export class AggregateFleet {
  @TypeGraphQL.Field(_type => FleetCountAggregate, {
    nullable: true
  })
  count!: FleetCountAggregate | null;

  @TypeGraphQL.Field(_type => FleetAvgAggregate, {
    nullable: true
  })
  avg!: FleetAvgAggregate | null;

  @TypeGraphQL.Field(_type => FleetSumAggregate, {
    nullable: true
  })
  sum!: FleetSumAggregate | null;

  @TypeGraphQL.Field(_type => FleetMinAggregate, {
    nullable: true
  })
  min!: FleetMinAggregate | null;

  @TypeGraphQL.Field(_type => FleetMaxAggregate, {
    nullable: true
  })
  max!: FleetMaxAggregate | null;
}
