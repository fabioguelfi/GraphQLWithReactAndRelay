const graphql = require(`graphql`)
const axios = require(`axios`)

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLSchema,
  GraphQLList,
  GraphQLNonNull
} = graphql

const CompanyType = new GraphQLObjectType({
  name: 'Company',
  fields: () => ({
    id: { type: GraphQLString },
    name: { type: GraphQLString },
    description: { type: GraphQLString },
    users: {
      type: new GraphQLList(UserType),
      resolve (parentValue, args) {
        const { id } = parentValue
        return axios.get(`http://localhost:3000/companies/${id}/users`)
          .then(r => r.data)
      }
    }
  })
})

const UserType = new GraphQLObjectType({
  name: 'User',
  fields: () => ({
    id: { type: GraphQLString },
    firstName: { type: GraphQLString },
    age: { type: GraphQLInt },
    company: {
      type: CompanyType,
      resolve (parentValue, args) {
        const { companyId } = parentValue
        return axios.get(`http://localhost:3000/companies/${companyId}`)
          .then(r => r.data)
      }
    }
  })
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

const mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    addUser: {
      type: UserType,
      args: {
        firstName: { type: new GraphQLNonNull(GraphQLString) },
        age: { type: GraphQLInt },
        companyId: { type: GraphQLString }
      },
      resolve (parentValue, { firstName, age, companyId }) {
        return axios.post(`http://localhost:3000/users`, { firstName, age, companyId })
          .then(r => r.data)
      }
    }
  }
})

module.exports = new GraphQLSchema({
  mutation,
  query: RootQuery
})
