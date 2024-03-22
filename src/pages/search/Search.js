import { useForm } from "react-hook-form";
import styled from "styled-components";
import { searchMovie } from "../../api";
import { useState } from "react";
import { IMG_URL_SIZE } from "../../constant/url";
import { Link } from "react-router-dom";
import { Loding } from "../../components/Loding";
import { IoIosSearch } from "react-icons/io";
import { PageTitle } from "../../components/PageTitle";

const Container = styled.div`
  padding: 150px;
  p {
    padding: 10px 5px;
    font-size: 20px;
    margin-bottom: 100px;
  }
  @media screen and (max-width: 640px) {
    padding: 150px 50px;
    p {
      font-size: 18px;
    }
  }
  @media screen and (max-width: 450px) {
    p {
      font-size: 16px;
    }
  }
`;
const SForm = styled.form`
  position: relative;
  input {
    all: unset;
    border-bottom: 1px solid #555;
    width: 95%;
    font-size: 24px;
    padding-left: 5px;
    padding-bottom: 10px;
  }
  svg {
    font-size: 30px;
    position: absolute;
    right: 30px;
    top: 7px;
    opacity: 0.6;
  }
  @media screen and (max-width: 640px) {
    input {
      font-size: 18px;
    }
    svg {
      font-size: 24px;
      top: 3px;
      right: 10px;
    }
  }
  @media screen and (max-width: 450px) {
    input {
      font-size: 18px;
    }
    svg {
      font-size: 24px;
      top: 3px;
      right: 10px;
    }
  }
`;

// 검색할때 쓰는 용어 : trem,payload
//
const ConWrap = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  row-gap: 30px;
  column-gap: 10px;
  @media screen and (max-width: 640px) {
    grid-template-columns: repeat(3, 1fr);
  }
  @media screen and (max-width: 450px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;
const Bg = styled.div`
  height: 350px;
  img {
    height: 100%;
    object-fit: cover;
  }
  @media screen and (max-width: 640px) {
    height: 240px;
  }
  @media screen and (max-width: 450px) {
    height: 200px;
  }
`;
const Con = styled.div`
  h3 {
    margin-top: 10px;
  }
`;

export const Search = () => {
  const [term, settrem] = useState();
  const [keyword, setKeyword] = useState();
  const [isLoading, setisLoading] = useState(false);
  // const [noImg, setnoImg] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onSubmit",
  });

  const onSubmit = async (data) => {
    try {
      setisLoading(true);
      const { search: keyword } = data;
      const { results } = await searchMovie(keyword);
      console.log(results);
      settrem(results);
      setKeyword(keyword);
      setisLoading(false);
      // ...register("search" 가지고와서 넣어준다
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container>
      <SForm onSubmit={handleSubmit(onSubmit)}>
        <input
          {...register("search", {
            required: "내용을 입력해주세요.",
          })}
          type="text"
          placeholder="찾으시는 영화가 있나요?"
        />
        <IoIosSearch />
      </SForm>
      <p>{errors ? errors?.search?.message : ""}</p>
      {term ? <h4>검색내용 내용 : {keyword}</h4> : ""}

      {console.log(term)}
      {term && (
        <ConWrap>
          {isLoading ? (
            <Loding />
          ) : (
            <>
              {term.map((data) => (
                <Con key={data.id}>
                  <PageTitle title={"검색창"} />
                  <Link to={`/detail/${data.id}`}>
                  <Bg>
                    {data?.poster_path ? (
                      <img
                        src={`${IMG_URL_SIZE.size_200}${data?.poster_path}`}
                        alt={data.title}
                      />
                    ) : (
                      <img
                        src={`https://3.bp.blogspot.com/-ZKBbW7TmQD4/U6P_DTbE2MI/AAAAAAAADjg/wdhBRyLv5e8/s1600/noimg.gif`}
                        alt={data.title}
                      />
                    )}
                  </Bg>
                  </Link>
                  <h3>{`${data.title.slice(0, 21)}...`}</h3>
                </Con>
              ))}
            </>
          )}
        </ConWrap>
      )}
    </Container>
  );
};
// yarn : npm랑 비슷한 사이트
// react-icons

// 검색창 꾸미기, 로딩창, 입력한값 "유저가 검색하신 내용은 땡땡땡입니다."
// getValuse();

// grid-template-columns : (5,1fr);

// row-gap 높이
