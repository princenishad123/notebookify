import React, { useEffect, useState } from "react";
import Layout from "../layout/Layout";
import Editor from "@monaco-editor/react";
import SectionAccordian from "../components/SectionAccordian";
import {
  useLazyGetSectionsQuery,
  useLazyGetTopicsQuery,
} from "../rtkQuery/query";
import { useParams } from "react-router-dom";
import Loader from "../components/Loader";
import SectionSkeleton from "../components/SectionSkeleton";
const ReadCode = () => {
  const [code, setCode] = useState(`let a = 20;
console.log(a)`);

  const { language } = useParams();

  const [sectionData, setSectionData] = useState([]);

  const [getSectionsTrigger, { isLoading: loading2 }] =
    useLazyGetSectionsQuery();
  const [getCodeTrigger, { isLoading }] = useLazyGetTopicsQuery();

  async function getSections() {
    let res = await getSectionsTrigger({ language });
    setSectionData(res.data);
  }

  useEffect(() => {
    getSections();
  }, []);

  const getCode = async (e) => {
    const res = await getCodeTrigger({
      language: language.toLowerCase(),
      topicName: e.toLowerCase(),
    });

    setCode(res?.data.code);
  };

  return (
    <>
      <div className="w-full min-h-[88vh] flex gap-4">
        <aside className="w-96 sm:w-[420px] max-h-[88vh] border border-slate-500 overflow-x-hidden overflow-y-scroll ">
          {loading2 ? (
            <>
              <SectionSkeleton />
              <SectionSkeleton />
              <SectionSkeleton />
              <SectionSkeleton />
              <SectionSkeleton />
              <SectionSkeleton />
            </>
          ) : (
            sectionData?.map((el) => (
              <section key={el._id}>
                <SectionAccordian
                  nameOfSection={el.name}
                  topics={el.topics}
                  getCode={getCode}
                />
              </section>
            ))
          )}
        </aside>
        <div className=" w-full">
          <div className="w-full h-[88vh] border flex justify-center items-center rounded-xl overflow-hidden border-slate-500">
            {isLoading ? (
              <Loader />
            ) : (
              <Editor
                height="88vh"
                language={"javascript"}
                theme="vs-dark"
                value={code}
                options={{
                  selectOnLineNumbers: true,
                  minimap: { enabled: false },
                  readOnly: true,
                }}
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ReadCode;
