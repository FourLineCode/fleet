import * as TypeGraphQL from "type-graphql";
import { UpdateManyFleetArgs } from "./args/UpdateManyFleetArgs";
import { Fleet } from "../../../models/Fleet";
import { AffectedRowsOutput } from "../../outputs/AffectedRowsOutput";
import { transformFields, getPrismaFromContext } from "../../../helpers";

@TypeGraphQL.Resolver(_of => Fleet)
export class UpdateManyFleetResolver {
  @TypeGraphQL.Mutation(_returns => AffectedRowsOutput, {
    nullable: false
  })
  async updateManyFleet(@TypeGraphQL.Ctx() ctx: any, @TypeGraphQL.Args() args: UpdateManyFleetArgs): Promise<AffectedRowsOutput> {
    return getPrismaFromContext(ctx).fleet.updateMany(args);
  }
}
