import * as TypeGraphQL from "type-graphql";
import { FindUniqueFleetArgs } from "./args/FindUniqueFleetArgs";
import { Fleet } from "../../../models/Fleet";
import { transformFields, getPrismaFromContext } from "../../../helpers";

@TypeGraphQL.Resolver(_of => Fleet)
export class FindUniqueFleetResolver {
  @TypeGraphQL.Query(_returns => Fleet, {
    nullable: true
  })
  async fleet(@TypeGraphQL.Ctx() ctx: any, @TypeGraphQL.Args() args: FindUniqueFleetArgs): Promise<Fleet | null> {
    return getPrismaFromContext(ctx).fleet.findUnique(args);
  }
}
