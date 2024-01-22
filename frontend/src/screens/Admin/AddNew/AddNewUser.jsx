import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import input from "./formSource";
import { Modal } from "react-bootstrap";
import "./AddNew.scss";
import { useRegisterMutation } from "../../../slices/userApiSlice";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { setCredentials } from "../../../slices/authSlice";
const AddNewUser= ({addShow,setAddShow}) => {
  const [data, setData] = useState({});
  const [inputTag, setInputTag] = useState([]);
  const [title, setTitle] = useState("");
  const navigate = useNavigate();
  const [register, {isLoading, error}] = useRegisterMutation()
  const dispatch = useDispatch();
  const location = useLocation();
  useEffect(() => {
    const path = location.pathname;

    if (path.includes("/admin/Users")) {
      setTitle("Users");
      setInputTag(input.users);
    } else if (path.includes("/admin/Courses")) {
      setTitle("Courses");
      setInputTag(input.courses);
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
    setData({ ...data, [id]: value });
  };

  console.log(title);
  const handleAdd = async (e) => {
    e.preventDefault();
    e.preventDefault();
    try{
      const res = await register({name, email, password, phoneNumber:numberPhone, address}).unwrap()
      console.log(res);
      toast(res.message);
      dispatch(setCredentials({...res}))
      navigate('/')
      } catch(err) {
        console.log(err.data.message);
          toast.error(`${err.data.message} không hợp lệ`)
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
            <h1>Add new user</h1>
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
                        <div className="addnew-formInput" key={input.id}>
                          <label>{input.label}</label>
                          <input
                            id={input.label}
                            type={input.type}
                            placeholder={input.placeholder}
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

export default AddNewUser;
