import * as TypeGraphQL from "type-graphql";
import { FindManyFleetArgs } from "./args/FindManyFleetArgs";
import { Fleet } from "../../../models/Fleet";
import { transformFields, getPrismaFromContext } from "../../../helpers";

@TypeGraphQL.Resolver(_of => Fleet)
export class FindManyFleetResolver {
  @TypeGraphQL.Query(_returns => [Fleet], {
    nullable: false
  })
  async fleets(@TypeGraphQL.Ctx() ctx: any, @TypeGraphQL.Args() args: FindManyFleetArgs): Promise<Fleet[]> {
    return getPrismaFromContext(ctx).fleet.findMany(args);
  }
}
