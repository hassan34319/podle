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
        name: 'description',
        title: 'Description',
        type: 'string',
      },
      {
        name: 'specialTag',
        title: 'Special Tag',
        type: 'string',
      },
      {
        name: 'services',
        title: 'Services',
        type: 'array',
        of: [
          {
            type: 'string',
          },
        ],
      },
      {
        name: 'logo',
        title: 'Logo',
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