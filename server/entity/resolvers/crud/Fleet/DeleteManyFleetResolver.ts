import * as TypeGraphQL from "type-graphql";
import { DeleteManyFleetArgs } from "./args/DeleteManyFleetArgs";
import { Fleet } from "../../../models/Fleet";
import { AffectedRowsOutput } from "../../outputs/AffectedRowsOutput";
import { transformFields, getPrismaFromContext } from "../../../helpers";

@TypeGraphQL.Resolver(_of => Fleet)
export class DeleteManyFleetResolver {
  @TypeGraphQL.Mutation(_returns => AffectedRowsOutput, {
    nullable: false
  })
  async deleteManyFleet(@TypeGraphQL.Ctx() ctx: any, @TypeGraphQL.Args() args: DeleteManyFleetArgs): Promise<AffectedRowsOutput> {
    return getPrismaFromContext(ctx).fleet.deleteMany(args);
  }
}
