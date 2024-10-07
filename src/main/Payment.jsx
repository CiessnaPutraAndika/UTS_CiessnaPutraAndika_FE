import React, { useState, useEffect } from "react";
import { Navbar } from "../components/Navbar";
import { getAllTransaksi, postTransaksi } from "../services/getApi";

const Payment = () => {
    const [post, setPost] = useState({
        total_harga: '',
        pembayaran: '',
        CustomerId: ''
    });

    const [modalVisible, setModalVisible] = useState(false); // State untuk kontrol modal
    const [submittedData, setSubmittedData] = useState(null); // State untuk menyimpan data transaksi yang berhasil

    const submit = async (e) => {
        e.preventDefault();
        if (!post.total_harga || !post.pembayaran || !post.CustomerId) {
            alert('Isi form data dengan lengkap');
            return;
        }

        try {
            const res = await postTransaksi(post);
            if (res.status === 200 || res.status === 201) {
                setSubmittedData(post); // Simpan data transaksi yang berhasil
                setModalVisible(true); // Tampilkan modal
                setPost({ total_harga: '', pembayaran: '', CustomerId: '' }); // Reset form
            } else {
                alert('Terjadi kesalahan saat membuat transaksi. Silakan coba lagi.');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Terjadi kesalahan saat membuat transaksi. Silakan coba lagi nanti.');
        }
    };

    const handle = (e) => {
        const newPost = { ...post };
        newPost[e.target.id] = e.target.value;
        setPost(newPost);
    };

    const [allTransaksi, setAllTransaksi] = useState();

    useEffect(() => {
        getAllTransaksi(allTransaksi)
        .then((res) => {
            setAllTransaksi(res.data);
        });
    }, []);

    const closeModal = () => {
        setModalVisible(false);
        setSubmittedData(null);
    };

    return (
        <div className='w-full min-h-screen bg-slate-200'>
            <Navbar />
            <div className="max-w-[1200px] m-auto max-h-[610px] h-screen flex flex-col lg:flex-col p-2 my-5 items-center">
                <form onSubmit={(e) => {submit(e)}} className=" bg-white rounded-md w-full h-[70%] p-5 flex flex-col gap-4 drop-shadow-md">
                    <p className="font-extrabold text-2xl text-blue-600 ">FORM TRANSAKSI</p>

                    <label className="text-slate-400 font-semibold">Input Harga <span className="text-red-500">*</span></label>
                    <input type="text" onChange={(e) => {handle(e)}} id="total_harga" value={post.total_harga} className="outline outline-2 outline-blue-600 w-full p-2 rounded-md " placeholder="Total Harga..."/>

                    <label className="text-slate-400 font-semibold">Pembayaran <span className="text-red-500">*</span></label>
                    <input type="text" onChange={(e) => {handle(e)}} id="pembayaran" value={post.pembayaran} className="outline outline-2 outline-blue-600 w-full p-2 rounded-md " placeholder="Pembayaran : Cash, Debit atau QRIS..."/>

                    <label className="text-slate-400 font-semibold">Id Customer <span className="text-red-500">*</span></label>
                    <input type="number" onChange={(e) => {handle(e)}} id="CustomerId" value={post.CustomerId} className="outline outline-2 outline-blue-600 w-full p-2 rounded-md " placeholder="Id Customer..."/>

                    <button className="rounded-md bg-blue-600 drop-shadow-md text-white font-bold p-2">Submit Transaksi</button>
                </form>

                {modalVisible && (
                    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                        <div className="bg-white p-5 rounded-lg shadow-lg w-[280px] h-[300px]">
                            <h2 className="text-2xl text-center font-bold mb-4 text-green-600">Transaksi Berhasil!</h2>
                            <div className="bg-slate-100 p-2 rounded-md text-lg font-semibold">
                                <p>Total Harga: {submittedData.total_harga}</p>
                                <p>Pembayaran: {submittedData.pembayaran}</p>
                                <p>Customer ID: {submittedData.CustomerId}</p>
                            </div>
                            <button 
                                onClick={closeModal} 
                                className="mt-4 flex bg-red-500 hover:bg-red-300 ease-in-out duration-75 text-white font-semibold px-4 py-2 rounded">
                                Tutup
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Payment;