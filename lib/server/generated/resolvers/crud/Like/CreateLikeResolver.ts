import * as TypeGraphQL from "type-graphql";
import { CreateLikeArgs } from "./args/CreateLikeArgs";
import { Like } from "../../../models/Like";
import { transformFields, getPrismaFromContext } from "../../../helpers";

@TypeGraphQL.Resolver(_of => Like)
export class CreateLikeResolver {
  @TypeGraphQL.Mutation(_returns => Like, {
    nullable: false
  })
  async createLike(@TypeGraphQL.Ctx() ctx: any, @TypeGraphQL.Args() args: CreateLikeArgs): Promise<Like> {
    return getPrismaFromContext(ctx).like.create(args);
  }
}
