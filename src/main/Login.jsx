import React, { useState } from 'react';
import { postCustomer } from '../services/getApi';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [data, setData] = useState({
    name: '',
  });
  const navigate = useNavigate();

  async function submit(e) {
    e.preventDefault();
    if (!data.name) {
      alert("Please fill in the required fields data to create your account.");
      return;
    }
    try {
      const response = await postCustomer(data);
      if (response.status === 200) {
        navigate('/customer');
      } else if (response.status === 400 && response.data && response.data.error === "Data already exists") {
        alert("Data already exists, please try with different data.");
      } else {
        console.error("An error occurred while creating customer:", response.data);
        alert("An error occurred while creating customer. Please try again later.");
      }
    } catch (error) {
      console.error("Error:", error.response ? error.response.data : error.message);
      alert("An error occurred while creating your account. Please try again later.");
    }
  }

  function handle(e) {
    const newData = { ...data };
    newData[e.target.id] = e.target.value;
    setData(newData);
  }

  return (
    <div className="w-full">
      <div className="w-full bg-opacity-20 m-auto max-h-[640px] h-screen flex flex-col lg:flex-col justify-center items-center bg-black">
        <form onSubmit={submit} className="bg-white rounded-md w-[25%] h-[40%] flex flex-col justify-center items-center drop-shadow-xl">
          <p className="flex font-extrabold text-blue-600 text-2xl drop-shadow-md">WELCOME</p>
          <div className="w-[80%] h-[60%] flex flex-col gap-y-1 justify-center">
            <p className="text-slate-400">Input nama <span className="text-red-500">*</span></p>
            <input onChange={handle} id='name' value={data.name} type="text" placeholder="First customer..." className="w-full rounded-md outline outline-blue-600 outline-2 p-1 drop-shadow-lg" />
          </div>
          <button type="submit" className="flex p-2 px-5 bg-blue-600 hover:bg-blue-400 ease-in-out duration-75 rounded font-bold text-white">Confirm</button>
        </form>
      </div>
    </div>
  );
};

export default Login;