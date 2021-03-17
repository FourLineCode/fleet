import * as TypeGraphQL from "type-graphql";
import graphqlFields from "graphql-fields";
import { GraphQLResolveInfo } from "graphql";
import { AggregateReplyArgs } from "./args/AggregateReplyArgs";
import { CreateReplyArgs } from "./args/CreateReplyArgs";
import { DeleteManyReplyArgs } from "./args/DeleteManyReplyArgs";
import { DeleteReplyArgs } from "./args/DeleteReplyArgs";
import { FindFirstReplyArgs } from "./args/FindFirstReplyArgs";
import { FindManyReplyArgs } from "./args/FindManyReplyArgs";
import { FindUniqueReplyArgs } from "./args/FindUniqueReplyArgs";
import { UpdateManyReplyArgs } from "./args/UpdateManyReplyArgs";
import { UpdateReplyArgs } from "./args/UpdateReplyArgs";
import { UpsertReplyArgs } from "./args/UpsertReplyArgs";
import { transformFields, getPrismaFromContext } from "../../../helpers";
import { Reply } from "../../../models/Reply";
import { AffectedRowsOutput } from "../../outputs/AffectedRowsOutput";
import { AggregateReply } from "../../outputs/AggregateReply";

@TypeGraphQL.Resolver(_of => Reply)
export class ReplyCrudResolver {
  @TypeGraphQL.Query(_returns => Reply, {
    nullable: true
  })
  async reply(@TypeGraphQL.Ctx() ctx: any, @TypeGraphQL.Args() args: FindUniqueReplyArgs): Promise<Reply | null> {
    return getPrismaFromContext(ctx).reply.findUnique(args);
  }

  @TypeGraphQL.Query(_returns => Reply, {
    nullable: true
  })
  async findFirstReply(@TypeGraphQL.Ctx() ctx: any, @TypeGraphQL.Args() args: FindFirstReplyArgs): Promise<Reply | null> {
    return getPrismaFromContext(ctx).reply.findFirst(args);
  }

  @TypeGraphQL.Query(_returns => [Reply], {
    nullable: false
  })
  async replies(@TypeGraphQL.Ctx() ctx: any, @TypeGraphQL.Args() args: FindManyReplyArgs): Promise<Reply[]> {
    return getPrismaFromContext(ctx).reply.findMany(args);
  }

  @TypeGraphQL.Mutation(_returns => Reply, {
    nullable: false
  })
  async createReply(@TypeGraphQL.Ctx() ctx: any, @TypeGraphQL.Args() args: CreateReplyArgs): Promise<Reply> {
    return getPrismaFromContext(ctx).reply.create(args);
  }

  @TypeGraphQL.Mutation(_returns => Reply, {
    nullable: true
  })
  async deleteReply(@TypeGraphQL.Ctx() ctx: any, @TypeGraphQL.Args() args: DeleteReplyArgs): Promise<Reply | null> {
    return getPrismaFromContext(ctx).reply.delete(args);
  }

  @TypeGraphQL.Mutation(_returns => Reply, {
    nullable: true
  })
  async updateReply(@TypeGraphQL.Ctx() ctx: any, @TypeGraphQL.Args() args: UpdateReplyArgs): Promise<Reply | null> {
    return getPrismaFromContext(ctx).reply.update(args);
  }

  @TypeGraphQL.Mutation(_returns => AffectedRowsOutput, {
    nullable: false
  })
  async deleteManyReply(@TypeGraphQL.Ctx() ctx: any, @TypeGraphQL.Args() args: DeleteManyReplyArgs): Promise<AffectedRowsOutput> {
    return getPrismaFromContext(ctx).reply.deleteMany(args);
  }

  @TypeGraphQL.Mutation(_returns => AffectedRowsOutput, {
    nullable: false
  })
  async updateManyReply(@TypeGraphQL.Ctx() ctx: any, @TypeGraphQL.Args() args: UpdateManyReplyArgs): Promise<AffectedRowsOutput> {
    return getPrismaFromContext(ctx).reply.updateMany(args);
  }

  @TypeGraphQL.Mutation(_returns => Reply, {
    nullable: false
  })
  async upsertReply(@TypeGraphQL.Ctx() ctx: any, @TypeGraphQL.Args() args: UpsertReplyArgs): Promise<Reply> {
    return getPrismaFromContext(ctx).reply.upsert(args);
  }

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
