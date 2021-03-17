import * as TypeGraphQL from "type-graphql";
import { FindUniqueLikeArgs } from "./args/FindUniqueLikeArgs";
import { Like } from "../../../models/Like";
import { transformFields, getPrismaFromContext } from "../../../helpers";

@TypeGraphQL.Resolver(_of => Like)
export class FindUniqueLikeResolver {
  @TypeGraphQL.Query(_returns => Like, {
    nullable: true
  })
  async like(@TypeGraphQL.Ctx() ctx: any, @TypeGraphQL.Args() args: FindUniqueLikeArgs): Promise<Like | null> {
    return getPrismaFromContext(ctx).like.findUnique(args);
  }
}
