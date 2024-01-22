import React, { useState } from "react";
import { Table } from "react-bootstrap";
import { useDeleteLessonMutation, useLessonsQuery } from "../../../slices/adminSlice";
import Loading from "../../../components/Loading";
import { Link, useLocation } from "react-router-dom";
import UnderHeader from "../../../components/admin/UnderHeader/UnderHeader";
import AddNew from "../AddNew/AddNew";
import queryString from 'query-string';
import Update from "../Update/Update";
import { toast } from "react-toastify";
// import "./AdminLesson.scss"
const AdminLesson = () => {
  const location = useLocation();
const { searchString, size, page } = queryString.parse(location.search);
const [addShow, setAddShow] = useState(false);
const [updateShow, setUpdateShow] = useState(false);
const [itemToUpdate, setItemToUpdate] = useState(); 
const { data: lessons, isLoading, isError } = useLessonsQuery({searchString, size, page });
const [deleteLesson] = useDeleteLessonMutation()
  function keyObject(arr) {
    if (arr.length) {
      const key = arr.map((item) => Object.keys(item));
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
      return uniqueFieldsArray;
    }
  }
  let header = [];
  if (lessons?.data) {
    header = keyObject(lessons.data);
    console.log(header);
  }
  console.log(lessons && keyObject(lessons.data));
  console.log(lessons);
  return (
    <div className="AdminLesson">
      {lessons?.data ? (
        <div>
        <UnderHeader setAddShow={setAddShow}  />
        { addShow && <AddNew addShow={addShow} setAddShow={setAddShow} header={header} />}
          {(updateShow && itemToUpdate)&&<Update updateShow={updateShow} setUpdateShow={setUpdateShow} itemToUpdate={itemToUpdate} header={header}/>}
          <Table striped bordered hover responsive size="sm">
            <thead>
              <tr>
                {header &&
                  header.map((item, index) => <th key={index}>{item}</th>)}
                <th>Option</th>
              </tr>
            </thead>
            <tbody>
              {lessons.data.map((item, index) => (
                <tr key={index}>
                  {header.map((header, index) => (
                    <td key={index}>
                      <p>{item[header]}</p>
                    </td>
                  ))}
                  <td key={index}>
                    <Link onClick={() =>{setUpdateShow(true); setItemToUpdate(item); }} to="">Sửa</Link>
                    <Link 
                      onClick={async(e)=> {
                        e.preventDefault();
                          try {
                              console.log("hi");
                              const res = await deleteLesson( {...item }).unwrap()
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
      ) : (
        <Loading />
      )}
    </div>
  );
};

export default AdminLesson;
