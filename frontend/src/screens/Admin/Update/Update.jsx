import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Modal } from "react-bootstrap";
import "./Update.scss";
import { toast } from "react-toastify";
import { useUpdateCourseMutation, useUpdateLessonMutation, useUpdateVocabMutation } from "../../../slices/adminSlice";
// import queryString from "query-string";
const Update = ({updateShow,setUpdateShow,itemToUpdate, header}) => {
    const location = useLocation();
    const [updateCourse] = useUpdateCourseMutation()
    const [updateLesson] = useUpdateLessonMutation()
    const [updateVocab] = useUpdateVocabMutation()
  
  const [title, setTitle] = useState("");
  const [data, setData] = useState({});
  const [dataInput, setDataInput] = useState();
  const [prevData, setPrevData] = useState(itemToUpdate);
  useEffect(() => {
    const path = location.pathname;

    if (path.includes("/admin/Users")) {
      setTitle("Users");
    //   setInputTag(input.users);
    } else if (path.includes("/admin/Courses")) {
      setTitle("Courses");
      setDataInput(header)
    //   setInputTag(input.courses);
    } else if (path.includes("/admin/Lessons")) {
      setTitle("Lessons");
      // setInputTag(input.lessons);
    } else if (path.includes("/admin/Vocabularies")) {
      setTitle("Vocabularies");
      // setInputTag(input.vocabularies);
    }
  }, [location.pathname]);
  const handleInput = (e) => {
    const id = e.target.id;
    const value = e.target.value;
    setPrevData({ ...prevData, [id]: value });
  };
  if (JSON.stringify(prevData) !== JSON.stringify(data)) {
    setData({ ...data, ...prevData });
  }
  console.log(data);

  console.log(title);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log(data);
      if(title == "Users") {
        // const res = await register( { ...data }).unwrap()
        // toast(res.message);
      } else if(title == "Courses") {
        const res = await updateCourse( { ...data }).unwrap()
        toast(res.message);
      } else if(title == "Lessons") {
        const res = await updateLesson( { ...data }).unwrap()
        toast(res.message);
      } else if(title == "Vocabularies") {
        const res = await updateVocab( { ...data }).unwrap()
        toast(res.message);
      }
      window.location.reload()
    } catch (err) {
      console.log(err);
      toast.error(`${err.data.message}`)

    }
  };
  useEffect(() => {
    setDataInput(Object.entries(itemToUpdate || {}))//chuyển thành mảng với cặp giá trị là nameField và value
  }, [itemToUpdate]);
  return dataInput&&(
    <div className="update">
      <Modal
        show={updateShow}
        onHide={() => setUpdateShow(false)}
        dialogClassName="update_modal-90w"
        aria-labelledby="example-custom-modal-styling-title"
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-custom-modal-styling-title">
          <div className="">
            <h1>Update {title}</h1>
          </div>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <div className="updateContainer">
              <div className="updateContainer_bottom">
                <div className="updateContainer_bottom-right">
                  <form onSubmit={handleSubmit}>
                    <div className="update-form">
                    {
                      dataInput?.map(([key,value]) => (
                        <div className="update-formInput" key={key}>
                          <label>{key}</label>
                          {
                            (key==="_id")?<input
                            id={key}
                            // type={input.type}
                            // placeholder={input.placeholder}
                            defaultValue={value}
                            disabled
                            onChange={handleInput}
                          />:<input
                            id={key}
                            // type={input.type}
                            // placeholder={input.placeholder}
                            defaultValue={value}
                            onChange={handleInput}
                          />
                          }
                        </div>
                      ))
                    }
                      
                    </div>
                    <button type="submit">Send</button>
                  </form>
                </div>
              </div>
            </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default Update;
