import * as TypeGraphQL from "type-graphql";
import graphqlFields from "graphql-fields";
import { GraphQLResolveInfo } from "graphql";
import { AggregateFollowArgs } from "./args/AggregateFollowArgs";
import { CreateFollowArgs } from "./args/CreateFollowArgs";
import { DeleteFollowArgs } from "./args/DeleteFollowArgs";
import { DeleteManyFollowArgs } from "./args/DeleteManyFollowArgs";
import { FindFirstFollowArgs } from "./args/FindFirstFollowArgs";
import { FindManyFollowArgs } from "./args/FindManyFollowArgs";
import { FindUniqueFollowArgs } from "./args/FindUniqueFollowArgs";
import { UpdateFollowArgs } from "./args/UpdateFollowArgs";
import { UpdateManyFollowArgs } from "./args/UpdateManyFollowArgs";
import { UpsertFollowArgs } from "./args/UpsertFollowArgs";
import { transformFields, getPrismaFromContext } from "../../../helpers";
import { Follow } from "../../../models/Follow";
import { AffectedRowsOutput } from "../../outputs/AffectedRowsOutput";
import { AggregateFollow } from "../../outputs/AggregateFollow";

@TypeGraphQL.Resolver(_of => Follow)
export class FollowCrudResolver {
  @TypeGraphQL.Query(_returns => Follow, {
    nullable: true
  })
  async follow(@TypeGraphQL.Ctx() ctx: any, @TypeGraphQL.Args() args: FindUniqueFollowArgs): Promise<Follow | null> {
    return getPrismaFromContext(ctx).follow.findUnique(args);
  }

  @TypeGraphQL.Query(_returns => Follow, {
    nullable: true
  })
  async findFirstFollow(@TypeGraphQL.Ctx() ctx: any, @TypeGraphQL.Args() args: FindFirstFollowArgs): Promise<Follow | null> {
    return getPrismaFromContext(ctx).follow.findFirst(args);
  }

  @TypeGraphQL.Query(_returns => [Follow], {
    nullable: false
  })
  async follows(@TypeGraphQL.Ctx() ctx: any, @TypeGraphQL.Args() args: FindManyFollowArgs): Promise<Follow[]> {
    return getPrismaFromContext(ctx).follow.findMany(args);
  }

  @TypeGraphQL.Mutation(_returns => Follow, {
    nullable: false
  })
  async createFollow(@TypeGraphQL.Ctx() ctx: any, @TypeGraphQL.Args() args: CreateFollowArgs): Promise<Follow> {
    return getPrismaFromContext(ctx).follow.create(args);
  }

  @TypeGraphQL.Mutation(_returns => Follow, {
    nullable: true
  })
  async deleteFollow(@TypeGraphQL.Ctx() ctx: any, @TypeGraphQL.Args() args: DeleteFollowArgs): Promise<Follow | null> {
    return getPrismaFromContext(ctx).follow.delete(args);
  }

  @TypeGraphQL.Mutation(_returns => Follow, {
    nullable: true
  })
  async updateFollow(@TypeGraphQL.Ctx() ctx: any, @TypeGraphQL.Args() args: UpdateFollowArgs): Promise<Follow | null> {
    return getPrismaFromContext(ctx).follow.update(args);
  }

  @TypeGraphQL.Mutation(_returns => AffectedRowsOutput, {
    nullable: false
  })
  async deleteManyFollow(@TypeGraphQL.Ctx() ctx: any, @TypeGraphQL.Args() args: DeleteManyFollowArgs): Promise<AffectedRowsOutput> {
    return getPrismaFromContext(ctx).follow.deleteMany(args);
  }

  @TypeGraphQL.Mutation(_returns => AffectedRowsOutput, {
    nullable: false
  })
  async updateManyFollow(@TypeGraphQL.Ctx() ctx: any, @TypeGraphQL.Args() args: UpdateManyFollowArgs): Promise<AffectedRowsOutput> {
    return getPrismaFromContext(ctx).follow.updateMany(args);
  }

  @TypeGraphQL.Mutation(_returns => Follow, {
    nullable: false
  })
  async upsertFollow(@TypeGraphQL.Ctx() ctx: any, @TypeGraphQL.Args() args: UpsertFollowArgs): Promise<Follow> {
    return getPrismaFromContext(ctx).follow.upsert(args);
  }

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
