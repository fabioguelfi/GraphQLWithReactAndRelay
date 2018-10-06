const graphql = require(`graphql`)
const axios = require(`axios`)
const CompanyType = require(`./types/Company`)
const UserType = require(`./types/User`)
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema
} = graphql

const graphQLSchema = i => new GraphQLSchema(i)

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
    },
    company: {
      type: CompanyType,
      args: { id: { type: GraphQLString } },
      resolve (parentValue, args) {
        const { id } = args
        return axios.get(`http://localhost:3000/companies/${id}`)
          .then(r => r.data)
      }
    }
  }
})

module.exports = graphQLSchema({
  query: RootQuery
})
