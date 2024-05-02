const apiUrl = 'http://localhost:5050';

// Function to fetch menu items
export async function fetchMenu() {
  try {
    const response = await fetch(`${apiUrl}/api/menu`);
    if (!response.ok) {
      throw new Error('Failed to fetch menu items');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching menu:', error);
  }
}

// Function to add a menu item
export async function addMenuItem(menuItem: any) {
  try {
    const response = await fetch(`${apiUrl}/api/menu/add`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(menuItem),
    });
    if (!response.ok) {
      return {message:"Issue Adding Item. Try again."};
    }
    return {message:"Item Added Successfully"};
  } catch (error) {
    console.error('Error adding menu item:', error);
  }
}

// Function to update a menu item
export async function updateMenuItem(id: any, menuItem: any) {
  try {
    console.log(menuItem)
    const response = await fetch(`${apiUrl}/api/menu/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(menuItem),
    });
    if (!response.ok) {
      throw new Error('Failed to update menu item');
    }
    return await response.json();
  } catch (error) {
    console.error('Error updating menu item:', error);
  }
}

// Function to delete a menu item
export async function deleteMenuItem(_id: any) {
  try {
    const response = await fetch(`${apiUrl}/api/menu/${_id}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
     return {message:'Failed to delete menu item'};
    }
    return { message: 'Menu item deleted successfully' };
  } catch (error) {
    console.error('Error deleting menu item:', error);
  }
}
// Function to fetch orders
export async function fetchOrders() {
    try {
      const response = await fetch(`${apiUrl}/api/orders`);
      if (!response.ok) {
        throw new Error('Failed to fetch orders');
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  }
  
  // Function to fetch a specific order by ID
  export async function fetchOrderById(id: any) {
    try {
      const response = await fetch(`${apiUrl}/api/orders/${id}`);
      if (!response.ok) {
        throw new Error('Failed to fetch order');
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching order by ID:', error);
    }
  }
  
  // Function to place a new order
  export async function placeOrder(order: any) {
    try {
      const response = await fetch(`${apiUrl}/api/orders/add`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(order),
      });
      if (!response.ok) {
        throw new Error('Failed to place order');
      }
      return await response.json();
    } catch (error) {
      console.error('Error placing order:', error);
    }
  }
  
  // Function to update an order by ID
  export async function updateOrder(id: any, order: any) {
    try {
      const response = await fetch(`${apiUrl}/api/orders/update/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(order),
      });
      if (!response.ok) {
        throw new Error('Failed to update order');
      }
      return await response.json();
    } catch (error) {
      console.error('Error updating order:', error);
    }
  }
  
  // Function to delete an order by ID
  export async function deleteOrder(id: any) {
    try {
      const response = await fetch(`${apiUrl}/api/orders/delete/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Failed to delete order');
      }
      return { message: 'Order deleted successfully' };
    } catch (error) {
      console.error('Error deleting order:', error);
    }
  }
  
  // Function to fetch tables
export async function fetchTables() {
    try {
      const response = await fetch(`${apiUrl}/api/tables`);
      if (!response.ok) {
        throw new Error('Failed to fetch tables');
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching tables:', error);
    }
  }
  
  // Function to add a new table
  export async function addTable(table: any) {
    try {
      const response = await fetch(`${apiUrl}/api/tables/add`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(table),
      });
      if (!response.ok) {
        throw new Error('Failed to add table');
      }
      return await response.json();
    } catch (error) {
      console.error('Error adding table:', error);
    }
  }
  
  // Function to update a table by ID
  export async function updateTable(id: any, table: any) {
    try {
      const response = await fetch(`${apiUrl}/api/tables/update/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(table),
      });
      if (!response.ok) {
        throw new Error('Failed to update table');
      }
      return await response.json();
    } catch (error) {
      console.error('Error updating table:', error);
    }
  }
  
  // Function to delete a table by ID
  export async function deleteTable(id: any) {
    try {
      const response = await fetch(`${apiUrl}/api/tables/delete/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Failed to delete table');
      }
      return { message: 'Table deleted successfully' };
    } catch (error) {
      console.error('Error deleting table:', error);
    }
  }
  
  // Function to fetch reservations
  export async function fetchReservations() {
    try {
      const response = await fetch(`${apiUrl}/api/reservations`);
      if (!response.ok) {
        throw new Error('Failed to fetch reservations');
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching reservations:', error);
    }
  }
  
  // Function to add a new reservation
  export async function addReservation(reservation: any) {
    try {
      const response = await fetch(`${apiUrl}/api/reservations/add`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(reservation),
      });
      if (!response.ok) {
        return {message:'Failed to add reservation'};
      }
      return {message:"Reservation Added Successfully."};
    } catch (error) {
      console.error('Error adding reservation:', error);
    }
  }
  
  // Function to update a reservation by ID
  export async function updateReservation(id: any, reservation: any) {
    try {
      const response = await fetch(`${apiUrl}/api/reservations/update/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(reservation),
      });
      if (!response.ok) {
        throw new Error('Failed to update reservation');
      }
      return await response.json();
    } catch (error) {
      console.error('Error updating reservation:', error);
    }
  }
  
  // Function to delete a reservation by ID
  export async function deleteReservation(id: any) {
    try {
      const response = await fetch(`${apiUrl}/api/reservations/delete/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Failed to delete reservation');
      }
      return { message: 'Reservation deleted successfully' };
    } catch (error) {
      console.error('Error deleting reservation:', error);
    }
  }
  // Function to add a new order
  export async function addOrder(order: any) {
    try {
      const response = await fetch(`${apiUrl}/api/orders/add`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(order),
      });
      if (!response.ok) {
        throw new Error('Failed to add order');
      }
      return await response.json();
    } catch (error) {
      console.error('Error adding order:', error);
    }
  }
  // Function to fetch employees
  export async function fetchEmployees() {
    try {
      const response = await fetch(`${apiUrl}/employees`);
      if (!response.ok) {
        throw new Error('Failed to fetch employees');
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching employees:', error);
    }
  }
  
  // Function to add a new employee
  export async function addEmployee(employee: any) {
    try {
      const response = await fetch(`${apiUrl}/employees/add`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(employee),
      });
      if (!response.ok) {
        throw new Error('Failed to add employee');
      }
      return await response.json();
    } catch (error) {
      console.error('Error adding employee:', error);
    }
  }
  
  // Function to update an employee by ID
  export async function updateEmployee(id: any, employee: any) {
    try {
      const response = await fetch(`${apiUrl}/employees/update/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(employee),
      });
      if (!response.ok) {
        throw new Error('Failed to update employee');
      }
      return await response.json();
    } catch (error) {
      console.error('Error updating employee:', error);
    }
  }
  
  // Function to delete an employee by ID
  export async function deleteEmployee(id: any) {
    try {
      const response = await fetch(`${apiUrl}/employees/delete/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Failed to delete employee');
      }
      return { message: 'Employee deleted successfully' };
    } catch (error) {
      console.error('Error deleting employee:', error);
    }
  }


// Function to fetch inventory items
export async function fetchInventory() {
  try {
    const response = await fetch(`${apiUrl}/inventory`);
    if (!response.ok) {
      throw new Error('Failed to fetch inventory');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching inventory:', error);
  }
}

// Function to add a new inventory item
export async function addInventory(item: any) {
  try {
    const response = await fetch(`${apiUrl}/inventory/add`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(item),
    });
    if (!response.ok) {
      throw new Error('Failed to add inventory item');
    }
    return await response.json();
  } catch (error) {
    console.error('Error adding inventory item:', error);
  }
}

// Function to update an inventory item by ID
export async function updateInventory(id: any, item: any) {
  try {
    const response = await fetch(`${apiUrl}/inventory/update/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(item),
    });
    if (!response.ok) {
      throw new Error('Failed to update inventory item');
    }
    return await response.json();
  } catch (error) {
    console.error('Error updating inventory item:', error);
  }
}

// Function to delete an inventory item by ID
export async function deleteInventory(id: any) {
  try {
    const response = await fetch(`${apiUrl}/inventory/delete/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error('Failed to delete inventory item');
    }
    return { message: 'Inventory item deleted successfully' };
  } catch (error) {
    console.error('Error deleting inventory item:', error);
  }
}

// Function to fetch payments
export async function fetchPayments() {
  try {
    const response = await fetch(`${apiUrl}/payments`);
    if (!response.ok) {
      throw new Error('Failed to fetch payments');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching payments:', error);
  }
}

// Function to add a new payment
export async function addPayment(payment: any) {
  try {
    const response = await fetch(`${apiUrl}/payments/add`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payment),
    });
    if (!response.ok) {
      throw new Error('Failed to add payment');
    }
    return await response.json();
  } catch (error) {
    console.error('Error adding payment:', error);
  }
}

