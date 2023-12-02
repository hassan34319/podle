export default {
    name: 'autoBusiness',
    title: 'Auto Add Business',
    type: 'document',
    fields: [
      {
        name: 'name',
        title: 'Name',
        type: 'string',
      },
      {
        name: 'logo',
        title: 'Logo',
        type: 'image',
      },
      {
        name: 'streetAddress',
        title: 'Street Address',
        type: 'string',
      },
      {
        name: 'city',
        title: 'City',
        type: 'string',
      },
      {
        name: 'state',
        title: 'State',
        type: 'string',
      },
      {
        name: 'zipCode',
        title: 'Zip Code',
        type: 'string',
      },
      {
        name: 'phoneNumber',
        title: 'Phone Number',
        type: 'string',
      },
      {
        name : 'searchResult',
        title : 'Search Result',
        type : 'string'
      },
      // Other fields for your business schema
    ],
  };