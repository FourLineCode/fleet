import * as TypeGraphQL from "type-graphql";
import { UpdateFleetArgs } from "./args/UpdateFleetArgs";
import { Fleet } from "../../../models/Fleet";
import { transformFields, getPrismaFromContext } from "../../../helpers";

@TypeGraphQL.Resolver(_of => Fleet)
export class UpdateFleetResolver {
  @TypeGraphQL.Mutation(_returns => Fleet, {
    nullable: true
  })
  async updateFleet(@TypeGraphQL.Ctx() ctx: any, @TypeGraphQL.Args() args: UpdateFleetArgs): Promise<Fleet | null> {
    return getPrismaFromContext(ctx).fleet.update(args);
  }
}
