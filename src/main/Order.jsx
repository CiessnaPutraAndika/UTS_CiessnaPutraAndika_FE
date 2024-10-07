import React, { useState, useEffect } from 'react'
import { Button } from '../components/Button'
import { Navbar } from '../components/Navbar'
import { Modal } from '../components/Modal'
import { Modals } from '../components/EditModal'
import { deleteOrder, getAllOrder, postOrder, updateOrder } from '../services/getApi'

const Order = (props) => {

    // create
    const [isModalOpen, setIsModalOpen] = useState(false);
    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);  
    
    // edit
    const [modalOpen, setModalOpen] = useState(false);
    const openModals = () => setModalOpen(true);
    const closeModals = () => setModalOpen(false);

    const [allOrder, setAllOrder] = useState()

    useEffect(() => {
        getAllOrder(allOrder)
        .then((res) => {
            setAllOrder(res.data)
        })
    }, [])
    console.log(allOrder);

    const [post, setPost] = useState({
        status: '',
        CustomerId: '',
        TableId: ''
    })

    const submit = (e) => {
        e.preventDefault();
        if (!post.status || !post.CustomerId || !post.TableId){
            alert('Isi form data dengan lengkap')
            return;
        }

        postOrder(post)
        .then(res => {
            console.log(res);
            if(post){
                alert('Table successfully created, please refresh the page!')
            }
            closeModal();
            return res.data;
        })
        .catch(error => {
            console.error('Error :', error)
            alert('An error occurred while creating Table. Please try again later.')
        })
    }

    const handle = (e) => {
        const newPost = {...post}
        newPost[e.target.id]=e.target.value
        setPost(newPost)
    }

    const [put, setPut] = useState({
        id: '', // Add ID field to match API endpoint
        status: '',    
        CustomerId: '',
        TableId: ''
    });

    const getDataId = () => {
        updateOrder(put, put.id)
        .then(res => {
            console.log(res);
            if(put){
                alert('Table successfully edited! Please refresh the page')
            }
            closeModals(); // Close the modal after successful PUT request
        })
        .catch(error => console.error('Error:', error));
    };

    function handleData(e) {
        const newPut = { ...put };
        newPut[e.target.id] = e.target.value;
        setPut(newPut);
    }

    // delete menu
    const deletedOrder = async (id) => {
        try{
            await deleteOrder(id)
            const updatedPost = allOrder.filter(post => post.id !== id);
            if(updatedPost){
                alert('Menu successfully deleted!')
            }
            setAllOrder(updatedPost)
        }catch (error){
            console.error('error deleting post: ', error)
        }
    }    

  return (
    <div className='w-full bg-slate-200'>
        <Navbar></Navbar>
        <div className='max-w-[1200px] m-auto max-h-[610px] h-screen flex flex-col lg:flex-col justify-center items-center'>
            <div className='w-[85%]'>
                <div className='flex justify-between items-center w-full'>
                    <p className='w-[20%] font-extrabold text-blue-600 text-2xl'>LIST ORDER</p>
                    <div className='flex justify-end items-center w-[80%]'>
                        <Button 
                            variant="bg-red-500 hover:bg-red-300" 
                            onClick={openModal}
                        >
                            {props.button}Tambah
                        </Button>
                    </div>
                    <form onSubmit={(e) => {submit(e)}}>
                        <Modal 
                            isOpen={isModalOpen} 
                            onClose={closeModal} 
                            title="Tambah Order"                        
                        >
                            <div className='flex flex-col gap-y-3'>
                                <input onChange = {(e) => handle(e)} id='status' value={post.status} type="text" placeholder='Status : pending or reserved...' className='w-full outline outline-2 flex rounded-md outline-blue-600 p-2 text-blue-600'/>

                                <input onChange={(e) => handle(e)} id='CustomerId' value={post.CustomerId} type="number" placeholder='Id customer...' className='w-full outline outline-2 flex rounded-md outline-blue-600 p-2 text-blue-600'/>

                                <input onChange={(e) => handle(e)} id='TableId' value={post.TableId} type="number" placeholder='Id Table...' className='w-full outline outline-2 flex rounded-md outline-blue-600 p-2 text-blue-600'/>
                            </div>
                        </Modal>
                    </form>
                </div>
                <div className='w-[90%] max-h-[500px] m-auto h-screen flex justify-center p-2 lg:max-w-[920px] md:max-w-[800px] sm:max-w-[700px] gap-5 overflow-x-auto' style={{ scrollbarWidth: '6px' }}>
                    <div className='w-full overflow-x-auto'>
                        <table className='shadow-lg w-full min-w-[600px]'>
                            <thead className='text-white rounded-t-lg'>
                            <tr>
                                <th className='py-3 bg-blue-600 rounded-tl-lg'>Id</th>
                                <th className='py-3 bg-blue-600'>Status</th>                                
                                <th className='py-3 bg-blue-600'>Customer Id</th>
                                <th className='py-3 bg-blue-600'>Table Id</th>
                                <th className='py-3 bg-blue-600 rounded-tr-lg'>Action</th>
                            </tr>
                            </thead>
                                {
                                    allOrder?.map((items, key) => {
                                        return(                                        
                                        <tbody className='text-center'>
                                            <tr className='bg-white cursor-pointer' key={key}>
                                                <td className='py-3 px-6 rounded-bl-lg'>{items.id}</td>
                                                <td className='py-3 px-6'>{items.status}</td>
                                                <td className='py-3 px-6'>{items.CustomerId}</td>
                                                <td className='py-3 px-6'>{items.TableId}</td>
                                                <td className='py-3 px-6 rounded-br-lg gap-x-2 flex justify-center items-center'>
                                                    <Button onClick={openModals}>{props.button}Edit</Button>
                                                    <form onSubmit={(e) => { e.preventDefault(); getDataId(); }}>        
                                                    <Modals
                                                        isBuka={modalOpen} 
                                                        onTutup={closeModals} 
                                                        judul="Edit Order"
                                                    >
                                                        <div className='flex flex-col gap-y-3'>
                                                            <input onChange = {(e) => handleData(e)} id='id' value={put.id} type="text" placeholder='Enter Id...' className='w-full outline outline-2 flex rounded-md outline-blue-600 p-2 text-blue-600'/>

                                                            <input onChange = {(e) => handleData(e)} id='status' value={put.status} type="text" placeholder='Status : pending atau reserved...' className='w-full outline outline-2 flex rounded-md outline-blue-600 p-2 text-blue-600'/>     

                                                            <input onChange = {(e) => handleData(e)} id='CustomerId' value={put.CustomerId} type="number" placeholder='Customer Id...' className='w-full outline outline-2 flex rounded-md outline-blue-600 p-2 text-blue-600'/>

                                                            <input onChange = {(e) => handleData(e)} id='TableId' value={put.TableId} type="number" placeholder='Table Id...' className='w-full outline outline-2 flex rounded-md outline-blue-600 p-2 text-blue-600'/>
                                                        </div>
                                                    </Modals>
                                                    </form>
                                                    <Button onClick={() => {deletedOrder(items.id)}} variant="bg-red-500 hover:bg-red-300">{props.button}Delete</Button>
                                                </td>
                                            </tr>
                                        </tbody>
                                        )
                                    })
                                }
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Order