import * as TypeGraphQL from "type-graphql";
import graphqlFields from "graphql-fields";
import { GraphQLResolveInfo } from "graphql";
import { AggregateLikeArgs } from "./args/AggregateLikeArgs";
import { CreateLikeArgs } from "./args/CreateLikeArgs";
import { DeleteLikeArgs } from "./args/DeleteLikeArgs";
import { DeleteManyLikeArgs } from "./args/DeleteManyLikeArgs";
import { FindFirstLikeArgs } from "./args/FindFirstLikeArgs";
import { FindManyLikeArgs } from "./args/FindManyLikeArgs";
import { FindUniqueLikeArgs } from "./args/FindUniqueLikeArgs";
import { UpdateLikeArgs } from "./args/UpdateLikeArgs";
import { UpdateManyLikeArgs } from "./args/UpdateManyLikeArgs";
import { UpsertLikeArgs } from "./args/UpsertLikeArgs";
import { transformFields, getPrismaFromContext } from "../../../helpers";
import { Like } from "../../../models/Like";
import { AffectedRowsOutput } from "../../outputs/AffectedRowsOutput";
import { AggregateLike } from "../../outputs/AggregateLike";

@TypeGraphQL.Resolver(_of => Like)
export class LikeCrudResolver {
  @TypeGraphQL.Query(_returns => Like, {
    nullable: true
  })
  async like(@TypeGraphQL.Ctx() ctx: any, @TypeGraphQL.Args() args: FindUniqueLikeArgs): Promise<Like | null> {
    return getPrismaFromContext(ctx).like.findUnique(args);
  }

  @TypeGraphQL.Query(_returns => Like, {
    nullable: true
  })
  async findFirstLike(@TypeGraphQL.Ctx() ctx: any, @TypeGraphQL.Args() args: FindFirstLikeArgs): Promise<Like | null> {
    return getPrismaFromContext(ctx).like.findFirst(args);
  }

  @TypeGraphQL.Query(_returns => [Like], {
    nullable: false
  })
  async likes(@TypeGraphQL.Ctx() ctx: any, @TypeGraphQL.Args() args: FindManyLikeArgs): Promise<Like[]> {
    return getPrismaFromContext(ctx).like.findMany(args);
  }

  @TypeGraphQL.Mutation(_returns => Like, {
    nullable: false
  })
  async createLike(@TypeGraphQL.Ctx() ctx: any, @TypeGraphQL.Args() args: CreateLikeArgs): Promise<Like> {
    return getPrismaFromContext(ctx).like.create(args);
  }

  @TypeGraphQL.Mutation(_returns => Like, {
    nullable: true
  })
  async deleteLike(@TypeGraphQL.Ctx() ctx: any, @TypeGraphQL.Args() args: DeleteLikeArgs): Promise<Like | null> {
    return getPrismaFromContext(ctx).like.delete(args);
  }

  @TypeGraphQL.Mutation(_returns => Like, {
    nullable: true
  })
  async updateLike(@TypeGraphQL.Ctx() ctx: any, @TypeGraphQL.Args() args: UpdateLikeArgs): Promise<Like | null> {
    return getPrismaFromContext(ctx).like.update(args);
  }

  @TypeGraphQL.Mutation(_returns => AffectedRowsOutput, {
    nullable: false
  })
  async deleteManyLike(@TypeGraphQL.Ctx() ctx: any, @TypeGraphQL.Args() args: DeleteManyLikeArgs): Promise<AffectedRowsOutput> {
    return getPrismaFromContext(ctx).like.deleteMany(args);
  }

  @TypeGraphQL.Mutation(_returns => AffectedRowsOutput, {
    nullable: false
  })
  async updateManyLike(@TypeGraphQL.Ctx() ctx: any, @TypeGraphQL.Args() args: UpdateManyLikeArgs): Promise<AffectedRowsOutput> {
    return getPrismaFromContext(ctx).like.updateMany(args);
  }

  @TypeGraphQL.Mutation(_returns => Like, {
    nullable: false
  })
  async upsertLike(@TypeGraphQL.Ctx() ctx: any, @TypeGraphQL.Args() args: UpsertLikeArgs): Promise<Like> {
    return getPrismaFromContext(ctx).like.upsert(args);
  }

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
