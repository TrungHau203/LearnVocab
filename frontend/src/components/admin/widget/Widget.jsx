import "./widget.scss";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import AccountBalanceWalletOutlinedIcon from "@mui/icons-material/AccountBalanceWalletOutlined";

const Widget = ({ type , item}) => {
  let data;
  console.log(item);

  switch (type) {
    case "users":
      data = {
        title: "USERS",
        number: item.data.user,
        link: "See all users",
        query:"users",
        icon: (
          <PersonOutlinedIcon
            className="icon"
            style={{
              color: "crimson",
              backgroundColor: "rgba(255, 0, 0, 0.2)",
            }}
          />
        ),
      };
      break;
    case "courses":
      data = {
        title: "Courses",
        number: item.data.courses,
        link: "View all Courses",
        icon: (
          <AccountBalanceWalletOutlinedIcon
            className="icon"
            style={{
              backgroundColor: "rgba(218, 165, 32, 0.2)",
              color: "goldenrod",
            }}
          />
        ),
      };
      break;
    case "lesson":
      data = {
        title: "Lesson",
        number: item.data.lesson,
        link: "View all Lessons",
        icon: (
          <AccountBalanceWalletOutlinedIcon
            className="icon"
            style={{ backgroundColor: "rgba(0, 128, 0, 0.2)", color: "green" }}
          />
        ),
      };
      break;
    case "vocab":
      data = {
        title: "Vocabulary",
        query:"vocabs",
        number: item.data.vocab,
        link: "See All Vocabulary",
        icon: (
          <AccountBalanceWalletOutlinedIcon
            className="icon"
            style={{
              backgroundColor: "rgba(128, 0, 128, 0.2)",
              color: "purple",
            }}
          />
        ),
      };
      break;
    default:
      break;
  }

  return (
    <div className="widget">
      <div className="left">
        <span className="title">{data?.title}</span>
        <span className="counter">
          {data?.number}
        </span>
        <span className="link">{data?.link}</span>
      </div>
      <div className="right">
        <div className={`percentage`}>
          <KeyboardArrowUpIcon/> 
        </div>
        {data?.icon}
      </div>
    </div>
  );
};

export default Widget;
