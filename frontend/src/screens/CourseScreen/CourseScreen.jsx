import Course from '../../components/Course/Course';
import Loading from '../../components/Loading';
import { useCoursesQuery } from '../../slices/courseApiSlice';

export const CourseScreen = () => {
    const { data: coursesApi, isLoading, isError } = useCoursesQuery(); 
    const courses = coursesApi?.data;
    console.log(coursesApi);
    return (
      <>
        { isLoading ? <Loading/> : courses.map((course,index) => (
          <>
            <Course index={index} course={course}/>
          </>
        ))
        }
      </>
    );
}
