const input = {
    users: [
      {
        id: "name",
        label: "name",
        type: "text",
        placeholder: "Ex:john_doe",
      },
      {
        id: "email",
        label: "email",
        type: "email",
        placeholder: "Ex:xyz232@gmail.com",
      },
      {
        id: "password",
        label: "password",
        type: "password",
      },
      {
        id: "phoneNumber",
        label: "phoneNumber",
        type: "text",
        placeholder: "Ex:0123456789",
      },
      {
        id: "address",
        label: "address",
        type: "text",
        placeholder: "Ex:Hà Nam",
      },
    ],
    lessons : [
        // {
        //     id:"_id",
        //     label:"_id",
        //     type:"text",
        //     placeholder:"",
        // },
        {
            id:"lesson",
            label:"lesson",
            type:"text",
            placeholder:"",
        },
        {
            id:"vn_lesson",
            label:"vn_lesson",
            type:"text",
            placeholder:"",
        },
        {
            id:"course_id",
            label:"course_id",
            type:"text",
            placeholder:"",
        },
    ],
    courses : [
        {
            id:"course",
            label:"course",
            type:"text",
            placeholder:"Ex:nam of course",

        },
        {
            id:"target",
            label:"target",
            type:"text",
            placeholder:"Ex:target of course"

        },
        {
            id:"des_target",
            label:"des_target",
            type:"text",
            placeholder:"Ex: descriptions of target"
            
        },
    ],
    vocabularies : [],
  };
  
  
  export default input;
  