// Function to update a payment by ID
export async function updatePayment(id: any, payment: any) {
  try {
    const response = await fetch(`${apiUrl}/payments/update/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payment),
    });
    if (!response.ok) {
      throw new Error('Failed to update payment');
    }
    return await response.json();
  } catch (error) {
    console.error('Error updating payment:', error);
  }
}

// Function to delete a payment by ID
export async function deletePayment(id: any) {
  try {
    const response = await fetch(`${apiUrl}/payments/delete/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error('Failed to delete payment');
    }
    return { message: 'Payment deleted successfully' };
  } catch (error) {
    console.error('Error deleting payment:', error);
  }
}

// Function to fetch suppliers
export async function fetchSuppliers() {
    try {
      const response = await fetch(`${apiUrl}/suppliers`);
      if (!response.ok) {
        throw new Error('Failed to fetch suppliers');
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching suppliers:', error);
    }
  }
  
  // Function to add a new supplier
  export async function addSupplier(supplier: any) {
    try {
      const response = await fetch(`${apiUrl}/suppliers/add`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(supplier),
      });
      if (!response.ok) {
        throw new Error('Failed to add supplier');
      }
      return await response.json();
    } catch (error) {
      console.error('Error adding supplier:', error);
    }
  }
  
  // Function to update a supplier by ID
  export async function updateSupplier(id: any, supplier: any) {
    try {
      const response = await fetch(`${apiUrl}/suppliers/update/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(supplier),
      });
      if (!response.ok) {
        throw new Error('Failed to update supplier');
      }
      return await response.json();
    } catch (error) {
      console.error('Error updating supplier:', error);
    }
  }
  
  // Function to delete a supplier by ID
  export async function deleteSupplier(id: any) {
    try {
      const response = await fetch(`${apiUrl}/suppliers/delete/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Failed to delete supplier');
      }
      return { message: 'Supplier deleted successfully' };
    } catch (error) {
      console.error('Error deleting supplier:', error);
    }
  }
  
  // Function to fetch customers
  export async function fetchCustomers() {
    try {
      const response = await fetch(`${apiUrl}/customers`);
      if (!response.ok) {
        throw new Error('Failed to fetch customers');
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching customers:', error);
    }
  }
  
  // Function to add a new customer
  export async function addCustomer(customer: any) {
    try {
      const response = await fetch(`${apiUrl}/customers/add`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(customer),
      });
      if (!response.ok) {
        throw new Error('Failed to add customer');
      }
      return await response.json();
    } catch (error) {
      console.error('Error adding customer:', error);
    }
  }
  
  // Function to update a customer by ID
  export async function updateCustomer(id: any, customer: any) {
    try {
      const response = await fetch(`${apiUrl}/customers/update/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(customer),
      });
      if (!response.ok) {
        throw new Error('Failed to update customer');
      }
      return await response.json();
    } catch (error) {
      console.error('Error updating customer:', error);
    }
  }
  
  // Function to delete a customer by ID
  export async function deleteCustomer(id: any) {
    try {
      const response = await fetch(`${apiUrl}/customers/delete/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Failed to delete customer');
      }
      return { message: 'Customer deleted successfully' };
    } catch (error) {
      console.error('Error deleting customer:', error);
    }
  }
  