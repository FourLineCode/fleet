import * as TypeGraphQL from "type-graphql";
import { UpsertFollowArgs } from "./args/UpsertFollowArgs";
import { Follow } from "../../../models/Follow";
import { transformFields, getPrismaFromContext } from "../../../helpers";

@TypeGraphQL.Resolver(_of => Follow)
export class UpsertFollowResolver {
  @TypeGraphQL.Mutation(_returns => Follow, {
    nullable: false
  })
  async upsertFollow(@TypeGraphQL.Ctx() ctx: any, @TypeGraphQL.Args() args: UpsertFollowArgs): Promise<Follow> {
    return getPrismaFromContext(ctx).follow.upsert(args);
  }
}
