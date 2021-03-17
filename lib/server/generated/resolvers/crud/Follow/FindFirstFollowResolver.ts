import * as TypeGraphQL from "type-graphql";
import { FindFirstFollowArgs } from "./args/FindFirstFollowArgs";
import { Follow } from "../../../models/Follow";
import { transformFields, getPrismaFromContext } from "../../../helpers";

@TypeGraphQL.Resolver(_of => Follow)
export class FindFirstFollowResolver {
  @TypeGraphQL.Query(_returns => Follow, {
    nullable: true
  })
  async findFirstFollow(@TypeGraphQL.Ctx() ctx: any, @TypeGraphQL.Args() args: FindFirstFollowArgs): Promise<Follow | null> {
    return getPrismaFromContext(ctx).follow.findFirst(args);
  }
}
