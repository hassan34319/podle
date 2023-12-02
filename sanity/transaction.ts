export default {
    name: 'transaction',
    title: 'Transaction',
    type: 'document',
    fields: [
      {
        name: 'buyerEmail',
        title: 'Buyer Email',
        type: 'string',
      },
      {
        name: 'sellerEmail',
        title: 'Seller Email',
        type: 'string',
      },
      {
        name: 'amount',
        title: 'Amount',
        type: 'number',
      },
      {
        name: 'status',
        title: 'Status',
        type: 'string',
      },
      {
        name: 'gigID',
        title: 'Gig ID',
        type : 'string'
      },
    ],
  };