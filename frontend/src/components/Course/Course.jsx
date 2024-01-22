import { Button, } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "./Course.scss";
const Course = ({ course }, index) => {
  // const { course } =  useSelector((state)=>state)
  //   const dispatch = useDispatch()
  const navigate = useNavigate();
  //   console.log(course);
  //   const [courseApiCall] = useCourseMutation()
  const handleChoose = async (e) => {
    try {
      e.preventDefault();
      console.log("ok");
      navigate(`/courses/${course._id}`);
    } catch (e) {
      console.log(e);
    }
  };
  return (
    // <Card>
    //     <Card.Body>{children}</Card.Body>
    // </Card>
    <div className="mx-auto course" >
      <div className="course-item" onClick={handleChoose}>
        <div className="text-center course-item-header">
            <div className="course-item-button">
                <div className="course-item-button-1"></div>
                <div className="course-item-button-2">
                    <p>{course.course}</p>
                </div>
            </div>
        </div>
        <div className="course-item-content">
            <div className="d-flex align-items-center">
                <div  className="px-4">
                    <img src="https://learn.mochidemy.com/image/de636aefa645d2c9f4482b68aafce487.png" style={{width:"40px"}}/>
                </div>
                <div className="lh-40">
                    <p className="">{course.target}</p>
                </div>
            </div>
            <div className="d-flex align-items-center">
                <div  className="px-4">
                    <img src="https://learn.mochidemy.com/image/cf5c4da70380202a475fccf47758a312.png" style={{width:"40px"}}/>
                </div>
                <div className="lh-40">
                    <p className="">{course.des_target}</p>
                </div>
            </div>
            
        </div>
      </div>
    </div>
  );
};

export default Course;
