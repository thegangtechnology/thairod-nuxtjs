const apiPath = {
  address: 'api/address',
  batchShipment: 'api/batch-shipments',
  order: 'api/orders',
  orderItems: 'api/order-items',
  orderFlow: {
    create: 'api/order-flows/create-flow',
    hash: 'api/order-flows/hash',
    doctorCheckout: 'api/order-flows/doctor-checkout',
    patientCheckout: 'api/order-flows/patient-checkout',
  },
  printLabel: 'api/printlabel',
  product: 'api/products',
  productImage: 'api/product-images',
  productVariation: 'api/product-variations',
  procurement: 'api/procurements',
  shipment: 'api/shipments',
  stock: 'api/stock',
  stockAdjustment: 'api/stock-adjustments',
  trackingStatus: 'api/tracking-status',
  warehouse: 'api/warehouses',
}

export default apiPath
