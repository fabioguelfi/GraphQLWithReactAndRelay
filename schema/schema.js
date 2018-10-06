const graphql = require(`graphql`)
const axios = require(`axios`)

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLSchema,
} = graphql

const graphQLSchema = i => new GraphQLSchema(i)

const users = [
  { id: 23, firstName: 'Bill', age: 20 },
  { id: 47, firstName: 'Samantha', age: 21 }
]

const UserType = new GraphQLObjectType({
  name: 'User',
  fields: {
    id: { type: GraphQLString },
    firstName: { type: GraphQLString },
    age: { type: GraphQLInt }
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
