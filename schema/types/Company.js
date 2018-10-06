const graphql = require(`graphql`)
const axios = require(`axios`)
const UserType = require('./User')

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLList
} = graphql

const CompanyType = new GraphQLObjectType({
  name: 'Company',
  fields: {
    id: { type: GraphQLString },
    name: { type: GraphQLString },
    description: { type: GraphQLString },
    users: {
      type: new GraphQLList(UserType),
      resolve (parentValue, args) {
        return axios.get(`http://localhost:3000/companies/${parentValue.id}/users`)
          .then(r => r.data)
      }
    }
  }
})

module.exports = CompanyType
