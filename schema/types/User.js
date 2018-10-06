const graphql = require(`graphql`)
const axios = require(`axios`)
const CompanyType = require('./Company')

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt
} = graphql

const UserType = new GraphQLObjectType({
  name: 'User',
  fields: {
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
  }
})

module.exports = UserType
