import { useState } from 'react'
import { Table } from 'react-bootstrap'
import Loading from '../../../components/Loading';
import { Link, useLocation } from 'react-router-dom';
import UnderHeader from '../../../components/admin/UnderHeader/UnderHeader';
import queryString from 'query-string';
import { useCourses2Query, useDeleteCourseMutation } from '../../../slices/adminSlice';
import AddNew from '../AddNew/AddNew';
import Update from '../Update/Update';
import { toast } from 'react-toastify';
// import "./AdminCourse.scss"
const AdminCourse = () => {
  const location = useLocation();
const { searchString, size, page } = queryString.parse(location.search);
console.log(searchString,size,page);
const [addShow, setAddShow] = useState(false);
const [updateShow, setUpdateShow] = useState(false);
const [itemToUpdate, setItemToUpdate] = useState(); 
    const { data: courses, isLoading } = useCourses2Query({searchString, size, page }); 
    const [deleteCourse] = useDeleteCourseMutation()
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
    if(courses?.data) {
        header = keyObject(courses.data)
        console.log(header);
    }
    console.log(courses&&keyObject(courses.data));
  return (
    <div className='AdminCourse'>
    {
        courses?.data ?
        (
          <div>
          <UnderHeader setAddShow={setAddShow}  />
          { addShow && <AddNew addShow={addShow} setAddShow={setAddShow} header={header} />}
          {(updateShow && itemToUpdate)&&<Update updateShow={updateShow} setUpdateShow={setUpdateShow} itemToUpdate={itemToUpdate} header={header}/>}
            <Table striped bordered hover responsive>
            <thead>
                <tr>
                {
                    header&&(header.map((item,index)=>(
                        <th key={index}>{item}</th>
                    )))
                }
                <th>Option</th>
                </tr>
            </thead>
            <tbody>
            {courses.data.map((item, index) => (
              <tr key={index}>
                {header.map((header, index) => (
                  <td key={index} >
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
                              const res = await deleteCourse( {...item }).unwrap()
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
        )
        : <Loading/>
    } 
    </div>
  )
}

export default AdminCourse