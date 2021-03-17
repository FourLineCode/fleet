import * as TypeGraphQL from "type-graphql";
import graphqlFields from "graphql-fields";
import { GraphQLResolveInfo } from "graphql";
import { AggregateReplyArgs } from "./args/AggregateReplyArgs";
import { Reply } from "../../../models/Reply";
import { AggregateReply } from "../../outputs/AggregateReply";
import { transformFields, getPrismaFromContext } from "../../../helpers";

@TypeGraphQL.Resolver(_of => Reply)
export class AggregateReplyResolver {
  @TypeGraphQL.Query(_returns => AggregateReply, {
    nullable: false
  })
  async aggregateReply(@TypeGraphQL.Ctx() ctx: any, @TypeGraphQL.Info() info: GraphQLResolveInfo, @TypeGraphQL.Args() args: AggregateReplyArgs): Promise<AggregateReply> {
    return getPrismaFromContext(ctx).reply.aggregate({
      ...args,
      ...transformFields(graphqlFields(info as any)),
    });
  }
}
