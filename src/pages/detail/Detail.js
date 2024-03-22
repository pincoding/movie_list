import { useEffect, useState } from "react";
import { moiveDetail } from "../../api";
import { useParams } from "react-router-dom";
import { Loding } from "../../components/Loding";
// import styled from "styled-components";
// import { IMG_URL } from "../../constant/url";
// import { spacing } from "../../components/GlobalStyled";
import { DetaMain } from "./DetaMain";
import { PageTitle } from "../../components/PageTitle";

export const Detail = () => {
  const { id } = useParams();
  // 객체안에 내가지정한 아이디 번호 가지고 오기
  const [data, setdata] = useState();
  const [Loading, setLoading] = useState(true);
  useEffect(() => {
    (async () => {
      try {
        const detailData = await moiveDetail(id);
        setdata(detailData);
        // console.log(detailData);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    })();
  }, [id]);
  console.log(data?.genres[0].name);
  return (
    <div>
      {Loading ? (
        <Loding />
      ) : (
        <>
          <PageTitle title={"detail"} />
          <DetaMain detaProps={data} />
        </>
      )}
    </div>
  );
};

// 장르 ,평점
// 터미널 > cd 경로 바꿈 > git clone (복제해서 가지고온다) -> 깃허브 https 주소 복사 cd 경로 붙여넣기
// cd 파일명 -> code.
// ->코드 실행후 터미널 npm i
