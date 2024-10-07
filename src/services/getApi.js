import axios from "axios";

// MENU API
export const getAllMenu = () => {
    return axios.get('http://localhost:3001/menu')
    .then(response => response)
}

export const postMenu = async (a) => {
    try {
      const response = await axios.post('http://localhost:3001/menu/create', a);
      return response;
    } catch (error) {
      throw error;
    }
  };

export const updateMenu = async (data, id) => {
    return await axios.put(`http://localhost:3001/menu/update/` + id, data)
    .then(res => res.data)
}

export const deleteMenu = async (id) => {
    return await axios.delete(`http://localhost:3001/menu/delete/${id}`)
    .then(res => res.data)
}


// MEJA API
export const getAllTable = () => {
    return axios.get('http://localhost:3001/table')
    .then(response => response)
}

export const postTable = async (a) => {
    return await axios.post('http://localhost:3001/table/create', a)
    .then(res => res.data)
}

export const updateTable = async (data, id) => {
    return await axios.put(`http://localhost:3001/table/update/` + id, data)
    .then(res => res.data)
}

export const deleteTable = async (id) => {
    return await axios.delete(`http://localhost:3001/table/delete/${id}`)
    .then(res => res.data)
}


// CUSTOMER API
export const postCustomer = async (a) => {
    return await axios.post('http://localhost:3001/customer/create', a)
    .then(response => response)
};

export const getAllCustomer = () => {
    return axios.get('http://localhost:3001/customer')
    .then(response => response)
}

export const updateCustomer = async (data, id) => {
    return await axios.put(`http://localhost:3001/customer/update/` + id, data)
    .then(res => res.data)
}

export const deleteCustomer = async (id) => {
    return await axios.delete(`http://localhost:3001/customer/delete/${id}`)
    .then(res => res.data)
}

// ORDER API
export const postOrder = async (a) => {
    return await axios.post('http://localhost:3001/order/create', a)
    .then(response => response)
};

export const getAllOrder = () => {
    return axios.get('http://localhost:3001/order')
    .then(response => response)
}

export const updateOrder = async (data, id) => {
    return await axios.put(`http://localhost:3001/order/update/` + id, data)
    .then(res => res.data)
}

export const deleteOrder = async (id) => {
    return await axios.delete(`http://localhost:3001/order/delete/${id}`)
    .then(res => res.data)
}

// PAYMENT API
export const postTransaksi = async (a) => {
    return await axios.post(`http://localhost:3001/transaksi/create`, a)
    .then(response => response)
}

export const getAllTransaksi = async () => {
    return await axios.get(`http://localhost:3001/transaksi`)
    .then(response => response)
}