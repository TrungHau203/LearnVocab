import React, { useState } from 'react'
import { Table } from 'react-bootstrap'
import { useDeleteVocabMutation, useVocab2Query } from '../../../slices/adminSlice';
import Loading from '../../../components/Loading';
import { Link, useLocation } from 'react-router-dom';
import "./AdminVocab.scss"
import UnderHeader from '../../../components/admin/UnderHeader/UnderHeader';
import AddNew from '../AddNew/AddNew';
import queryString from 'query-string';
import { toast } from 'react-toastify';
import Update from '../Update/Update';
const AdminVocab = () => {
  const location = useLocation();
const { searchString, size, page } = queryString.parse(location.search);
console.log(searchString,size,page);
    const { data: vocabs, isLoading, isError } = useVocab2Query({searchString, size, page }); 
    const [deleteVocab] = useDeleteVocabMutation()
    const [updateShow, setUpdateShow] = useState(false);
    const [itemToUpdate, setItemToUpdate] = useState(); 
    const [addShow, setAddShow] = useState(false);
    function keyObject(arr){
        if(arr.length){
            const key = arr.map((item)=>Object.keys(item))
            const uniqueFieldsSet = new Set();
            // Duyệt qua mảng đầu vào và thêm các trường vào Set
            key.forEach((array) => {
            array.forEach((field) => {
                uniqueFieldsSet.add(field);
            });
            });
            // Chuyển Set thành mảng kết quả
            const uniqueFieldsArray = Array.from(uniqueFieldsSet);
            console.log(uniqueFieldsArray);
            return uniqueFieldsArray
        }
    }
    let header = []
    
    if(vocabs?.data) {
        header = keyObject(vocabs.data)
        console.log(header);
    }
    console.log(vocabs&&keyObject(vocabs.data));
    console.log(vocabs);
    // console.log(vocabs.totalSize,vocabs.size,vocabs.page);
  return (
    <div >
    {
        vocabs?.data ?
        (
          <div>
          <UnderHeader setAddShow={setAddShow}  />
          { addShow && <AddNew addShow={addShow} setAddShow={setAddShow} header={header} />}
          {(updateShow && itemToUpdate)&&<Update updateShow={updateShow} setUpdateShow={setUpdateShow} itemToUpdate={itemToUpdate} header={header}/>}
          <div className='vocabTable'>

            <Table striped bordered hover responsive >
            <thead>
                <tr>
                {
                    header&&(header.map((item,index)=>(
                        <th style={((item === "review_status")||(item === "multi_answer")) ? { display: "none" } : ((item === "position") ? {  } : {minWidth:"200px"})} key={index}>{item}</th>
                    )))
                }
                <th>Option</th>
                </tr>
            </thead>
            <tbody>
            {vocabs.data.map((item, index) => (
              <tr key={index}>
                {header.map((header, index) => (
                  <td style={((header === "review_status")||(header === "multi_answer")) ? { display: "none" } : {}} key={index} >
                    <p >{item[header]}</p>
                  </td>
                ))}
                <td key={index}>
                <Link onClick={() =>{setUpdateShow(true); setItemToUpdate(item); }}>Sửa</Link>
                    <Link 
                      onClick={async(e)=> {
                        e.preventDefault();
                          try {
                              console.log("hi");
                              const res = await deleteVocab( {...item }).unwrap()
                              console.log(item)
                              toast(res.message);
                            window.location.reload()
                          } catch (err) {
                            console.log(err);
                            toast.error(`${err.data.message}`)
                          }
                      }}
                    >Xóa</Link>
                </td>
              </tr>
            ))}
            </tbody>
            </Table>
          </div>
          </div>
        )
        : <Loading/>
    } 
    </div>
  )
}

export default AdminVocab