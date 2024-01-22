import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Modal } from "react-bootstrap";
import "./AddNew.scss";
import { useRegisterMutation } from "../../../slices/userApiSlice";
import { toast } from "react-toastify";
import { useAddCourseMutation, useAddLessonMutation, useAddVocabMutation } from "../../../slices/adminSlice";
const AddNew = ({addShow,setAddShow, header}) => {
  const [data, setData] = useState({});
  const [inputTag, setInputTag] = useState([]);
  const [title, setTitle] = useState("");
  const navigate = useNavigate();
  const [register] = useRegisterMutation()
  const [addCourse] = useAddCourseMutation()
  const [addLesson] = useAddLessonMutation()
  const [addVocab] = useAddVocabMutation()

  const location = useLocation();
  useEffect(() => {
    const path = location.pathname;

    if (path.includes("/admin/Users")) {
      setTitle("Users");
      // eslint-disable-next-line react/prop-types
      const newheader = header.slice(1, -3);
      setInputTag(newheader);
    } else if (path.includes("/admin/Courses")) {
      setTitle("Courses");
      const newheader = header.slice(1);
      setInputTag(newheader);
    } else if (path.includes("/admin/Lessons")) {
      setTitle("Lessons");
      const newheader = header.slice(1);
      setInputTag(newheader);
    } else if (path.includes("/admin/Vocabularies")) {
      setTitle("Vocabularies");
      const newheader = header.slice(1);
      setInputTag(newheader);
      // setInputTag(input.vocabularies);
    }
  }, [location.pathname]);
  const handleInput = (e) => {
    const id = e.target.id;
    const value = e.target.value;
    setData({ ...data, [id]: value });
    console.log(data);
  };
  console.log({...data});

  const handleAdd = async (e) => {
    e.preventDefault();
    try{
      console.log(data);
      if(title == "Users") {
        const res = await register( { ...data }).unwrap()
        toast(res.message);
      } else if(title == "Courses") {
        const res = await addCourse( { ...data }).unwrap()
        toast(res.message);
      } else if(title == "Lessons") {
        const res = await addLesson( { ...data }).unwrap()
        toast(res.message);
      } else if(title == "Vocabularies") {
        const res = await addVocab( { ...data }).unwrap()
        toast(res.message);
      }
      console.log(data);
      // window.location.reload();
      } catch(err) {
        console.log(err.data.message);
          toast.error(`${err.data.message}`)
      }
  };

  return (
    <div className="addNew">
      <Modal
        show={addShow}
        onHide={() => setAddShow(false)}
        dialogClassName="addNew_modal-90w"
        aria-labelledby="example-custom-modal-styling-title"
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-custom-modal-styling-title">
          <div className="">
            <h1>Add {title}</h1>
          </div>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <div className="addNewContainer">
              <div className="addNewContainer_bottom">
                <div className="addNewContainer_bottom-right">
                  <form onSubmit={handleAdd}>
                    <div className="addnew-form">
                      {inputTag.map((input) => (
                        <div className="addnew-formInput" key={input}>
                          <label>{input}</label>
                          <input
                            id={input}
                            type={`${input === "password" ? 'password' : (input === "email" ? "email" : "text")}`}
                            placeholder={`add ${input} here`}
                            onChange={handleInput}
                          />
                        </div>
                      ))}
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

export default AddNew;
