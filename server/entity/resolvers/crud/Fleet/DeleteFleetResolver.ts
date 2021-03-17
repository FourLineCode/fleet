import * as TypeGraphQL from "type-graphql";
import { DeleteFleetArgs } from "./args/DeleteFleetArgs";
import { Fleet } from "../../../models/Fleet";
import { transformFields, getPrismaFromContext } from "../../../helpers";

@TypeGraphQL.Resolver(_of => Fleet)
export class DeleteFleetResolver {
  @TypeGraphQL.Mutation(_returns => Fleet, {
    nullable: true
  })
  async deleteFleet(@TypeGraphQL.Ctx() ctx: any, @TypeGraphQL.Args() args: DeleteFleetArgs): Promise<Fleet | null> {
    return getPrismaFromContext(ctx).fleet.delete(args);
  }
}
