import { useEffect, useState, useTransition } from "react";
import { useSelector } from "react-redux";
import { useGetAllVocabMutation } from "../../slices/userVocab";
import "./WordScreen.scss";
import OverView from "../../components/OverView/OverView";
import { Col, ListGroup, Row } from "react-bootstrap";
import { MdSearch } from "react-icons/md";
import Loading from "../../components/Loading";
const WordScreen = () => {
  const [words, setWords] = useState(null);
  const [selectedLevel, setSelectedLevel] = useState(1);
  const [filteredData, setfilteredData] = useState(null);
  const { userInfor } = useSelector((state) => state.auth);
  const user_id = userInfor.data;
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [getAllVocab] = useGetAllVocabMutation();
  useEffect(() => {
    getAllVocab(user_id)
      .then((response) => {
        const responseData = response.data;
        setWords(responseData.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  const [isLoading, startTransition] = useTransition();

  useEffect(() => {
    const filteredWords = filterWords(words);
    const results = filteredWords?.filter((word) =>
      word.content.toLowerCase().includes(searchTerm.toLowerCase())
    );
    startTransition(() => {
      setSearchResults(results);
    });
  }, [searchTerm, words, selectedLevel, startTransition]);
  function filterWords(data) {
    const words = data?.map((item) => {
      return {
        content: item.vocab[0]?.content,
        trans: item.vocab[0]?.trans,
        position: item.vocab[0]?.position,
        proficiency: item.proficiency,
      };
    });
    return words;
  }
  function filterProficiency(data, proficiency) {
    const words = data?.filter((item) => {
      return item.proficiency == proficiency;
    });
    return words;
  }
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };
  return (
    words &&
    filterProficiency(filterWords(words), selectedLevel) && (
      <div className="word-screen">
        <div className="header-words">
          <div
            className={
              selectedLevel == 1 ? "select-btn selected" : "select-btn"
            }
            onClick={() => {
              setSelectedLevel(1);
              setfilteredData(
                filterProficiency(filterWords(words), selectedLevel)
              );
            }}
          >
            Cấp độ 1
          </div>
          <div
            className={
              selectedLevel == 2 ? "select-btn selected" : "select-btn"
            }
            onClick={() => {
              setSelectedLevel(2);
              setfilteredData(
                filterProficiency(filterWords(words), selectedLevel)
              );
            }}
          >
            Cấp độ 2
          </div>
          <div
            className={
              selectedLevel == 3 ? "select-btn selected" : "select-btn"
            }
            onClick={() => {
              setSelectedLevel(3);
              setfilteredData(
                filterProficiency(filterWords(words), selectedLevel)
              );
            }}
          >
            Cấp độ 3
          </div>
          <div
            className={
              selectedLevel == 4 ? "select-btn selected" : "select-btn"
            }
            onClick={() => {
              setSelectedLevel(4);
              setfilteredData(
                filterProficiency(filterWords(words), selectedLevel)
              );
            }}
          >
            Cấp độ 4
          </div>
          <div
            className={
              selectedLevel == 5 ? "select-btn selected" : "select-btn"
            }
            onClick={() => {
              setSelectedLevel(5);
              setfilteredData(
                filterProficiency(filterWords(words), selectedLevel)
              );
            }}
          >
            Cấp độ 5
          </div>
        </div>
        <div className="wordScrenn_search">
          <div className="underHeader_search">
            <input
              className="underHeader_search-input"
              placeholder="Search"
              type="text"
              value={searchTerm}
              onChange={handleSearchChange}
              // ref={searchRef}
            />
            <div className="underHeader_search-icon">
              <MdSearch />
            </div>
          </div>
        </div>
        <ListGroup>
          {(searchResults && searchTerm.length > 2)
            ? ( isLoading 
              ? <p>Loading...</p> 
              : (searchResults.length < 1
                ? (
                  <div className="text-center">
                  Cam không tìm được từ vựng này trong danh sách từ đã ôn của bạn, bạn thử tìm từ khác nha

                </div> )
                : searchResults.map((data) => (
                    <>
                      <ListGroup.Item>
                        <Row>
                          <Col>{data.content}</Col>
                          <Col xs={1}>({data.position})</Col>
                          <Col>({data.trans})</Col>
                        </Row>
                      </ListGroup.Item>
                    </>
                  ))
                )
              )
            : ( filterProficiency(filterWords(words), selectedLevel).length < 1 
              ? <div className="text-center">Chưa có từ vựng nào của bạn đạt cấp độ này</div> 
              : filterProficiency(filterWords(words), selectedLevel).map(
                (data) => (
                  <>
                    <ListGroup.Item>
                      <Row>
                        <Col>{data.content}</Col>
                        <Col xs={1}>({data.position})</Col>
                        <Col>({data.trans})</Col>
                      </Row>
                    </ListGroup.Item>
                  </>
                )
              ))}
        </ListGroup>
      </div>
    )
  );
};

export default WordScreen;
