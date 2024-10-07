import React, { useEffect, useState } from 'react'
import { Button } from '../components/Button'
import { Navbar } from '../components/Navbar'
import { Modal } from '../components/Modal'
import { EditModal } from '../components/Modals'
import { deleteMenu, getAllMenu, postMenu, updateMenu } from '../services/getApi'

const Menu = (props) => {
    // create
    const [isModalOpen, setIsModalOpen] = useState(false);
    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);    
    
    const [isOpen, setIsOpen] = useState(false);

    // get menu
    const [allMenu, setAllMenu] = useState()

    useEffect(() => {
        getAllMenu(allMenu)
        .then((res) => {
            setAllMenu(res.data)
        })
    }, [])
    console.log(allMenu);
    
    // post menu
    const [post, setPost] = useState({
        menu_name: '',
        description: '',
        harga: '',
        gambar: '',
        CustomerId: '',
        OrderId: ''
    })

    const submit = (e) => {
        e.preventDefault();
        if (!post.menu_name || !post.description || !post.harga || !post.gambar || !post.CustomerId || !post.OrderId){
            alert('Isi form data dengan lengkap')
            return;
        }

        postMenu(post)
        .then(res => {
            console.log(res);
            if(post){
                alert('Menu successfully created, please refresh the page!')
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

    // update menu
    const [put, setPut] = useState({
        id: '', // Add ID field to match API endpoint
        menu_name: '',
        description: '',
        harga: '',
        gambar: '',
        CustomerId: '',
        OrderId: ''
    });

    const getDataId = () => {
        updateMenu(put, put.id)
        .then(res => {
            console.log(res);
            if(put){
                alert('Menu successfully edited! Please refresh the page')
            }
            setIsOpen(false); // Close the modal after successful PUT request
        })
        .catch(error => console.error('Error:', error));
    };

    function handleData(e) {
        const newPut = { ...put };
        newPut[e.target.id] = e.target.value;
        setPut(newPut);
    }

    // delete menu
    const deletedMenu = async (id) => {
        try{
            await deleteMenu(id)
            const updatedPost = allMenu.filter(post => post.id !== id);
            if(updatedPost){
                alert('Menu successfully deleted!')
            }
            setAllMenu(updatedPost)
        }catch (error){
            console.error('error deleting post: ', error)
        }
    }

    return (
    <div className='w-full bg-slate-200'>
        <Navbar></Navbar>
        <div className='max-w-[1300px] m-auto max-h-[610px] h-screen flex flex-col lg:flex-col  items-center'>
            <div className='w-[85%] h-full py-4 gap-2 flex flex-col'>
                <div className='flex justify-between items-center w-full'>
                    <p className='w-[20%] font-extrabold text-blue-600 text-2xl'>LIST MENU</p>
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
                            title="Tambah Menu"                        
                        >
                            <div className='flex flex-col gap-y-3'>
                                <input onChange = {(e) => handle(e)} id='menu_name' value={post.menu_name} type="text" placeholder='Name Menu...' className='w-full outline outline-2 flex rounded-md outline-blue-600 p-2 text-blue-600'/>

                                <input onChange ={(e) => handle(e)} id='description' value={post.description} type="text" placeholder='Description...' className='w-full outline outline-2 flex rounded-md outline-blue-600 p-2 text-blue-600'/>

                                <input onChange={(e) => handle(e)} id='harga' value={post.harga} type="number" placeholder='Harga...' className='w-full outline outline-2 flex rounded-md outline-blue-600 p-2 text-blue-600'/>

                                <input onChange={(e) => handle(e)} id='gambar' value={post.gambar} type="text" placeholder='Url Gambar...' className='w-full outline outline-2 flex rounded-md outline-blue-600 p-2 text-blue-600'/>

                                <input onChange={(e) => handle(e)} id='CustomerId' value={post.CustomerId} type="number" placeholder='Customer Id...' className='w-full outline outline-2 flex rounded-md outline-blue-600 p-2 text-blue-600'/>

                                <input onChange={(e) => handle(e)} id='OrderId' value={post.OrderId} type="number" placeholder='Order Id...' className='w-full outline outline-2 flex rounded-md outline-blue-600 p-2 text-blue-600'/>
                            </div>
                        </Modal>
                    </form>
                </div>
                <div className='w-full max-h-[350px] m-auto h-screen flex justify-center p-2 gap-5 overflow-x-auto'>
                    <div className='w-full flex space-x-5'>
                        {
                            allMenu?.map((items, key) => {
                                return (
                                    <div key={key} className='bg-white shadow-lg rounded-xl w-[300px] p-2 px-5 flex flex-col gap-4'>
                                        <div className='flex justify-between items-center'>
                                            <h3 className='text-xl font-bold text-blue-600'>{items.menu_name}</h3>
                                            <p className='text-sm text-slate-500'>{items.harga}</p>
                                        </div>
                                        <p className='text-slate-400'>{items.description}</p>
                                        <img src={items.gambar} alt={items.menu_name} className='w-full h-[150px] object-cover rounded-md' />
                                        <div className='flex gap-x-2 justify-end items-center'>
                                            <Button
                                                onClick={() => setIsOpen(true)}
                                                className="px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-500"
                                            >
                                                Edit
                                            </Button>
                                            <EditModal open={isOpen} setOpen={setIsOpen} put={put} handleData={handleData} getDataId={getDataId} />

                                            <Button onClick={() => deletedMenu(items.id)} variant="bg-red-500 hover:bg-red-400">Delete</Button>
                                        </div>
                                    </div>
                                );
                            })
                        }
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Menu