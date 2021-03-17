import * as TypeGraphQL from "type-graphql";
import { UpsertLikeArgs } from "./args/UpsertLikeArgs";
import { Like } from "../../../models/Like";
import { transformFields, getPrismaFromContext } from "../../../helpers";

@TypeGraphQL.Resolver(_of => Like)
export class UpsertLikeResolver {
  @TypeGraphQL.Mutation(_returns => Like, {
    nullable: false
  })
  async upsertLike(@TypeGraphQL.Ctx() ctx: any, @TypeGraphQL.Args() args: UpsertLikeArgs): Promise<Like> {
    return getPrismaFromContext(ctx).like.upsert(args);
  }
}
