export default {
  name: 'claimedBusiness',
  title: 'Service Providers',
  type: 'document',
  fields: [
    {
      name: 'phoneNumber',
      title: 'Phone Number',
      type: 'string',
    },
    {
      name: 'email',
      title: 'Email',
      type: 'string',
    },
    {
      name: 'userName',
      title: 'UserName',
      type: 'string',
    },
    {
      name: 'name',
      title: 'Business Name',
      type: 'string',
    },
    {
      name: 'logo',
      title: 'Logo',
      type: 'string',
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
      name: 'searchResult',
      title: 'Search Result',
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
    // Other fields for your business schema
  ],
};
