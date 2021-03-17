import * as TypeGraphQL from "type-graphql";
import graphqlFields from "graphql-fields";
import { GraphQLResolveInfo } from "graphql";
import { AggregateFollowArgs } from "./args/AggregateFollowArgs";
import { Follow } from "../../../models/Follow";
import { AggregateFollow } from "../../outputs/AggregateFollow";
import { transformFields, getPrismaFromContext } from "../../../helpers";

@TypeGraphQL.Resolver(_of => Follow)
export class AggregateFollowResolver {
  @TypeGraphQL.Query(_returns => AggregateFollow, {
    nullable: false
  })
  async aggregateFollow(@TypeGraphQL.Ctx() ctx: any, @TypeGraphQL.Info() info: GraphQLResolveInfo, @TypeGraphQL.Args() args: AggregateFollowArgs): Promise<AggregateFollow> {
    return getPrismaFromContext(ctx).follow.aggregate({
      ...args,
      ...transformFields(graphqlFields(info as any)),
    });
  }
}
