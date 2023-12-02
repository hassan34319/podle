export default {
  name: "gig",
  title: "Gig",
  type: "document",
  fields: [
    {
      name: "sellerEmail",
      title: "Seller Email",
      type: "string",
    },
    {
      name: "imageUrl",
      title: "Image URL",
      type: "string",
    },
    {
      name : "numOrders",
      title : "Number of Orders",
      type : "number",
    },
    {
      name: "rating",
      title: "Rating",
      type: "number",
    },
    {
      name: "location",
      title: "Location",
      type: "string",
    },

    {
      name: "title",
      title: "Title",
      type: "string",
    },
    {
      name: "category",
      title: "Category",
      type: "string",
    },
    {
      name: "startingPrice",
      title: "Starting Price",
      type: "number",
    },
    {
      name: "Description",
      title: "Description",
      type: "text",
    },
    {
      name: "basicPackage",
      title: "Basic Package",
      type: "object",
      fields: [
        {
          name: "estimatedDeliveryTime",
          title: "Estimated Delivery Time",
          type: "string",
        },
        {
          name: "price",
          title: "Price",
          type: "number",
        },
        {
          name: "description",
          title: "Description",
          type: "text",
        },
        {
          name: "Services",
          title: "Services",
          type: "array",
          of: [
            {
              type: "object",
              fields: [
                { name: "serviceName", title: "Service Name", type: "string" },
                { name: "included", title: "Included", type: "boolean" }
              ]
            }
          ]
        }
        
      ],
    },
    {
      name: "standardPackage",
      title: "Standard Package",
      type: "object",
      fields: [
        {
          name: "estimatedDeliveryTime",
          title: "Estimated Delivery Time",
          type: "string",
        },
        {
          name: "price",
          title: "Price",
          type: "number",
        },
        {
          name: "description",
          title: "Description",
          type: "text",
        },
        {
          name: "Services",
          title: "Services",
          type: "array",
          of: [
            {
              type: "object",
              fields: [
                { name: "serviceName", title: "Service Name", type: "string" },
                { name: "included", title: "Included", type: "boolean" }
              ]
            }
          ]
        }
        
      ],
    },
    {
      name: "premiumPackage",
      title: "Premium Package",
      type: "object",
      fields: [
        {
          name: "estimatedDeliveryTime",
          title: "Estimated Delivery Time",
          type: "string",
        },
        {
          name: "price",
          title: "Price",
          type: "number",
        },
        {
          name: "description",
          title: "Description",
          type: "text",
        },
        {
          name: "Services",
          title: "Services",
          type: "array",
          of: [
            {
              type: "object",
              fields: [
                { name: "serviceName", title: "Service Name", type: "string" },
                { name: "included", title: "Included", type: "boolean" }
              ]
            }
          ]
        }
        
      ],
    },
    {
      name: "samples",
      title: "Samples",
      type: "array",
      of: [
        {
          type: "string",
        },
      ],
    },
    // Other fields for your business schema
  ],
};
