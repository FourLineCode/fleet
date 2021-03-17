import * as TypeGraphQL from "type-graphql";
import { UpdateLikeArgs } from "./args/UpdateLikeArgs";
import { Like } from "../../../models/Like";
import { transformFields, getPrismaFromContext } from "../../../helpers";

@TypeGraphQL.Resolver(_of => Like)
export class UpdateLikeResolver {
  @TypeGraphQL.Mutation(_returns => Like, {
    nullable: true
  })
  async updateLike(@TypeGraphQL.Ctx() ctx: any, @TypeGraphQL.Args() args: UpdateLikeArgs): Promise<Like | null> {
    return getPrismaFromContext(ctx).like.update(args);
  }
}
