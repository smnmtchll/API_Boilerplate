const { GraphQLServer } = require("graphql-yoga");
const { prisma } = require("./generated/prisma-client");

// Delete this comment later.

const resolvers = {
	Query: {
		info: () => `This is the API of a Hackernews Clone`,
		feed: (root, args, context, info) => {
			return context.prisma.links();
		}
	},
	Mutation: {
		post: (root, args, context) => {
			return context.prisma.createLink({
				url: args.url,
				description: args.description
			});
		}
	}
};

// Bundle the schema and resolvers then start the server
const server = new GraphQLServer({
	typeDefs: "./src/schema.graphql",
	resolvers,
	context: { prisma }
});
server.start(() => console.log(`Server is running on http://localhost:4000`));
