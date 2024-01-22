import React, { useState } from 'react'
import { Table } from 'react-bootstrap'
import { useUsersQuery } from '../../../slices/adminSlice';
import Loading from '../../../components/Loading';
import { Link, useLocation } from 'react-router-dom';
import UnderHeader from '../../../components/admin/UnderHeader/UnderHeader';
import AddNew from '../AddNew/AddNew';
import queryString from 'query-string';
const AdminUser = () => {
  const location = useLocation();
const { searchString, size, page } = queryString.parse(location.search);
    const { data: users, isLoading, isError } = useUsersQuery({ searchString, size, page }); 
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
    if(users?.data) {
        header = keyObject(users.data)
        console.log(header);
    }
    console.log(users&&keyObject(users.data));
    console.log(users);
  return (
    <div className='AdminUser'>
    {
        users?.data ? 
        (
          <div>
          <UnderHeader setAddShow={setAddShow}  />
          { addShow && <AddNew addShow={addShow} setAddShow={setAddShow} header={header} />}
            <Table striped bordered hover responsive>
            <thead>
                <tr>
                {
                    header&&(header.map((item,index)=>(
                        <th key={index} style={((item === "password")||(item === "_id")) ? { display: "none" } : {}}>{item}</th>
                    )))
                }
                <th>Option</th>
                </tr>
            </thead>
            <tbody>
            {users.data.map((item, index) => (
              <tr key={index}>
                {header.map((header, index) => (
                  <td key={index} style={((header === "password")||(header === "_id")) ? { display: "none" } : {}}>
                    <p style={(header === "address") ? { width:"200px" } : {}}>{item[header]}</p>
                  </td>
                ))}
                <td key={index}>
                    <Link to="" >Sửa</Link>
                    <Link to="" >Xóa</Link>
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

export default AdminUser