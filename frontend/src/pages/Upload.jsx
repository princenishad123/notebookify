import React, { useEffect, useState } from "react";
import { languages } from "../lib/languages";
import Editor from "@monaco-editor/react";
import {
  useAddSectionsMutation,
  useLazyGetSectionsQuery,
  useAddTopicsMutation,
} from "../rtkQuery/query";
import toast from "react-hot-toast";
import ButtonLoader from "../components/ButtonLoader";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
const Upload = () => {
  const { auth } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const [topic, setTopic] = useState("");
  const [language, setLanguage] = useState();
  const [code, setCode] = useState("");
  const [sections, setSections] = useState("");
  const [allSection, setAllSection] = useState([]);
  const [selectSection, setSelectSection] = useState("");

  const [addSections, { isLoading: isLoading2 }] = useAddSectionsMutation();
  const [addTopics, { isLoading: topicLoader }] = useAddTopicsMutation();

  const [getSectionTrigger, { data, isLoading }] = useLazyGetSectionsQuery();

  useEffect(() => {
    if (!auth?.isAdmin) {
      navigate("/");
    }
  }, []);

  const handleChangeLanguage = async (e) => {
    setLanguage(e.target.value);
    const res = await getSectionTrigger({ language: e.target.value });
    setAllSection(res?.data);
  };

  const addSectionHandle = async () => {
    if (!language) return toast.error("Select Language");
    const res = await addSections({
      language: language.toLowerCase(),
      name: sections.toLowerCase().trim(),
    });

    if (res?.error) return toast.error(res.error.data.message);
    toast.success(res.data.message);
  };

  const uploadTopic = async () => {
    const res = await addTopics({
      language: language.toLowerCase(),
      id: selectSection.toLowerCase(),
      code,
      topicName: topic.toLowerCase().trim(),
    });

    if (res?.error) return toast.error(res?.error.data.message);

    toast.success(res.data.message);
  };

  return (
    <div>
      <div className="w-full flex justify-center items-center gap-6 my-4 flex-wrap">
        <input
          type="text"
          onChange={(e) => setTopic(e.target.value)}
          defaultValue={topic}
          placeholder="Topic name"
          className="input input-bordered w-full max-w-xs bg-slate-800"
        />
        {/* Language ke liye */}
        <select
          onChange={(e) => handleChangeLanguage(e)}
          value={language}
          className="select select-bordered w-full max-w-56 bg-slate-800"
        >
          <option>Select Language</option>
          {languages.map((e, idx) => (
            <>
              <option
                key={idx}
                placeholder="select language"
                value={e.value.toLocaleLowerCase()}
              >
                {e.language}
              </option>
            </>
          ))}
        </select>
        {/* section ke liye */}
        {language && (
          <select
            onChange={(e) => setSelectSection(e.target.value)}
            className="select select-bordered w-full max-w-52 bg-slate-800"
          >
            <option>Select Section</option>
            {allSection?.map((language, idx) => (
              <>
                <option key={idx} value={language?._id.toLocaleLowerCase()}>
                  {language?.name}
                </option>
              </>
            ))}
          </select>
        )}

        {/* add section modal */}
        <button
          className="rounded-lg  py-2  px-4 cursor-pointer flex items-center border border-green-700 bg-green-800  hover:bg-green-700 "
          onClick={() => document.getElementById("my_modal_2").showModal()}
        >
          Add New Section
        </button>
        <dialog id="my_modal_2" className="modal">
          <div className="modal-box">
            <h2 className="text-xl font-semibold">Add New Section</h2>
            <p className=" text-sm my-4">
              If Section not Exist Then You can add new Section in seleted
              Language!
            </p>
            <input
              type="text"
              onChange={(e) => setSections(e.target.value)}
              value={sections}
              placeholder="New Section "
              className="input input-bordered w-full max-w-xs bg-slate-800 my-4"
            />

            <button
              onClick={addSectionHandle}
              className="rounded-lg  py-2  px-4 cursor-pointer flex items-center border border-green-700 bg-green-800  hover:bg-green-700 "
            >
              {isLoading2 ? <ButtonLoader /> : "Add Section"}
            </button>
          </div>
          <form method="dialog" className="modal-backdrop">
            <button>close</button>
          </form>
        </dialog>
      </div>
      <div className="w-auto h-auto border rounded-xl overflow-hidden border-slate-500">
        <Editor
          height="60vh"
          language={language}
          theme="vs-dark"
          value={code}
          onChange={(newValue) => setCode(newValue)}
          options={{
            selectOnLineNumbers: true,
            minimap: { enabled: false },
          }}
        />
      </div>

      <button
        onClick={uploadTopic}
        className="relative float-end my-4 inline-flex h-12 active:scale-95 transistion overflow-hidden rounded-lg p-[1px] focus:outline-none"
      >
        <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#e7029a_0%,#f472b6_50%,#bd5fff_100%)]" />
        <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-lg bg-slate-950 px-7 text-sm font-medium text-white backdrop-blur-3xl gap-2 undefined">
          {topicLoader ? <ButtonLoader /> : "Upload Topic"}
        </span>
      </button>
    </div>
  );
};

export default Upload;
