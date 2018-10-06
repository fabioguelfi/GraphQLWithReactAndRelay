const graphql = require(`graphql`)
const axios = require(`axios`)

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLSchema,
} = graphql

const graphQLSchema = i => new GraphQLSchema(i)

const CompanyType = new GraphQLObjectType({
  name: 'Company',
  fields: {
    id: { type: GraphQLString },
    name: { type: GraphQLString },
    description: { type: GraphQLString }
  }
})

const UserType = new GraphQLObjectType({
  name: 'User',
  fields: {
    id: { type: GraphQLString },
    firstName: { type: GraphQLString },
    age: { type: GraphQLInt },
    company: {
      type: CompanyType
    }
  }
})

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    user: {
      type: UserType,
      args: { id: { type: GraphQLString } },
      resolve (parentValue, args) {
        const { id } = args
        return axios.get(`http://localhost:3000/users/${id}`)
          .then(r => r.data)
      }
    }
  }
})

module.exports = graphQLSchema({
  query: RootQuery
})
