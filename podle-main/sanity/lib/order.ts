export default {
    name: 'order',
    title: 'Order',
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
        name: 'price',
        title: 'Price',
        type: 'number',
      },
      {
        name: 'estimatedDelivery',
        title: 'Estimated Delivery',
        type: 'string',
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
      {
        name: 'packageName',
        title: 'Package Name',
        type: 'string',
      },
    ],
  };
  