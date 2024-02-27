export default {
    name: 'conversation',
    title: 'Conversation',
    type: 'document',
    fields: [
      {
        name: 'email1',
        title: 'Email 1',
        type: 'string',
      },
      {
        name: 'email2',
        title: 'Email 2',
        type: 'string',
      },
      {
        name: 'messages',
        title: 'Messages',
        type: 'array',
        of: [
          {
            type: 'object',
            fields: [
              {
                name: 'messageText',
                title: 'Message Text',
                type: 'string',
              },
              {
                name: 'sender',
                title: 'Sender',
                type: 'string', // Assuming 'sender' is an email string
              },
            ],
          },
        ],
      },
    ],
  };
  