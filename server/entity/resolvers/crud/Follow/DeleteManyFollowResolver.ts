import * as TypeGraphQL from "type-graphql";
import { DeleteManyFollowArgs } from "./args/DeleteManyFollowArgs";
import { Follow } from "../../../models/Follow";
import { AffectedRowsOutput } from "../../outputs/AffectedRowsOutput";
import { transformFields, getPrismaFromContext } from "../../../helpers";

@TypeGraphQL.Resolver(_of => Follow)
export class DeleteManyFollowResolver {
  @TypeGraphQL.Mutation(_returns => AffectedRowsOutput, {
    nullable: false
  })
  async deleteManyFollow(@TypeGraphQL.Ctx() ctx: any, @TypeGraphQL.Args() args: DeleteManyFollowArgs): Promise<AffectedRowsOutput> {
    return getPrismaFromContext(ctx).follow.deleteMany(args);
  }
}
