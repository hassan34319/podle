export default {
    name: 'contentCreator',
    title: 'Content Creator',
    type: 'document',
    fields: [
      {
        name: 'phoneNumber',
        title: 'Phone Number',
        type: 'string',
        validation: (Rule: any) => Rule.unique(),
      },
      {
        name: 'email',
        title: 'Email',
        type: 'string',
        validation: (Rule: any) => Rule.unique(),
      },
      {
        name: 'userName',
        title: 'UserName',
        type: 'string',
        validation: (Rule: any) => Rule.unique(),
      },
      {
        name: 'profileImage',
        title: 'Profile Image',
        type: 'string',
      },
      {
        name: 'description',
        title: 'Description',
        type: 'string',
      },
      // Other fields for your business schema
    ],
  };
  