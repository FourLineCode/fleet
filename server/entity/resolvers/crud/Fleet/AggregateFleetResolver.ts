import * as TypeGraphQL from "type-graphql";
import graphqlFields from "graphql-fields";
import { GraphQLResolveInfo } from "graphql";
import { AggregateFleetArgs } from "./args/AggregateFleetArgs";
import { Fleet } from "../../../models/Fleet";
import { AggregateFleet } from "../../outputs/AggregateFleet";
import { transformFields, getPrismaFromContext } from "../../../helpers";

@TypeGraphQL.Resolver(_of => Fleet)
export class AggregateFleetResolver {
  @TypeGraphQL.Query(_returns => AggregateFleet, {
    nullable: false
  })
  async aggregateFleet(@TypeGraphQL.Ctx() ctx: any, @TypeGraphQL.Info() info: GraphQLResolveInfo, @TypeGraphQL.Args() args: AggregateFleetArgs): Promise<AggregateFleet> {
    return getPrismaFromContext(ctx).fleet.aggregate({
      ...args,
      ...transformFields(graphqlFields(info as any)),
    });
  }
}
