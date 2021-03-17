import * as TypeGraphQL from "type-graphql";
import graphqlFields from "graphql-fields";
import { GraphQLResolveInfo } from "graphql";
import { AggregateLikeArgs } from "./args/AggregateLikeArgs";
import { Like } from "../../../models/Like";
import { AggregateLike } from "../../outputs/AggregateLike";
import { transformFields, getPrismaFromContext } from "../../../helpers";

@TypeGraphQL.Resolver(_of => Like)
export class AggregateLikeResolver {
  @TypeGraphQL.Query(_returns => AggregateLike, {
    nullable: false
  })
  async aggregateLike(@TypeGraphQL.Ctx() ctx: any, @TypeGraphQL.Info() info: GraphQLResolveInfo, @TypeGraphQL.Args() args: AggregateLikeArgs): Promise<AggregateLike> {
    return getPrismaFromContext(ctx).like.aggregate({
      ...args,
      ...transformFields(graphqlFields(info as any)),
    });
  }
}
