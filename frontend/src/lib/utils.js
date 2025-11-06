export const getStatusColor = (status) => {
  switch (status) {
    case 'confirmed': return '#28a745'
    case 'shipped': return '#007bff'
    case 'delivered': return '#6f42c1'
    case 'cancelled': return '#dc3545'
    default: return '#6c757d'
  }
}