import * as TypeGraphQL from "type-graphql";
import { UpdateFollowArgs } from "./args/UpdateFollowArgs";
import { Follow } from "../../../models/Follow";
import { transformFields, getPrismaFromContext } from "../../../helpers";

@TypeGraphQL.Resolver(_of => Follow)
export class UpdateFollowResolver {
  @TypeGraphQL.Mutation(_returns => Follow, {
    nullable: true
  })
  async updateFollow(@TypeGraphQL.Ctx() ctx: any, @TypeGraphQL.Args() args: UpdateFollowArgs): Promise<Follow | null> {
    return getPrismaFromContext(ctx).follow.update(args);
  }
}
