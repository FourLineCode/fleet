import * as TypeGraphQL from "type-graphql";
import { FindFirstFleetArgs } from "./args/FindFirstFleetArgs";
import { Fleet } from "../../../models/Fleet";
import { transformFields, getPrismaFromContext } from "../../../helpers";

@TypeGraphQL.Resolver(_of => Fleet)
export class FindFirstFleetResolver {
  @TypeGraphQL.Query(_returns => Fleet, {
    nullable: true
  })
  async findFirstFleet(@TypeGraphQL.Ctx() ctx: any, @TypeGraphQL.Args() args: FindFirstFleetArgs): Promise<Fleet | null> {
    return getPrismaFromContext(ctx).fleet.findFirst(args);
  }
}
